// Adicionando um evento de escuta aos campos de entrada
document.getElementById('username').addEventListener('input', validateLoginForm);
document.getElementById('password').addEventListener('input', validateLoginForm);

// Função para validar o formulário de login
function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginButton = document.getElementById('loginButton'); // Selecionando corretamente o botão

    // Verifica se ambos os campos de entrada estão preenchidos
    if (username.trim() !== '' && password.trim() !== '') {
        // Se ambos os campos estiverem preenchidos, habilita o botão de login
        loginButton.removeAttribute('disabled');
    } else {
        // Se algum dos campos estiver vazio, desabilita o botão de login
        loginButton.setAttribute('disabled', 'disabled');
    }
}

// Adicionando evento de escuta ao formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fazer uma requisição AJAX para carregar o arquivo JSON
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var usuarios = JSON.parse(xhr.responseText);
                var usuarioEncontrado = usuarios.find(function(usuario) {
                    return usuario.username === username && usuario.password === password;
                });

                if (usuarioEncontrado) {
                    alert('Login bem-sucedido!');
                    // Armazenar o nome de usuário autenticado no localStorage
                    localStorage.setItem('usuarioAutenticado', JSON.stringify({ username: usuarioEncontrado.username }));
                    // Redirecionar para a página de feed após o login bem-sucedido
                    window.location.href = 'feed.html';
                } else {
                    alert('Usuário ou senha incorretos!');
                }
            } else {
                alert('Erro ao carregar usuários!');
            }
        }
    };
    xhr.open('GET', 'usuarios.json', true);
    xhr.send();
});
