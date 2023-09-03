import { getSessionItem } from "./session.js"
import { viewUserInfoSvg, userOptionsSvg } from "./svgCreator.js"
window.addEventListener('load', () => {
    getUsers()
})

function getUsers(){
    let wrapper = document.querySelector('#users-wrapper')
    fetch('includes/main.php?get=getUsers')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(user => {
            let card = createUserCard(user)
            wrapper.append(card)
        })
    })
    .catch(err => alert(err))
}

function createUserCard(userInfo){
    let userSignedUpId = Number(getSessionItem('userId'))
    let userSignedUpRole = getSessionItem('userRole') 

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
    cardBottom.setAttribute('id', userInfo.id)
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

    

    cardTop.append(userImg)
    cardBottom.append(userName)
    if(userSignedUpRole && userSignedUpRole !== 'user' && userSignedUpId !== userInfo.id){
        let arrowDownSvg = viewUserInfoSvg(
           "0 0 448 512",
           "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z",
           "show"
       )
       let gearSvg = userOptionsSvg(
        "0 0 512 512",
        "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z",
        userInfo.id.toString()
        )
       if(
        userSignedUpRole === 'moderator' && userInfo.userRole === 'user' ||
        userSignedUpRole === 'admin' && userInfo.userRole !== 'owner' ||
        userSignedUpRole === 'owner'
        ){
            gearSvg.addEventListener('click', (e) => accessUserOps(e.currentTarget.id))
        }
       cardTop.append(gearSvg)
       cardBottom.append(arrowDownSvg)    
       cardBottom.addEventListener('click', (e) => showUserInfo(e))  
   }else if(userSignedUpRole && userSignedUpRole !== 'user' || userSignedUpId === userInfo.id){
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
    let infoDiv = e.currentTarget.parentNode.children[2]
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
    let infoDiv = e.currentTarget.parentNode.children[2]
    infoDiv.style.display = 'none'
    e.currentTarget.removeEventListener('click', (e)=>hideUserInfo(e))
    e.currentTarget.addEventListener('click', (e) => showUserInfo(e))
}

function accessUserOps(userId){
    localStorage.setItem('userId', userId)
    window.location.href = 'userOperations.html'
}
