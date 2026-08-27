const cleanText = (inputText) => {
  const trimmedInput = inputText.trim();
  return trimmedInput;
};



const capitalizeText = (name) => {
  const cleanedName = cleanText(name);

  if (cleanedName.length == 0) {
    return "";
  }

  return cleanedName[0].toUpperCase() + cleanedName.slice(1).toLowerCase();

};



const formatDisplayName = (firstName, lastName) => {
  const capitalizedFirstName = capitalizeText(firstName);
  const capitalizedLastName = capitalizeText(lastName);

  return `${capitalizedFirstName} ${capitalizedLastName};`

};

console.log(formatDisplayName("  john", "   doe  "));