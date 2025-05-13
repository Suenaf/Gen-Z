console.log("Hello from Quiz JS!");

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('jugendwoerter');
    const progressBar = document.getElementById('progress-bar');

    let begriffe = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const maxFragen = 10;
    let dataBackup = [];

    if (!container || !progressBar) {
        console.error("Benötigte HTML-Elemente nicht gefunden!");
        return;
    }

    fetchNewDataAndStartQuiz();

    function fetchNewDataAndStartQuiz() {
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
    }

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

        const wrongAnswers = dataBackup
            .filter(b => b.bedeutung !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        const answers = [correctAnswer, ...wrongAnswers.map(w => w.bedeutung)].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="question">
                <p>Frage ${currentQuestionIndex + 1} von ${maxFragen}:<br>
                Was bedeutet <strong>"${item.wort}"</strong>?</p>
                <div class="buttons">
                    ${answers.map(answer => `<button>${answer}</button>`).join('')}
                </div>
                <p class="info" style="font-style: italic;"></p>
            </div>
        `;

        const buttons = container.querySelectorAll('button');
        const infoText = container.querySelector('.info');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.innerText;
                if (answer === correctAnswer) {
                    if (attempts === 0) {
                        score += 1;
                        infoText.innerText = "Richtig!";
                    } else {
                        score += 0.5;
                        infoText.innerText = "Richtig (beim zweiten Versuch)!";
                    }
                    highlightButtons(correctAnswer);
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
            });
        });

        function disableAllButtons() {
            buttons.forEach(btn => {
                btn.disabled = true;
            });
        }

        function highlightButtons(correct) {
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
            fetchNewDataAndStartQuiz();
        });

        progressBar.style.width = '100%';
    }
});
