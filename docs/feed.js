// Contador para o número de publicações
var postCount = 0;
var postsPerPage = 10;
var nextPostsCount = 0; // Definir a variável nextPostsCount globalmente
var buttonVisible = false; // Variável para controlar a visibilidade do botão


// Verificar se o usuário está autenticado
var usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
if (!usuarioAutenticado) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    window.location.href = 'index.html';
}

// Adicionar botão para exibir próximas publicações acima do feed
var nextPostsButton = document.createElement('button');
nextPostsButton.style.display = 'none'; // Inicialmente ocultar o botão
updateNextPostsButtonText(); // Chamar a função para atualizar o texto do botão
nextPostsButton.onclick = function() {
    createNextPosts();
};
document.getElementById('feed').insertAdjacentElement('afterbegin', nextPostsButton);

// Verificar se o textarea está vazio e atualizar o estilo do botão
function updateButtonStyle() {
    var postContent = document.getElementById('post-content').value.trim();
    var postButton = document.getElementById('post-button');
    if (postContent === '') {
        postButton.disabled = true;
        postButton.classList.add('button-disabled');
    } else {
        postButton.disabled = false;
        postButton.classList.remove('button-disabled');
    }
}

// Chamar a função para atualizar o estilo do botão inicialmente
updateButtonStyle();

// Chamar a função quando o conteúdo do textarea mudar
document.getElementById('post-content').addEventListener('input', updateButtonStyle);


// Função para criar uma nova publicação
function createPost() {
    var content = document.getElementById('post-content').value.trim();
    var postButton = document.getElementById('post-button');
    if (content !== '') {
        var post = document.createElement('div');
        post.classList.add('post');
        var usuarioAutenticadoObj = JSON.parse(usuarioAutenticado);
        var username = usuarioAutenticadoObj.username;
        post.innerHTML = `
            <h2>Usuário ${username}</h2>
            <p>${content}</p>
        `;
        var feed = document.getElementById('feed');
        feed.insertBefore(post, nextPostsButton.nextSibling); // Inserir o post após o botão
        document.getElementById('post-content').value = ''; // Limpar o campo de texto após a publicação

        // Desabilitar o botão após a publicação
        postButton.disabled = true;
        postButton.classList.add('button-disabled');

        // Atualizar o estilo do botão
        updateButtonStyle();
    } else {
        // Se o conteúdo estiver vazio, manter o botão desabilitado
        postButton.disabled = true;
        postButton.classList.add('button-disabled');
    }
}

// Função para atualizar o texto do botão com o valor de nextPostsCount
function updateNextPostsButtonText() {
    nextPostsButton.textContent = `Exibir próximas ${nextPostsCount} publicações`;
}

// Função para criar as próximas publicações
function createNextPosts() {
    addPosts(nextPostsCount);
}

// Função para criar as publicações iniciais
function createInitialPosts() {
    addPosts(10); // Sempre cria 10 publicações iniciais
}

// Função para adicionar publicações ao feed
function addPosts(count) {
    for (var i = 0; i < count; i++) {
        postCount++;
        var post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
            <h2>Usuário ${Math.floor(Math.random() * 100)}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam libero. Vestibulum rutrum rhoncus leo, eget finibus magna tempus in.</p>
            <div class="post-number">#${postCount}</div> <!-- Número da publicação -->
        `;
        document.getElementById('feed').insertBefore(post, nextPostsButton.nextSibling);
    }
    nextPostsCount = Math.floor(Math.random() * 9) + 1; // Atualizar o valor de nextPostsCount após adicionar as publicações
    updateNextPostsButtonText(); // Atualizar o texto do botão com o novo valor de nextPostsCount

    // Ocultar o botão
    nextPostsButton.style.display = 'none';
    buttonVisible = false;

    // Definir um intervalo aleatório para mostrar o botão novamente
    var intervalo = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000; // Intervalo entre 5 e 30 segundos
    setTimeout(function() {
        nextPostsButton.style.display = 'inline-block';
        buttonVisible = true;
    }, intervalo);
}

// Criar 10 publicações iniciais
createInitialPosts();

window.addEventListener('resize', function() {
    adjustSize();
});

function adjustSize() {
    var windowHeight = window.innerHeight;
    var contentHeight = document.getElementById('content').offsetHeight;
    
    if (windowHeight < contentHeight) {
        document.getElementById('content').style.height = windowHeight + 'px';
    } else {
        document.getElementById('content').style.height = 'auto';
    }
}

// Chame a função para ajustar o tamanho inicialmente
adjustSize();
