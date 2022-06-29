//screen loadning

window.addEventListener('load', () => {
   setTimeout(function() {
    loadingElement.classList.add('loading-item--active');
    loadingMain.classList.add('page-loading--active');
   }, 1000)
   setTimeout(function() {
    loadingMain.classList.add('page-loading--hidden');
   }, 2000)
})

//home slider

function changeItemsClick(itemFirst, item, activeClass) {
    if(item.classList.contains(activeClass)) {
        item.classList.remove(activeClass);
    }
    itemFirst.classList.add(activeClass);
}

function ChangeSlide(indexSecond, indexFirst) {
    changeItemsClick(changeText[indexFirst], changeText[indexSecond], 'home-text--active');
    changeItemsClick(images[indexFirst], images[indexSecond], 'active-images');
    changeItemsClick(elipse[indexFirst], elipse[indexSecond], 'home-elipse--active');

    if (indexFirst) {
        circlerotation.classList.add('circle-rotation--active');
    } else if(indexSecond){
        circlerotation.classList.remove('circle-rotation--active');
    }
}

function dotsSlideChange(e, element) {
    const currentDot = e.target;

    const activeEl = [...dotImg].filter((item) => item.classList.contains('dot--active'));
    if(activeEl != "") {
        activeEl[0].classList.remove('dot--active');
    }

    currentDot.classList.add('dot--active');

    if(element.classList.contains('slide1')) {
        ChangeSlide((indexClick + 1), indexClick);
    } else if(element.classList.contains('slide2')) {
        ChangeSlide(indexClick, (indexClick + 1));
    }

    clearInterval(interval);
    startInterval();
}

function startInterval() {
    interval = setInterval(changeImage, 7000);
}


function findActiveEl(element, classes) {
    removeAvtive = [...element].filter((item) => item.classList.contains(classes));
    if(removeAvtive != "") {
        removeAvtive[0].classList.remove(classes);
    }
}

function changeImage() {
    if(index == 2) {
        index = 0;
    }

    findActiveEl(images, 'active-images');
    findActiveEl(changeText, 'home-text--active');
    findActiveEl(elipse, 'home-elipse--active');
    findActiveEl(dotImg, 'dot--active');

    images[index++].classList.add('active-images');
    changeText[index - 1].classList.add('home-text--active');
    elipse[index - 1].classList.add('home-elipse--active');

    dotImg[index - 1].classList.add('dot--active');

    if(index == 1) {
        circlerotation.classList.remove('circle-rotation--active');
    } else if(index == 2) {
        circlerotation.classList.add('circle-rotation--active');
    }
}

window.addEventListener('load', () => {
    startInterval();
});

homeDots.forEach((item) => {
    item.addEventListener('click', (e) => {
        dotsSlideChange(e, item);
    })
});


//form validation

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



//splide
var splide = new Splide( '#opinions', {
    perPage: 3,
    pagination: false,
    gap: "-5rem",
    speed: 800,
    perMove: 1,
    breakpoints: {
        1770: {
            gap: "0rem",
        },
        1400: {
            gap: "5rem", 
        },
        1124: {
            perPage: 2,
        },
        700: {
            perPage: 1,
        },
    }
    } );

    splide.mount();

    var splide = new Splide( '#overline', {
        type   : 'loop',
        perPage: 1,
        pagination: false,
        arrows: false,
        gap: "13rem",
        speed: 3800,
        drag: false,
        breakpoints: {
            1450: {
                drag: true,
            },
            768: { 
                gap: "-5rem",
            }
        }
        } );
    
        splide.mount();