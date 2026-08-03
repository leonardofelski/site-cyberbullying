// --- SISTEMA DE ACESSIBILIDADE E UTILITÁRIOS ---

// Alto Contraste
const btnContraste = document.getElementById('btn-contraste');
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
});

// Aumentar Fonte
const btnFonte = document.getElementById('btn-fonte');
let tamanhoFonte = 100;
btnFonte.addEventListener('click', () => {
    tamanhoFonte = tamanhoFonte >= 130 ? 100 : tamanhoFonte + 10;
    document.documentElement.style.fontSize = `${tamanhoFonte}%`;
});

// Botão Voltar ao Topo
const btnTopo = document.getElementById('btn-topo');
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }
};
btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- PORTAL DE ESCUTA ---
const formEscuta = document.getElementById('form-escuta');
const mensagemAcolhimento = document.getElementById('mensagem-acolhimento');
const fraseMotivacional = document.getElementById('frase-motivacional');

const frases = [
    "Sua voz importa. O que você sente não é frescura e existem caminhos seguros para superar isso.",
    "Nenhum ataque virtual define quem você é. A culpa do cyberbullying nunca é da vítima.",
    "Falar sobre o que dói é o primeiro passo para se proteger. Você é forte por estar aqui."
];

formEscuta.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento e envio real dos dados
    
    // Escolhe uma frase aleatória
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseMotivacional.textContent = fraseAleatoria;
    
    // Esconde o formulário e mostra o acolhimento
    formEscuta.classList.add('oculto');
    mensagemAcolhimento.classList.remove('oculto');
});


// --- QUIZ INTERATIVO (5 PERGUNTAS) ---
const perguntas = [
    {
        pergunta: "1. Um colega criou um perfil falso para piadas pesadas com um estudante. Isso é:",
        alternativas: ["Apenas uma brincadeira de internet.", "Cyberbullying, pois humilha e persegue alguém de forma digital.", "Normal em redes sociais."],
        correta: 1
    },
    {
        pergunta: "2. Qual é a atitude mais segura ao ver alguém sofrendo cyberbullying?",
        alternativas: ["Ignorar para não se envolver em confusão.", "Curtir e compartilhar para que mais pessoas vejam.", "Apoiar a vítima no privado e denunciar a publicação na plataforma."],
        correta: 2
    },
    {
        pergunta: "3. Uma pessoa desconhecida pediu uma foto sua prometendo um prêmio. Como agir?",
        alternativas: ["Não enviar e avisar imediatamente um adulto de confiança.", "Enviar, afinal parece uma boa oportunidade.", "Pedir o prêmio primeiro e depois enviar."],
        correta: 0
    },
    {
        pergunta: "4. Qual destas senhas pode ser considerada REALMENTE segura?",
        alternativas: ["123456abc", "nome+anodenascimento", "Xp9$2!mK_Q (Combina letras maiúsculas, minúsculas, números e símbolos)"],
        correta: 2
    },
    {
        pergunta: "5. Alguém printou uma conversa privada sua e espalhou no grupo da escola. O que fazer?",
        alternativas: ["Salvar as provas (prints) e contar a um responsável ou coordenação escolar.", "Criar uma mentira sobre essa pessoa para se vingar.", "Apagar todas as redes sociais e não falar com ninguém."],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const perguntaBox = document.getElementById('pergunta-box');
const alternativasBox = document.getElementById('alternativas-box');
const btnProximo = document.getElementById('btn-proximo');
const resultadoQuiz = document.getElementById('resultado-quiz');
const containerQuiz = document.getElementById('container-quiz');
const btnReiniciar = document.getElementById('btn-reiniciar');

function carregarPergunta() {
    btnProximo.classList.add('oculto');
    alternativasBox.innerHTML = '';
    
    let atual = perguntas[perguntaAtual];
    perguntaBox.innerHTML = `<h3>${atual.pergunta}</h3>`;
    
    atual.alternativas.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.innerText = opcao;
        botao.classList.add('alternativa');
        botao.addEventListener('click', () => selecionarResposta(index, botao));
        alternativasBox.appendChild(botao);
    });
}

function selecionarResposta(index, botaoSelecionado) {
    let atual = perguntas[perguntaAtual];
    let botoes = alternativasBox.querySelectorAll('.alternativa');
    
    // Desabilita todos após a escolha para não clicar duas vezes
    botoes.forEach(b => b.disabled = true);
    
    if (index === atual.correta) {
        botaoSelecionado.classList.add('correta');
        pontuacao++;
    } else {
        botaoSelecionado.classList.add('errada');
        botoes[atual.correta].classList.add('correta'); // Mostra a certa
    }
    
    btnProximo.classList.remove('oculto');
}

btnProximo.addEventListener('click', () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    containerQuiz.classList.add('oculto');
    resultadoQuiz.classList.remove('oculto');
    document.getElementById('placar').innerHTML = `Você acertou <strong>${pontuacao}</strong> de <strong>${perguntas.length}</strong> perguntas!<br>${pontuacao >= 4 ? "Parabéns! Você entende muito sobre cidadania digital." : "Que tal dar uma olhada nas nossas referências para aprender mais?"}`;
}

btnReiniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    resultadoQuiz.classList.add('oculto');
    containerQuiz.classList.remove('oculto');
    carregarPergunta();
});

// Inicia o quiz assim que a página abre
carregarPergunta();