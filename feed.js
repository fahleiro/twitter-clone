// Contador para o número de publicações
var postCount = 0;
var postsPerPage = 10;

// Verificar se o usuário está autenticado
var usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
if (!usuarioAutenticado) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    window.location.href = 'index.html';
}

// Adicionar botão para exibir próximas publicações acima do feed
var nextPostsButton = document.createElement('button');
nextPostsButton.textContent = `Exibir próximas publicações`;
nextPostsButton.onclick = function() {
    createNextPosts();
};
document.getElementById('feed').insertAdjacentElement('afterbegin', nextPostsButton);

// Função para criar uma nova publicação
function createPost() {
    var content = document.getElementById('post-content').value.trim();
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
    }
}


// Função para criar as próximas publicações
function createNextPosts() {
    var nextPostsCount = Math.floor(Math.random() * 9) + 1; // Gera um número aleatório de 1 a 9
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
