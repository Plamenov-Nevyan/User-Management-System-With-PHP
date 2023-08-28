import { validateLoginForm } from "./validators.js"
import { createSession } from "./session.js"
let loginForm = document.querySelector('#login-form')
let loginInputs = Array.from(document.querySelectorAll('.login-input'))

loginForm.addEventListener('submit', (e) => onLogin(e))
loginInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        let errorSpan = document.getElementById(`${input.id}-login-error`)
        errorSpan.textContent = ''
        errorSpan.style.display = 'none'
    })
})


function onLogin(e){
    e.preventDefault()
    let errors = validateLoginForm(loginInputs)
    if(errors){
        visualizeErrors(errors)
    }else {
        sendData({
            email: loginInputs[0].value,
            password: loginInputs[1].value
        })
    }
}

function sendData({email,password}){
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("action", `login`)
    fetch('includes/main.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.json())        // send the data for processing, empty the form and redirect to profile if response is ok
    .then(data => {
        if(typeof data !== 'string' ){
            console.log(data)
            createSession({userId: data[0]})
            window.location.href = "dashboard.html"
        }
    })
    .catch(err => {
        alert(err)
    })
}

function visualizeErrors(errors){
    Object.entries(errors).forEach(([key, val]) => {
        if(val !== null){
            let errorSpan = document.getElementById(`${key}-login-error`)
            errorSpan.style.display = 'block'
            errorSpan.textContent = val
        }
    })
}