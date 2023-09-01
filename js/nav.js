import { getSessionItem, destroySession } from "./session.js";
let linksList = document.getElementsByClassName('nav-list')[0];

let isUserLoggedIn = getSessionItem('userId')

window.addEventListener('load', () => constructNavigation())
linksList.replaceChildren()
function constructNavigation(){
let authLinks = createLinks(isUserLoggedIn)
if(isUserLoggedIn){
    let homeLink = document.getElementById('home-link');
    let loginLink = document.getElementById('login-link');
    let registerLink = document.getElementById('register-link');
    if(homeLink){homeLink.remove()}
    if(loginLink){loginLink.remove()}
    if(registerLink){registerLink.remove()}
    authLinks.forEach(link => {
        if(link.id === 'dashboard-link'){
            link.addEventListener('click', () => {
                window.location.href = 'dashboard.html'
                removeActiveClass(authLinks)
                link.classList.add('active')
            })
        }else if(link.id === 'prof-options-link'){
            link.addEventListener('click', () => {
                loginLink.classList.add('active')
                window.location.href = 'prof-options.html'
            })
        }else if(link.id === 'logout'){
            link.addEventListener('click', () => {
                destroySession()
                window.location.href = 'index.html'
            })
        }
        linksList.appendChild(link)
    })
}else{
    let dashboardLink = document.querySelector('#dashboard-link')
    if(dashboardLink){dashboardLink.remove()}
    let profOptionsLink = document.querySelector('#prof-options-link')
    if(profOptionsLink){profOptionsLink.remove()}
    let logoutLink = document.querySelector('#logout-link')
    if(logoutLink){logoutLink.remove()}
    authLinks.forEach(link => {
        if(link.id === 'home-link'){
            link.addEventListener('click', () => {
                window.location.href = 'index.html'
                removeActiveClass(authLinks)
                link.classList.add('active')
            })
        }else if(link.id === 'login-link'){
            link.addEventListener('click', () => {
                window.location.href = 'login.html'
                removeActiveClass(authLinks)
                link.classList.add('active')
            })
        }else if(link.id === 'register-link'){
            link.addEventListener('click', () => {
                window.location.href = 'register.html'
                removeActiveClass(authLinks)
                link.classList.add('active')
            })
        }
        linksList.appendChild(link)
    })
    // homeLink.addEventListener('click', () => {
    //     window.location.href = 'index.html'
    //     removeActiveClass()
    //     homeLink.classList.add('active')
    // })

    // loginLink.addEventListener('click', () => {
    //     loginLink.classList.add('active')
    //     window.location.href = 'login.html'
    // })

    // registerLink.addEventListener('click', () => {
    //     window.location.href = 'register.html'
    //     registerLink.classList.add('active')
    // })
    }

}


function removeActiveClass(links){
    console.log(links)
    links.forEach(link => {
        if(link.classList.contains('active')){
            link.classList.remove('active')
        }
    })
}

function createLinks(isUserLoggedIn){
    let links = []
    if(isUserLoggedIn){
        for(let i = 0; i < 3; i++){
            let liItem = document.createElement('li')
            if(i === 0){
                liItem.setAttribute('id', 'dashboard-link')
                liItem.textContent = 'Dashboard'
                liItem.addEventListener('click', () => {
                    window.location.href = 'dashboard.html'
                })
                liItem.classList.add('active')
            }else if(i === 1){
                liItem.setAttribute('id', 'prof-options-link')
                liItem.textContent = 'Profile Options'
                liItem.addEventListener('click', () => {
                    window.location.href = 'profileOptions.html'
                })
            }else{
                liItem.setAttribute('id', 'logout-link')
                liItem.textContent = 'Logout'
            }
            liItem.classList.add('nav-li-item')
            links.push(liItem)
        }
    }else {
        for(let i = 0; i < 3; i++){
            let liItem = document.createElement('li')
            if(i === 0){
                liItem.setAttribute('id', 'home-link')
                liItem.textContent = 'Home'
                liItem.classList.add('active')
            }else if(i === 1){
                liItem.setAttribute('id', 'login-link')
                liItem.textContent = 'Login'
            }else{
                liItem.setAttribute('id', 'register-link')
                liItem.textContent = 'Register'
            }
            liItem.classList.add('nav-li-item')
            links.push(liItem)
        }
    }
    return links
}