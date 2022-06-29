const toggler = document.querySelector('.toggler');
const menu = document.querySelector('.menu-mobile');
const dropDownMenu = document.querySelector('.dropdown-menu');
const openBTN = document.querySelectorAll('.OPEN-BTN');
const menuArrow = document.querySelector('.arrow-menu-mobile');
const main = document.querySelector('main');
const dropDownTop = document.querySelector('.menu-dropdown-top');
const arrowTop = document.querySelector('.arrow-menu');
const elipse = document.querySelectorAll('.elipse-under-photo');
const changeText = document.querySelectorAll('.change-text');
const images = document.querySelectorAll('.images--circle')
const homeDots = document.querySelectorAll('.home-pag');
const circlerotation = document.querySelector('.circle-rotation');
const dotImg = document.querySelectorAll('.dot');
const selectedOption = document.querySelectorAll('.select-application');
const arrowForm = document.querySelector('.arrows');
const dropDownList = document.querySelector('.select-application-list');
const dropDownListItem = document.querySelectorAll('.item-dropdown-form');
const selectedText = document.getElementById('selected-text');
const popUp = document.getElementById('popup');
const closeBtnPopup = document.getElementById('close-popup');
const body = document.querySelector('body');
const inputs = document.querySelectorAll('form input');
const form = document.querySelector('form');
const textArea = document.querySelector('form textarea');
const labelTextArea = document.querySelector('.label-textarea');
const labelInput = document.querySelectorAll('form label');
const successAlerts = document.querySelectorAll('.succes-valid');
const closeMenuBtn = document.querySelector('.hamburger-menu');
const loadingMain = document.querySelector('.page-loading');
const loadingElement = document.querySelector('.loading-item');
let applicationInput = document.querySelector('input[name="select-application"]');
let clickSubmit = 0;
let index = 0;
let indexClick = 0;
let interval;
let change = false;
let element;


//header shadow 
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;


    if(0 < currentScroll) {
        header.classList.add('header-box-shadow');
    } else {
        header.classList.remove('header-box-shadow');
    }
});

//open menu and open form list
toggler.addEventListener('click', () => {
    menu.classList.toggle('menu-mobile--active');
    closeMenuBtn.classList.toggle('hamburger--active');
});

openBTN.forEach((item) => {
    item.addEventListener('click', () => {
        if(item.classList.contains('item-moblie')) {

            menuArrow.classList.toggle('arrow-menu-mobile-active');
            dropDownMenu.classList.toggle('dropdown-menu--active');

        } else if(item.classList.contains('item-desktop')) {

            arrowTop.classList.toggle('arrow-menu--active');
            dropDownTop.classList.toggle('menu-dropdown-top--active');
        }
    })
});

main.addEventListener('click', () => {
    dropDownTop.classList.remove('menu-dropdown-top--active');
    arrowTop.classList.remove('arrow-menu--active');
    menu.classList.remove('menu-mobile--active');
    closeMenuBtn.classList.remove('hamburger--active');
});


//pop up
function openPopUp() {
    popUp.style.display = "block";
    body.classList.add('body-overflow');
    closePopUp()
}

function closePopUp() {
    closeBtnPopup.addEventListener('click', () => {
        popUp.style.display = "none";
    });
    main.addEventListener('click', (e) => {
        const target = e.target;
        const textPopUp = target.parentNode.querySelector('p');
        const elipsePopUp = target.parentNode.querySelector('.pop-up-elipse');
        const popUpBody = document.querySelector('.popup-container');
    
        if(target != textPopUp && target != elipsePopUp && target != popUpBody) {
            popUp.style.display = "none";
            body.classList.remove('body-overflow');
        }
    })
}

//drop down list

function changetextForm(e, listItem){
    const currentItem = e.target;
        selectedText.textContent = listItem.textContent;
        applicationInput.value = listItem.textContent;

        if(change) {
            element.style.display = "block";
        }

        element = currentItem;
        element.style.display = "none";
        change = true;

        const activeListEl = [...dropDownListItem].filter((item) => item.classList.contains('hidden-item'));
        if(activeListEl != "") {
            activeListEl[0].classList.remove('hidden-item');
        }

}
selectedOption.forEach((item) => {
item.addEventListener('click', () => {
    arrowForm.classList.toggle('arrow-menu--active');
    dropDownList.classList.toggle('select-app--active');
});
});

dropDownListItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        changetextForm(e, item);
    })
});