console.log("Hello from Quiz JS!");

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('jugendwoerter');
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    container.before(progressBar); // Fortschrittsbalken vor das Quiz setzen

    let begriffe = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const maxFragen = 10;
    let dataBackup = [];

    if (!container) {
        console.error("Container 'jugendwoerter' nicht gefunden!");
        return;
    }

    fetch('api/begriffe.php')
        .then(response => response.json())
        .then(data => {
            if (data.error || data.length === 0) {
                container.innerHTML = "Fehler beim Laden der Begriffe.";
                return;
            }

            dataBackup = data;
            startQuiz();
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            container.innerHTML = "Es gab ein Problem beim Laden der Begriffe.";
        });

    function startQuiz() {
        begriffe = dataBackup.sort(() => Math.random() - 0.5).slice(0, maxFragen);
        currentQuestionIndex = 0;
        score = 0;
        updateProgressBar();
        showQuestion();
    }

    function updateProgressBar() {
        const percent = (currentQuestionIndex / maxFragen) * 100;
        progressBar.style.width = percent + '%';
    }

    function showQuestion() {
        container.innerHTML = '';
        updateProgressBar();

        if (currentQuestionIndex >= begriffe.length) {
            showResult();
            return;
        }

        const item = begriffe[currentQuestionIndex];
        const correctAnswer = item.bedeutung;
        let attempts = 0;

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionTitle = document.createElement('p');
        questionTitle.innerHTML = `Frage ${currentQuestionIndex + 1} von ${maxFragen}:<br>Was bedeutet <strong>"${item.wort}"</strong>?`;

        let wrongAnswers = begriffe.filter(b => b.bedeutung !== correctAnswer);
        if (wrongAnswers.length < 2) {
            wrongAnswers = dataBackup.filter(b => b.bedeutung !== correctAnswer);
        }
        wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);

        const answers = [correctAnswer, ...wrongAnswers.map(w => w.bedeutung)].sort(() => Math.random() - 0.5);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');

        const infoText = document.createElement('p');
        infoText.style.fontStyle = 'italic';

        answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.onclick = () => {
                if (answer === correctAnswer) {
                    if (attempts === 0) {
                        score += 1;
                        infoText.innerText = "Richtig!";
                    } else {
                        score += 0.5;
                        infoText.innerText = "Richtig (beim zweiten Versuch)!";
                    }
                    highlightButtons(answer);
                    disableAllButtons();
                    setTimeout(() => {
                        currentQuestionIndex++;
                        showQuestion();
                    }, 1000);
                } else {
                    attempts++;
                    button.disabled = true;
                    button.classList.add('wrong');
                    if (attempts === 1) {
                        infoText.innerText = "Leider falsch. Du hast noch einen Versuch.";
                    } else {
                        infoText.innerText = `Falsch! Die richtige Antwort war: ${correctAnswer}`;
                        highlightButtons(correctAnswer);
                        disableAllButtons();
                        setTimeout(() => {
                            currentQuestionIndex++;
                            showQuestion();
                        }, 2000);
                    }
                }
            };
            buttonsContainer.appendChild(button);
        });

        questionElement.appendChild(questionTitle);
        questionElement.appendChild(buttonsContainer);
        questionElement.appendChild(infoText);
        container.appendChild(questionElement);

        function disableAllButtons() {
            const buttons = buttonsContainer.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.disabled = true;
            });
        }

        function highlightButtons(correct) {
            const buttons = buttonsContainer.querySelectorAll('button');
            buttons.forEach(btn => {
                if (btn.innerText === correct) {
                    btn.classList.add('correct');
                } else if (!btn.classList.contains('wrong')) {
                    btn.classList.add('disabled');
                }
            });
        }
    }

    function showResult() {
        const prozent = ((score / maxFragen) * 100).toFixed(1);
        container.innerHTML = `
            <h2>Quiz beendet!</h2>
            <p>Du hast ${score} von ${maxFragen} Punkten erreicht.</p>
            <p>Das entspricht <strong>${prozent}%</strong>.</p>
            <button id="restart">Quiz neu starten</button>
        `;

        document.getElementById('restart').addEventListener('click', () => {
            startQuiz();
        });
        progressBar.style.width = '100%';
    }
});
