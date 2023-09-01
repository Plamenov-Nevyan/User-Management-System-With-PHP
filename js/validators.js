const passwordValRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

export function validateRegisterForm(registerInputs){
    let errors = checkForEmptyInputs(registerInputs)  // check for empty inputs
    // if there are no empty inputs, check their validity
    if(Object.values(errors).every(val => val === null)){
       errors = {...inputsValidator(registerInputs, errors)}
    }
    //visualize errors through every error span corresponding to its input sibling
    if(Object.values(errors).some(val => val !== null)){
      return errors
    }else {
        return false
    }
}

export function validateLoginForm(loginInputs){
    let errors = checkForEmptyInputs(loginInputs) // check for empty inputs
    // if there are no empty inputs, check their validity
    if(Object.values(errors).every(val => val === null)){
       errors = {...inputsValidator(loginInputs, errors)}
    }
    //visualize errors through every error span corresponding to its input sibling
    if(Object.values(errors).some(val => val !== null)){
        return errors
    }else{
        return false
    }
}

export function validateChangeForm(changeInputs){
    let errors = checkForEmptyInputs(changeInputs) // check for empty inputs
    // if there are no empty inputs, check their validity
    if(Object.values(errors).every(val => val === null)){
       errors = {...inputsValidator(changeInputs, errors)}
    }
    //visualize errors through every error span corresponding to its input sibling
    if(Object.values(errors).some(val => val !== null)){
        return errors
    }else{
        return false
    }
}

function checkForEmptyInputs(inputs){
    let errors = {}
    Array.from(inputs).forEach(input => {  // llok for empty inputs and attach errors to errors object if there are any 
        if(input.value === ''){
            errors[input.id] = input.id === 'phone' 
            ? `Please fill the required field for phone number!` 
            : `Please fill the required field for ${input.id}!` 
        }
    })
    return errors
}
function inputsValidator(inputs, errors){
    Array.from(inputs).forEach(input => {
        let value = input.value
        if(input.id === 'username' || input.id === 'current-username' || input.id === 'new-username'){
           errors[input.id] = value.length < 5 ? 'Username should be at least 5 characters long!' : null
        }
        if(input.id === 'email' || input.id === 'current-email' || input.id === 'new-email'){
            errors[input.id] = value.length < 10 && !value.split('').includes('@')
            ? 'Please enter a valid email !'
            : null
         }
         if(input.id === 'phone' || input.id === 'current-phone' || input.id === 'new-phone'){
            errors[input.id] = value.length < 5 
            ? 'Phone number should be at least 5 characters long!' 
            : value.split('').some(char => isNaN(char))
                ? "Phone number shouldn\'t contain letters!"
                : null
         }
         if(input.id === 'password' || input.id === 'current-password' || input.id === 'new-password'){
            errors[input.id] = value.length < 6 
            ? 'Password should be at least 6 characters long!' 
            : passwordValRegex.test(value)
                ? null
                : 'Password should contain at least one letter and one number!'
         }
    })
    return errors
}
function visualizeErrors(errors, action){
    Object.entries(errors).forEach(([key, val]) => {
        if(val !== null){
            let errorSpan = action === 'login'
            ? document.getElementById(`${key}-login-error`)
            : action === 'change'
                ? document.getElementById(`${key.split('-')[1]}-${key.split('-')[0]}-error`)
                : document.getElementById(`${key}-error`)
            errorSpan.style.display = 'block'
            errorSpan.textContent = val
        }
    })
}