const hasMinimumLength = (password) => {
    return password.length >= 8;
}

const hasNumber = (password) => {
    for (const char of password) {
        if (!isNaN(char)) {
            return true;
        }
    }
    return false;
}

const hasUpperCase = (password) => {
    for (const char of password) {
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            return true;
        }
    }
    return false;
}

const getFailedRules = (password) => {
    const failedRules = [];
    if (!hasMinimumLength(password)) {
        failedRules.push('Password must be at least 8 characters long.');
    }
    if (!hasNumber(password)) {
        failedRules.push('Password must contain at least one number.');
    }
    if (!hasUpperCase(password)) {
        failedRules.push('Password must contain at least one uppercase letter.');
    }
    return failedRules;
}

const validatePassword = (password) => {
    const failedRules = getFailedRules(password)

    return {
        valid: failedRules.length === 0 ? "Passowrd is Valid" : "Not valid",
        failedRules,
    }
}

console.log(validatePassword("Saathvik"))