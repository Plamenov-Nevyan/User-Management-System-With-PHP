export function createSession(userData){
    sessionStorage.setItem('session', JSON.stringify(userData))
}

export function getSessionItem(itemKey){
    let data = JSON.parse(sessionStorage.getItem('session'))[itemKey]
    return data
}