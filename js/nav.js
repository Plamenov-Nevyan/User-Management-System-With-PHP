let homeLink = document.getElementById('home-link');
let loginLink = document.getElementById('login-link');
let registerLink = document.getElementById('register-link');

homeLink.addEventListener('click', () => {
    window.location.href = 'index.html'
})

loginLink.addEventListener('click', () => {
    window.location.href = 'login.html'
})

registerLink.addEventListener('click', () => {
    window.location.href = 'register.html'
})