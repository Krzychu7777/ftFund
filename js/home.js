//screen loadning

window.addEventListener('load', () => {
   setTimeout(function() {
    loadingElement.classList.add('loading-item--active');
    loadingMain.classList.add('page-loading--active');
   }, 500)
   setTimeout(function() {
    loadingMain.classList.add('page-loading--hidden');
   }, 1500)
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