import { validateRegisterForm } from "./validators.js"
import { createSession } from "./session.js"
let registerForm = document.querySelector('#register-form')
let registerInputs = Array.from(document.querySelectorAll('.register-input'))

registerForm.addEventListener('submit', (e) => onRegister(e))
registerInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        let errorSpan = document.getElementById(`${input.id}-error`)
        errorSpan.textContent = ''
        errorSpan.style.display = 'none'
    })
})

function onRegister(e){
    e.preventDefault()
    let errors = validateRegisterForm(registerInputs)
    if(errors){
        visualizeErrors(errors)
    }else {
        sendData({
            username : registerInputs[0].value,
            email: registerInputs[1].value,
            phone: registerInputs[2].value,
            password: registerInputs[3].value
        })
    }
}

function sendData({username, email, phone, password}){
    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("password", password)
    formData.append("action", `register`)
    fetch('includes/main.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.json())        // send the data for processing, empty the form and redirect to profile if response is ok
    .then(data => {
        createSession({userId: data[0]})
        window.location.href = "dashboard.html"
    })
    .catch(err => {
        alert(err)
    })
}

function visualizeErrors(errors){
    Object.entries(errors).forEach(([key, val]) => {
        if(val !== null){
            let errorSpan = document.getElementById(`${key}-error`)
            errorSpan.style.display = 'block'
            errorSpan.textContent = val
        }
    })
}