// modalScript.js

const section = document.querySelector("section");
const overlay = document.querySelector(".overlay");
const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-btn");
const modalBox = document.querySelector(".modal-box");

showBtn.addEventListener("click", () => openModal());
overlay.addEventListener("click", () => closeModal());
closeBtn.addEventListener("click", () => closeModal());

function openModal() {
    section.classList.add("active");
}

function closeModal() {
    section.classList.remove("active");
}




const quizData = [
    {
      question: '1. Кто основатель Gorilla энергетика?',
      options: ['Игорь Ким', 'Хабиб Нурмагамедов', 'Шавкат Рахмонов', 'Игорь Войтенко'],
      answer: 'Игорь Ким',
    },
    {
      question: '2. Какой бренд напитка является Казахстанким?',
      options: ['Maxi чай', 'Fuse tea', 'Lipton Ice Tea', 'Lava lava'],
      answer: 'Maxi чай',
    },
    {
      question: '3. В каком году основалось компания Coca Cola?',
      options: ['2000', '1892', '1912', '1954'],
      answer: '1892',
    },
    {
      question: '4. Какой слоган у Red Bull?',
      options: ['Red Bull окрыляет!', 'Выпей и не тормози!', 'Red Bull купи быка порви', 'Red bull выпей и любого выруби'],
      answer: 'Red Bull окрыляет!',
    },
    {
      question: '5. В какой стране был создан напиток Pepsi-Cola?',
      options: [
        'США',
        'Великобритания',
        'Франция',
        'Италия',
      ],
      answer: 'США',
    },
    {
      question: '6. Какая из следующих марок является популярным производителем чая?',
      options: ['Lipton', 'Pepsi', 'Sprite', 'Fanta'],
      answer: 'Lipton',
    },
    {
      question: '7. Какой из перечисленных напитков обычно содержит кофеин?',
      options: [
        'Лимонадo',
        'Чай',
        'Апельсиновый сок',
        'Газировка',
      ],
      answer: 'Чай',
    },
    {
      question: '8. Какой энергетический напиток широко ассоциируется с бычьими рогами в своем логотипе?',
      options: ['Rockstar', 'Red Bull', 'Gorilla', 'Monster'],
      answer: 'Red Bull',
    },
    {
      question: '9. Какая компания является производителем напитка "Fanta"?',
      options: [
        'PepsiCo',
        'Nestlé',
        'Coca-Cola',
        'Dr Pepper Snapple Group',
      ],
      answer: 'Coca-Cola',
    },
    {
      question: '10. Какой энергетический напиток часто ассоциируется с логотипом "Монстр в зеленой банке"?',
      options: ['Red Bull', 'Monster Energy', 'Rockstar', 'Full Throttle'],
      answer: 'Monster Energy',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
  
  
  // fullscreen.js

function openFullscreen() {
  var elem = document.getElementById("myvideo");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
