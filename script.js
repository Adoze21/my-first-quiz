const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'В чём разница между ВИЧ-инфекцией и СПИДом?',
    answers: [
      { text: 'ВИЧ – вирус, провоцирующий дефицит иммунитета. ВИЧ-инфекция – заболевание, вызываемое ВИЧ. СПИД – это синдром приобретенного иммунодефицита, последняя стадия ВИЧ-инфекции, которая развивается у пациента, если он не принимает терапию.', correct: true },
      { text: 'ВИЧ - причина, а СПИД - неизбежное следствие ВИЧ.', correct: false }
    ]
  },
  {
    question: 'ВИЧ-инфекция не передаётся...',
    answers: [
      { text: ' …через укус комара, который до этого укусил заражённого человека.', correct: true },
      { text: '…при пользовании общей посудой, душем, санузлом, средствами гигиены с инфицированным человеком.', correct: true },
      { text: '...при поцелуе, рукопожатии, чихании, кашле.', correct: true },
      { text: ' …никакими из вышеперечисленных путей.', correct: true }
    ]
  },
  {
    question: 'Может ли ВИЧ-положительная женщина родить неинфицированного ребёнка?',
    answers: [
      { text: 'Это исключено: малыш заразится ВИЧ-инфекцией ещё в утробе матери.', correct: false },
      { text: 'Если только папа ребёнка сам не заражён ВИЧ.', correct: false },
      { text: 'Может, при приёме мамой лекарств и родах под наблюдением врачей.', correct: true },
    ]
  },
  {
    question: 'Можно ли по внешним проявлениям определить, что человек заражён ВИЧ?',
    answers: [
      { text: 'Да', correct: false },
      { text: 'Нет', correct: true }
    ]
  }
]