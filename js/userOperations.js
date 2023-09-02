import { getSessionItem } from "./session.js"

let userSignedUpRole = getSessionItem('userRole')
let userSignedUpId = getSessionItem('userId')

window.addEventListener('load', () => getUserInfo())



function getUserInfo(){
    let userAccessedId = localStorage.getItem('userId')

    let infoDiv = document.querySelector('.user-accessed-info')
    let actionsMenu = document.querySelector('.action-menu')
    fetch('includes/main.php?get=getUser&userId=' + `${userAccessedId}`)
    .then(resp => resp.json())
    .then(data => {
            let actionButtons = generateActionsTemplate(data)
            console.log(actionButtons)
            let infoTemplate = generateUserInfoTemplate(data)
            infoDiv.append(infoTemplate)
            actionsMenu.append(actionButtons)
    })
    .catch(err => alert(err))
}

function generateUserInfoTemplate(userInfo){
    let username = document.createElement('h5')
    username.textContent = `Username: ${userInfo.username}`
    let email = document.createElement('h5')
    email.textContent = `Email: ${userInfo.email}`
    let phone = document.createElement('h5')
    phone.textContent = `Phone number: ${userInfo.phone}`
    let role = document.createElement('h5')
    role.textContent = `Role: ${userInfo.userRole}`
    let isForbiddenToUpdate = document.createElement('h5')
    isForbiddenToUpdate.textContent = `Banned: ${userInfo.isForbiddenToUpdate === 0 ? 'No' : 'Yes'}`
    let createdAt = document.createElement('h5')
    createdAt.textContent = `Account created on: ${userInfo.created_at}`
    let id = document.createElement('h5')
    id.textContent = `User id: ${userInfo.id}`
    let allInfoDiv = document.createElement('div')
    allInfoDiv.append(username)
    allInfoDiv.append(email)
    allInfoDiv.append(phone)
    allInfoDiv.append(role)
    allInfoDiv.append(isForbiddenToUpdate)
    allInfoDiv.append(createdAt)
    allInfoDiv.append(id)
    return allInfoDiv
}

function generateActionsTemplate(userAccessed){
    let buttonsDiv = document.createElement('div')
    if(userSignedUpRole === ' moderator'){
        if(userAccessed.isForbiddenToUpdate === 0){
            let banButton = document.createElement('button')
            banButton.setAttribute('id', 'ban-btn')
            banButton.textContent = 'Ban user from updating'
            banButton.addEventListener('click',() =>  banUserFromUpdating(userAccessed.id))
            buttonsDiv.append(banButton)
        }else if(userAccessed.isForbiddenToUpdate === 1){
            let removeBanButton = document.createElement('button')
            removeBanButton.setAttribute('id', 'remove-ban-btn')
            removeBanButton.textContent = 'Remove update ban from user'
            removeBanButton.addEventListener('click',() =>  removeBanFromUpdating(userAccessed.id))
            buttonsDiv.append(removeBanButton)
        }
    }else if(userSignedUpRole === 'admin'){
        if(userAccessed.isForbiddenToUpdate === 0){
            let banButton = document.createElement('button')
            banButton.setAttribute('id', 'ban-btn')
            banButton.textContent = 'Ban user from updating'
            banButton.addEventListener('click',() =>  banUserFromUpdating(userAccessed.id))
            buttonsDiv.append(banButton)
        }else if(userAccessed.isForbiddenToUpdate === 1){
            let removeBanButton = document.createElement('button')
            removeBanButton.setAttribute('id', 'remove-ban-btn')
            removeBanButton.textContent = 'Remove update ban from user'
            removeBanButton.addEventListener('click',() =>  removeBanFromUpdating(userAccessed.id))
            buttonsDiv.append(removeBanButton)
        }

        let makeModeratorBtn = document.createElement('button')
        makeModeratorBtn.setAttribute('id', 'make-moderator-btn')
        makeModeratorBtn.textContent = 'Make user a moderator'
        buttonsDiv.append(makeModeratorBtn)

       if(userAccessed.userRole === 'moderator'){
            let demoteBtn = document.createElement('button')
            demoteBtn.setAttribute('id', 'demote-btn')
            demoteBtn.textContent = 'Demote into regular user'
            buttonsDiv.append(demoteBtn)
       }

        if(userAccessed.userRole !== 'moderator'){
            let deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('id', 'delete-btn')
            deleteBtn.textContent = 'Remove user permanently'
            buttonsDiv.append(deleteBtn)
        }
    }else if(userSignedUpRole === 'owner'){
        if(userAccessed.isForbiddenToUpdate === 0){
            let banButton = document.createElement('button')
            banButton.setAttribute('id', 'ban-btn')
            banButton.textContent = 'Ban user from updating'
            banButton.addEventListener('click',() =>  banUserFromUpdating(userAccessed.id))
            buttonsDiv.append(banButton)
        }else if(userAccessed.isForbiddenToUpdate === 1){
            let removeBanButton = document.createElement('button')
            removeBanButton.setAttribute('id', 'remove-ban-btn')
            removeBanButton.textContent = 'Remove update ban from user'
            removeBanButton.addEventListener('click',() =>  removeBanFromUpdating(userAccessed.id))
            buttonsDiv.append(removeBanButton)
        }

        let makeModeratorBtn = document.createElement('button')
        makeModeratorBtn.setAttribute('id', 'make-moderator-btn')
        makeModeratorBtn.textContent = 'Make user a moderator'
        buttonsDiv.append(makeModeratorBtn)

        let makeAdminBtn = document.createElement('button')
        makeAdminBtn.setAttribute('id', 'make-admin-btn')
        makeAdminBtn.textContent = 'Make user a admin'
        buttonsDiv.append(makeAdminBtn)

        if(userAccessed.userRole === 'moderator' || userAccessed.userRole === 'admin'){
            let demoteBtn = document.createElement('button')
            demoteBtn.setAttribute('id', 'demote-btn')
            demoteBtn.textContent = 'Demote into regular user'
            buttonsDiv.append(demoteBtn)
        }

        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('id', 'delete-btn')
        deleteBtn.textContent = 'Remove user permanently'
        buttonsDiv.append(deleteBtn)
    }
    return buttonsDiv
}

function banUserFromUpdating(userId){
    let formData = new FormData()
    formData.append('isForbiddenToUpdate', 1)
    formData.append('userId', userId)
    formData.append('action', 'banFromUpdating')
    fetch('includes/main.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.text())
    .then(message => {
        alert(message)
        window.location.href = 'userOperations.html'
    })
    .catch(error => alert('Error: ' + error))
}

function removeBanFromUpdating(userId){
    let formData = new FormData()
    formData.append('isForbiddenToUpdate', 0)
    formData.append('userId', userId)
    formData.append('action', 'removeBanFromUpdating')
    fetch('includes/main.php', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.text())
    .then(message => {
        alert(message)
        window.location.href = 'userOperations.html'
    })
    .catch(error => alert('Error: ' + error))
}