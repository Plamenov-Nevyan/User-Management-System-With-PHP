export function createPasswordSvg(viewBox, path, hideOrShow){
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    iconSvg.setAttribute('viewBox', viewBox)
    if(hideOrShow === 'show'){
        iconSvg.setAttribute('id', 'show-password')
    }
    else{
        iconSvg.setAttribute('id', 'hide-password')
    }

    iconPath.setAttribute('d', path)
    iconSvg.appendChild(iconPath)
    return iconSvg
}

export function viewUserInfoSvg(viewBox, path, hideOrShow){
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    iconSvg.setAttribute('viewBox', viewBox)
    if(hideOrShow === 'show'){
        iconSvg.setAttribute('id', 'show-info')
    }
    else{
        iconSvg.setAttribute('id', 'hide-info')
    }

    iconPath.setAttribute('d', path)
    iconSvg.appendChild(iconPath)
    return iconSvg
}

export function userOptionsSvg(viewBox, path, userId){
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    iconSvg.setAttribute('viewBox', viewBox)
    iconSvg.setAttribute('id', userId)
    iconPath.setAttribute('d', path)
    iconSvg.appendChild(iconPath)
    return iconSvg
}