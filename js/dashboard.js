import { getSessionItem } from "./session.js"
import { viewUserInfoSvg } from "./svgCreator.js"

window.addEventListener('load', () => getUsers())

function getUsers(){
    let wrapper = document.querySelector('#users-wrapper')
    fetch('includes/main.php?get=getUsers')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(user => {
            let card = createUserCard(user)
            wrapper.append(card)
        })
    })
    .catch(err => alert(err))
}

function createUserCard(userInfo){
    let userSignedUpId = getSessionItem('userId')
    let newCard = document.createElement('div')
    if(userInfo.id === Number(userSignedUpId)){
        newCard.style.background = 'limegreen'
    }
    newCard.classList.add('card')
    let cardTop = document.createElement('div')
    cardTop.classList.add('card-top')
    let userImg = document.createElement('img')
    userImg.setAttribute('src', 'https://icatprogramme.org/site-assets/uploads/2017/06/Anon-profile.png')
    let cardBottom = document.createElement('div')
    cardBottom.classList.add('card-bottom')
    let userName = document.createElement('h4')
    userName.textContent = userInfo.id === Number(userSignedUpId) ?'Me' : userInfo.username
    let userInfoDiv = document.createElement('div')
    userInfoDiv.setAttribute('class', 'user-info')
    userInfoDiv.setAttribute('id', 'info-div')
    userInfoDiv.style.display = 'none'
    let email = document.createElement('h5')
    email.textContent = `Email: ${userInfo.email}`
    let phone = document.createElement('h5')
    phone.textContent = `Phone number: ${userInfo.phone}`
    let role = document.createElement('h5')
    role.textContent = `Role: ${userInfo.userRole}`
    let isForbiddenToUpdate = document.createElement('h5')
    isForbiddenToUpdate.textContent = `Banned: ${userInfo.isForbiddenToUpdate === 0 ? 'No' : 'Yes'}`
    userInfoDiv.append(email)
    userInfoDiv.append(phone)
    userInfoDiv.append(role)
    userInfoDiv.append(isForbiddenToUpdate)

    let userSignedUpRole = getSessionItem('userRole') 

    cardTop.append(userImg)
    cardBottom.append(userName)
    if(userSignedUpRole && userSignedUpRole !== 'user'){
        let arrowDownSvg = viewUserInfoSvg(
           "0 0 448 512",
           "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z",
           "show"
       )
       cardBottom.append(arrowDownSvg)    
       cardBottom.addEventListener('click', (e) => showUserInfo(e))  
   }
    newCard.append(cardTop)
    newCard.append(cardBottom)
    newCard.append(userInfoDiv)
    return newCard
}

function showUserInfo(e){
    let svg = Array.from(e.currentTarget.children)[1]
    svg.remove()
    let arrowUpSvg = viewUserInfoSvg(
        "0 0 448 512",
        "M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z",
        'hide'
    )
    e.currentTarget.append(arrowUpSvg)
    let infoDiv = document.querySelector('#info-div')
    infoDiv.style.display = 'flex'
    e.currentTarget.removeEventListener('click', (e) => showUserInfo(e))
    e.currentTarget.addEventListener('click', (e) => hideUserInfo(e))
}

function hideUserInfo(e){
    let svg = Array.from(e.currentTarget.children)[1]
    svg.remove()
    let arrowDownSvg = viewUserInfoSvg(
        "0 0 448 512",
        "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z",
        "show"
    )
    e.currentTarget.append(arrowDownSvg)
    let infoDiv = document.querySelector('#info-div')
    infoDiv.style.display = 'none'
    e.currentTarget.removeEventListener('click', (e)=>hideUserInfo(e))
    e.currentTarget.addEventListener('click', (e) => showUserInfo(e))
}