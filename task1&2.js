const formatName = (firstName, lastName) => {
    return firstName + " " + lastName;
}

const getGreeting = (timeOfDay) => {
    if (timeOfDay === "morning") {
        return "Good morning";
    } else if (timeOfDay === "afternoon") {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

const createGreeting = (firstName, lastName, timeOfDay) => {
    return getGreeting(timeOfDay) + ", " + formatName(firstName, lastName);
}


const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}

const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
}

const formatTemperature = (value, unit) => {
    if ( unit === "F" ) {
        return celsiusToFahrenheit(value) + "F" 
    } return fahrenheitToCelsius(value) + "C" 
}

console.log(createGreeting("Saathvik", "Kellampalli", "morning"));
console.log(formatTemperature(99.7, "C"));