export function createSession(userData){
    sessionStorage.setItem('session', JSON.stringify(userData))
}

export function getSessionItem(itemKey){
    let session = sessionStorage.getItem('session')
    if(session){
     let data = JSON.parse(session)[itemKey]
     return data
    }else {
        return null
    }
}

export function destroySession(){
    sessionStorage.clear()
}