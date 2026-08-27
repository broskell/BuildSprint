const getLetterGrade = (score) => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F";
}

const hasPassed = (score) => {
    return score>=60
}

const getFeedback = (grade) => {
    if(grade == "A") return "Excellent work!"
    if(grade == "B") return "Good work!"
    if(grade == "C") return "Work more!"
    if(grade == "D") return "Improvement needed"
    return "Better to discountinue"
}

const createGradeReport = (name, score) => {
    const grade = getLetterGrade(score);

    return {
        name,
        score,
        grade,
        passed: hasPassed(score),
        feedback: getFeedback(grade),
    }
}

console.log(createGradeReport("john doe", 35))