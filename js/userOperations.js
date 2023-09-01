let optionBtns = document.querySelectorAll('.option-btn')
import { onChangeSubmit } from "./validators.js"

if(optionBtns !== null){
    Array.from(optionBtns).forEach(btn => {
        btn.addEventListener('click', (e) => changeOptionForm(e.target.id))
    })  

    function changeOptionForm(option){
        let formData = new FormData()
        formData.append('option', option)    //send the chosen option (option button id) to profileOptions.php through post request
        fetch('profileOptions.php', {        //  so we can get back form HTML to render
            method: 'POST',
            body: formData
        }).then((response) => {
            if(!response.ok){
                throw new Error('Changing options failed.')
            }
            return response.json()
        }).then((data) => {
            document.querySelector('.forms').innerHTML = data.form  // render the form and attach event for submitting it
            document.querySelector('.forms > form').addEventListener('submit', (e) => onChangeSubmit(e))
        }).catch(err => {
           alert(err)
        })
    }
}
