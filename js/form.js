function labelUp(input, label, labelClass) {
    if(!input.value == "") {
        label.classList.add(labelClass);
    } else if(input.value == "") {
        if(label.classList.contains(labelClass)) {
            label.classList.remove(labelClass);
        }
    }
}

function checkValid(input, errorClass) {
    if(!input.validity.valid) {
            errorClass.classList.add('required-error--active');
        return false;
    } else {
        if(errorClass.classList.contains('required-error--active')) {
            errorClass.classList.remove('required-error--active');
        }
        return true;
    }
}

function emailValid(input) {
    if(!advancedMailValid(input.value)) {
        return false;
    }
    return true;
}

function checkCheckBox(checkBox, errorClassCheck) {
    if(checkBox.checked === false) {
        errorClassCheck.classList.add('required-error--active');
        checkBox.style.borderColor = "red";
        return false;
    } else {
        if(errorClassCheck.classList.contains('required-error--active')) {
            errorClassCheck.classList.remove('required-error--active');
        }
        checkBox.style.borderColor = "";
        return true;
    }
}

function advancedMailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function addError(errorValid, succesValid, activeError, activeSucces) {
    errorValid.classList.add(activeError);
        if(succesValid.classList.contains(activeSucces)) {
            succesValid.classList.remove(activeSucces);
        }
}

function addSeccess(errorValid, succesValid, activeError, activeSucces) {
    succesValid.classList.add(activeSucces);
        if(errorValid.classList.contains(activeError)) {
            errorValid.classList.remove(activeError);
        }
}


function validationAlerts(input, errorClassValid, successClassValid, activeClassError, activeClassSuccess) {
    if(!input.validity.valid) {
        addError(errorClassValid, successClassValid, activeClassError, activeClassSuccess)
    } else {
        addSeccess(errorClassValid, successClassValid, activeClassError, activeClassSuccess)
    }
}

function validationEmailAlert(input, errorClassValid, succesClassValid, activeClassError, activeClassSuccess) {
    if(!advancedMailValid(input.value)) {
        addError(errorClassValid, succesClassValid, activeClassError, activeClassSuccess)
    } else {
        addSeccess(errorClassValid, succesClassValid, activeClassError, activeClassSuccess)
    }
}


function formSend(e) {
    const btnSub = e.target.querySelector('button');

    let formObjects = {
        nameSurrname: document.querySelector('input[name="name-surname"]'),
        email: document.querySelector('input[name="email"]'),
        phone: document.querySelector('input[name="phone"]'),
        content: document.querySelector('textarea'),
        agreeCheckBox: document.querySelector('input[name="privacy-policy"]')
    };
    
    let formError = {
        nameError: document.querySelector('.name-error'),
        emailError: document.querySelector('.email-error'),
        phoneError: document.querySelector('.phone-error'),
        contentError: document.querySelector('.textarea-error'),
        checkBoxError: document.querySelector('.checkbox-error')
    }

    const nameSUrrnameCheck = checkValid(formObjects.nameSurrname, formError.nameError);
    const emailCheck = checkValid(formObjects.email, formError.emailError) && emailValid(formObjects.email);
    const phoneCheck = checkValid(formObjects.phone, formError.phoneError);
    const textAreaCheck = checkValid(formObjects.content, formError.contentError);
    const checkCheckBoxCheck = checkCheckBox(formObjects.agreeCheckBox, formError.checkBoxError);

    if(nameSUrrnameCheck && emailCheck && phoneCheck && textAreaCheck && checkCheckBoxCheck) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
            type_of_request: applicationInput.value,
            name_and_surrname: formObjects.nameSurrname.value,
            email: formObjects.email.value,
            phone_number: formObjects.phone.value,
            content: formObjects.content.value,
            privacy_policy: formObjects.agreeCheckBox.checked
        }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
            .then((response) => response.json())
            .then((json) => {

            openPopUp();
            successAlerts.forEach((item) => {
                item.classList.remove('succes-valid--active');
            })
            form.reset();
            labelInput.forEach((item) => {
                item.classList.remove('label-up');
            });
                labelTextArea.classList.remove('label-up-textarea');
            });

            clickSubmit = 1;
    }

    if(clickSubmit === 1) {
        btnSub.disabled = true;
    }
}


inputs.forEach((item) => {
    item.addEventListener('input', (e) => {
        const currentInput = e.target;
        const currenLabel = currentInput.parentNode.querySelector('.label-inputs');
        const curentError = currentInput.parentNode.querySelector('.required-error');
        const currentSucces = currentInput.parentNode.querySelector('.succes-valid');
       
        if(!currentInput.classList.contains('privacy-policy')) {
            labelUp(currentInput, currenLabel, 'label-up')
        }

        if(currentInput.classList.contains('privacy-policy')) {
            currentInput.style.borderColor = "";
            if(curentError.classList.contains('required-error--active')) {
                curentError.classList.remove('required-error--active');
            }
        }

        if(currentInput.classList.contains('name-surname')) {
            validationAlerts(currentInput, curentError, currentSucces, 'required-error--active', 'succes-valid--active');
        }

        if(currentInput.classList.contains('email')){
            validationEmailAlert(currentInput, curentError, currentSucces, 'required-error--active', 'succes-valid--active');
        }

        if(currentInput.classList.contains('phone')) {
            validationAlerts(currentInput, curentError, currentSucces, 'required-error--active', 'succes-valid--active');
            currentInput.value=currentInput.value.replace(' ', '');
            currentInput.value=currentInput.value.replace(/[^\d, +,' ']/, '');
        }
    })
});

textArea.addEventListener('input', (e) => {
    const currentItem = e.target;
    const curentError = currentItem.parentNode.querySelector('.required-error');
    const currentSucces = currentItem.parentNode.querySelector('.succes-valid');

    const currenLabelTextArea = e.target.parentNode.querySelector('.label-textarea');

    labelUp(textArea, currenLabelTextArea, 'label-up-textarea');
    validationAlerts(currentItem, curentError, currentSucces, 'required-error--active', 'succes-valid--active');
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSend(e);
});