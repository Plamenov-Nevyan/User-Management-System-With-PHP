import { validateChangeForm } from "./validators.js"
import { getSessionItem } from "./session.js"
let optionBtns = document.querySelectorAll('.option-btn')
let changeForms = document.querySelectorAll('.change-form')
let suggestionHeading = document.querySelector('#suggestion-heading')
let isUserBanned;

window.addEventListener('load', () => {
    checkIfUserIsBanned(getSessionItem('userId'))
    let profOptionsLink = document.querySelector('#prof-options-link')
    profOptionsLink.classList.add('active')
})

if(optionBtns !== null){
    Array.from(optionBtns).forEach(btn => {
        btn.addEventListener('click', (e) => changeOptionForm(e.target.id))
    })  

    function changeOptionForm(option){
        changeForms.forEach(form => form.style.display = 'none')
        suggestionHeading.style.display = 'none'
        let chosenForm = document.querySelector(`#${option}-form`)
        chosenForm.style.display = 'flex'
        chosenForm.addEventListener('submit', (e) => onChangeSubmit(e))
    }
}

 const onChangeSubmit = (e) => {
    console.log(e.target)
    e.preventDefault()
    if(e.target.id === 'change-username-form'){
        let [currentUsernameInput, newUsernameInput] = [document.querySelector('#current-username'), document.querySelector('#new-username')]
        let errors = validateChangeForm([currentUsernameInput, newUsernameInput])
        if(errors){
            visualizeErrors(errors)
        }else {
            sendData(e.target.id, {
                currentUsername: currentUsernameInput.value,
                newUsername: newUsernameInput.value
            })
        }
    }else if(e.target.id === 'change-email-form'){
        let [currentEmailInput, newEmailInput] = [document.querySelector('#current-email'), document.querySelector('#new-email')]
        let errors = validateChangeForm([currentEmailInput, newEmailInput])
        if(errors){
            visualizeErrors(errors)
        }else {
            sendData(e.target.id, {
                currentEmail: currentEmailInput.value,
                newEmail: newEmailInput.value
            })
        }
    }else if(e.target.id === 'change-phone-form'){
        let [currentPhoneInput, newPhoneInput] = [document.querySelector('#current-phone'), document.querySelector('#new-phone')]
        let errors = validateChangeForm([currentPhoneInput, newPhoneInput])
        if(errors){
            visualizeErrors(errors)
        }else {
            sendData(e.target.id, {
                currentPhone: currentPhoneInput.value,
                newPhone: newPhoneInput.value
            })
        }
    }else if(e.target.id === 'change-password-form'){
        let [currentPasswordInput, newPasswordInput] = [document.querySelector('#current-password'), document.querySelector('#new-password')]
        let errors = validateChangeForm([currentPasswordInput, newPasswordInput])
        if(errors){
            visualizeErrors(errors)
        }else {
            sendData(e.target.id,{
                currentPassword: currentPasswordInput.value,
                newPassword: newPasswordInput.value
            })
        }
    }
}


function sendData(action, inputs){
    let formData = new FormData()
    let userId = getSessionItem('userId')
    if(action === 'change-username-form'){
        formData.append("action", 'changeUsername')
        formData.append("userId", userId)
        formData.append("currentUsername", inputs.currentUsername)
        formData.append("newUsername", inputs.newUsername)
    }else if(action === 'change-email-form'){
        formData.append("action", 'changeEmail')
        formData.append("userId", userId)
        formData.append("currentEmail", inputs.currentEmail)
        formData.append("newEmail", inputs.newEmail)
    }else if(action === 'change-phone-form'){
        formData.append("action", 'changePhone')
        formData.append("userId", userId)
        formData.append("currentPhone", inputs.currentPhone)
        formData.append("newPhone", inputs.newPhone)
    }else if(action === 'change-password-form'){
        formData.append("action", 'changePassword')
        formData.append("userId", userId)
        formData.append("currentPassword", inputs.currentPassword)
        formData.append("newPassword", inputs.newPassword)
    }

    fetch('includes/main.php', {
        method: 'POST',
        body: formData
    })
    .then((resp) => {
        return resp.text()
    })
    .then((data) => {
        if(!data.includes('Error')){
            window.location.href = 'dashboard.html'
        }
        alert(`${data}`)
    })
    .catch(err => alert(`${err}`))
}


function visualizeErrors(errors){
    Object.entries(errors).forEach(([key, val]) => {
        if(val !== null){
            let errorSpan = document.getElementById(`${key.split('-')[1]}-${key.split('-')[0]}-error`)
            errorSpan.style.display = 'block'
            errorSpan.textContent = val
        }
    })
}

function checkIfUserIsBanned(userId){
    fetch('includes/main.php?get=checkIfBanned&userId=' + `${userId}`)
    .then(resp => resp.json())
    .then(data => {
        if(data.isBanned){
              isUserBanned = true
              alert('Your currently banned from updating your profile !')   
              window.location.href = 'dashboard.html'
          }  
      })
    .catch(err => alert('Oops.. something went wrong'))
}