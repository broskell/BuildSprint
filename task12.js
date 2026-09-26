const questions = [
  { id: 1, correctAnswer: 'B' },
  { id: 2, correctAnswer: 'A' },
  { id: 3, correctAnswer: 'D' },
  { id: 4, correctAnswer: 'C' },
];

const userAnswers = [
  { questionId: 1, answer: 'B' }, //userAnswer
  { questionId: 2, answer: 'C' }, //userAnswer
  { questionId: 3, answer: 'D' }, //userAnswer
  { questionId: 4, answer: 'C' }, //userAnswer
];

const isAnswerCorrect = (question, userAnswer) => {
    return question.correctAnswer === userAnswer.answer;
}

const countCorrectAnswers = (questions, userAnswers) => {
    let correctCount = 0;
    for (const question of questions) {
        const userAnswer = userAnswers.find((answer)=> {
        return answer.questionId === question.id;
    });

    // console.log(userAnswer)

    if (isAnswerCorrect(question, userAnswer)) {
        correctCount++
    }
}
    return correctCount;
}

const calculatePercentage = (correctCount, totalQuestions) => {
    return (correctCount / totalQuestions) * 100;
}

const getResultMessage = (percentage) => {
    if(percentage >= 90) return "Excellent work!"
    if(percentage >= 80) return "Good work!"
    if(percentage >= 70) return "Work more!"
    if(percentage >= 60) return "Improvement needed"

    return "Better to discontinue"
}

const createQuizResult = (questions, userAnswers) => {
    const correctCount = countCorrectAnswers(questions, userAnswers);
    const totalQuestions = questions.length;
    const percentage = calculatePercentage(correctCount, totalQuestions);
    const message = getResultMessage(percentage);

    return {
        correctCount,
        totalQuestions,
        percentage,
        message
    }
}

console.log(createQuizResult(questions, userAnswers))