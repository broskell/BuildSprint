const textarea = document.getElementById('message-input');
const charCounter = document.getElementById('char-counter');

const maxLimit = 250;

const updateCharacterCount = () => {
  const currentLength = textarea.value.length;

  charCounter.textContent = `${currentLength} / ${maxLimit}`;

  const isLimitReached = currentLength >= maxLimit;

  textarea.style.borderColor = isLimitReached ? '#e53e3e' : '#000000';
  charCounter.style.color = isLimitReached ? '#e53e3e' : '#000000';
};

textarea.addEventListener('input', updateCharacterCount);