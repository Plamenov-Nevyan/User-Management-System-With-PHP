let homeLink = document.getElementById('home-link');
let loginLink = document.getElementById('login-link');
let registerLink = document.getElementById('register-link');

homeLink.addEventListener('click', () => {
    window.location.href = 'index.html'
    removeActiveClass()
    homeLink.classList.add('active')
})

loginLink.addEventListener('click', () => {
    loginLink.classList.add('active')
    window.location.href = 'login.html'
})

registerLink.addEventListener('click', () => {
    window.location.href = 'register.html'
    registerLink.classList.add('active')
})

function removeActiveClass(){
    if(homeLink.classList.contains('active')){
        homeLink.classList.remove('active')
    }
    else if(loginLink.classList.contains('active')){
        loginLink.classList.remove('active')
    }
    else if(registerLink.classList.contains('active')){
        registerLink.classList.remove('active')
    }
}