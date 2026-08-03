document.addEventListener('DOMContentLoaded', () => {

    // 1. Simulação do Formulario do Portal de Escuta
    const formEscuta = document.getElementById('form-escuta');
    const feedbackMensagem = document.getElementById('feedback-mensagem');

    formEscuta.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nomeInput = document.getElementById('nome').value.trim();
        const nomeExibicao = nomeInput ? nomeInput : 'Amigo(a)';

        // Mensagem automática de acolhimento (Nenhum dado é salvo)
        feedbackMensagem.classList.remove('hidden');
        feedbackMensagem.innerHTML = `
            <strong>Obrigado por compartilhar, ${nomeExibicao}!</strong><br>
            Sua mensagem foi recebida com carinho. Lembre-se de que você é uma pessoa valiosa e não está só.<br>
            <em>Recomendamos fortemente procurar um adulto de confiança na sua escola ou família para te orientar pessoalmente.</em>
        `;

        formEscuta.reset();
    });

    // 2. Quiz Interativo (5 Perguntas sobre Cyberbullying e Segurança)
    const quizQuestions = [
        {
            question: "1. O que caracteriza o Cyberbullying?",
            options: [
                "Elogiar um colega em uma foto pública.",
                "Usar a internet para humilhar, ameaçar ou expor alguém repetidamente.",
                "Discordar educadamente da opinião de alguém em um fórum.",
                "Compartilhar um meme engraçado sem direcionar a ninguém."
            ],
            correct: 1
        },
        {
            question: "2. Qual das senhas abaixo é a mais segura?",
            options: [
                "12345678",
                "suanatagao2010",
                "P@ss#2026!Segura",
                "nomeDoSeuPet"
            ],
            correct: 2
        },
        {
            question: "3. Se você ver um colega sendo ridicularizado em um grupo de mensagens, o que deve fazer?",
            options: [
                "Rir e repassar a mensagem para outros grupos.",
                "Ignorar totalmente e fingir que não viu nada.",
                "Não participar da zombaria e avisar um adulto responsável ou denunciar.",
                "Apoiar as ofensas para não virar o próximo alvo."
            ],
            correct: 2
        },
        {
            question: "4. Recebeu uma mensagem de um estranho pedindo fotos pessoais. Qual é a atitude correta?",
            options: [
                "Enviar, afinal parece ser uma pessoa legal.",
                "Não responder, bloquear o perfil e avisar um responsável imediatamente.",
                "Pedir uma foto em troca antes de enviar.",
                "Publicar a foto no perfil público."
            ],
            correct: 1
        },
        {
            question: "5. O que significa ter empatia no ambiente digital?",
            options: [
                "Pensar como a outra pessoa se sentirá antes de postar ou comentar algo.",
                "Concordar com tudo o que os outros postam.",
                "Ignorar as regras de convivência para se divertir.",
                "Usar perfis fakes para dar opiniões polêmicas."
            ],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');

    function loadQuiz() {
        if (currentQuestion < quizQuestions.length) {
            const q = quizQuestions[currentQuestion];
            let optionsHtml = '';
            
            q.options.forEach((option, index) => {
                optionsHtml += `<button class="quiz-option" onclick="checkAnswer(${index})">${option}</button>`;
            });

            quizContainer.innerHTML = `
                <h3>${q.question}</h3>
                <div class="options-group">${optionsHtml}</div>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #777;">Pergunta ${currentQuestion + 1} de ${quizQuestions.length}</p>
            `;
        } else {
            showResults();
        }
    }

    window.checkAnswer = function(selectedIndex) {
        if (selectedIndex === quizQuestions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        loadQuiz();
    };

    function showResults() {
        quizContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        let feedbackClass = score >= 3 ? 'style="color: green;"' : 'style="color: orange;"';
        
        quizResult.innerHTML = `
            <h3>Quiz Concluído!</h3>
            <p ${feedbackClass}>Você acertou <strong>${score}</strong> de <strong>${quizQuestions.length}</strong> perguntas.</p>
            <p>${score >= 3 ? 'Parabéns! Você demonstra boa conscientização digital!' : 'Continue estudando e praticando a empatia nas redes!'}</p>
            <button class="btn-primary" onclick="restartQuiz()">Refazer Quiz</button>
        `;
    }

    window.restartQuiz = function() {
        currentQuestion = 0;
        score = 0;
        quizResult.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuiz();
    };

    loadQuiz();

    // 3. Diferenciais: Modo Escuro & Tamanho de Fonte
    const toggleContrast = document.getElementById('toggle-contrast');
    toggleContrast.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    let currentFontSize = 16;
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');

    increaseFont.addEventListener('click', () => {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    decreaseFont.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    // 4. Botão Voltar ao Topo
    const btnTop = document.getElementById('btn-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTop.style.display = 'block';
        } else {
            btnTop.style.display = 'none';
        }
    });

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});