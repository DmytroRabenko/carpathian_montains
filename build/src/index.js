//mob menu
const mobMenuIcon = document.querySelector('.mob_nav');
if(mobMenuIcon){
  const nav = document.querySelector('.nav');
  mobMenuIcon.addEventListener('click', () => {
    document.body.classList.toggle('_noScroll');//щоб не скролився боді при відкритому меню
    nav.classList.toggle('_active');
    mobMenuIcon.classList.toggle('_active');
  })
};


//add class on scroll
const addClassOnScroll = (elementTag, scrollThreshold, className) => {
  const element = document.querySelector(elementTag);

  if(element){
    window.addEventListener('scroll', function() {
      // Визначаємо відстань, на яку була прокручена сторінка
      const scrolledPixels = window.scrollY;
      // Якщо відстань прокручування більше або дорівнює заданому порогу (scrollThreshold)
      if (scrolledPixels > scrollThreshold) {
          // Додаємо клас до елементу
          element.classList.add(className);
      } else {
          // Видаляємо клас, якщо відстань менше порогу
          element.classList.remove(className);
      }
    });
    if(element.id === 'up_button'){
      element.onclick = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      };
    }
  }
}  
addClassOnScroll('header', 1, 'bacground_dark');
addClassOnScroll('.up_button', 1000, 'hide');


//fool Screen
  const zoomPhotos = document.querySelectorAll('.visit_photo');

  if(zoomPhotos.length > 0){
    for(let i = 0; i < zoomPhotos.length; i++){
      zoomPhotos[i].addEventListener('click', () => {
        zoomPhotos[i].classList.toggle('_active');
        document.body.classList.toggle('_noScroll');//щоб не скролився боді при відкритому меню
      })
    }
  }


//animation
const animateElements = document.querySelectorAll('._animate');
if (animateElements.length > 0) {
    const animeOnScroll = () => {
        for (let index = 0; index < animateElements.length; index++) {
            const animateElement = animateElements[index];
            const animateElementHeight = animateElement.offsetHeight;
            const animateElementOffset = offset(animateElement).top;
            const animateStart = 4;

            let animItemPoint = window.innerHeight - animateElementHeight / animateStart;
            if (animateElementHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animateStart;
            }

            if ((pageYOffset > animateElementOffset - animItemPoint) && pageYOffset < (animateElementOffset + animateElementHeight)){
                animateElement.classList.add('_active');
            } else {
              if(!animateElement.classList.contains('_one_animate')){
                animateElement.classList.remove('_active');
              }
              
            }
        }
    };
    const offset = (el) => {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    };
    window.addEventListener('scroll', animeOnScroll);
    setTimeout(animeOnScroll, 1000)
}

//Parallax
window.onload = () => {
  const parallax = document.querySelector('.parallax');
  //перевіряємо, чи є цей об'єкт
  if (parallax) {
      const content = document.querySelector('.content');
      const topImg = document.querySelector('.top_image');
      const bottomImg = document.querySelector('.bottom_image');
      //коефіцієнти переміщення
      const forTopImg = 40;
      const forBottomImg = 20;
      const speedAnimation = 0.05;

      let positionX = 0, positionY = 0, coordXprocent = 0, coordYprocent = 0;

      const setMouseParallaxStyle = () => {
          const distX = coordXprocent - positionX;
          const distY = coordYprocent - positionY;

          positionX = positionX + (distX * speedAnimation);
          positionY = positionY + (distY * speedAnimation);
          //передаємо стилі
          topImg.style.transform = `translate(${positionX / forTopImg}%, ${positionY / forTopImg}%)`;
          bottomImg.style.transform = `translate(${positionX / forBottomImg}%, ${positionY / forBottomImg}%)`;
          //метод вказує браузеру, що відбудеться анімація, в якості аргумента приймає ф-ю, яка виконається перед анімацією
          requestAnimationFrame(setMouseParallaxStyle);
      }

      setMouseParallaxStyle();

      parallax.addEventListener('mousemove', function (e) {
          //отримуємо ширину і основного блока
          const parallaxWidth = parallax.offsetWidth;
          const parallaxHeight = parallax.offsetHeight;
          //встяновлюємо курсор по середині нульовими кооринатами
          const coordX = e.pageX - parallaxWidth / 2;
          const coordY = e.pageY - parallaxHeight / 2;
          //заповнюємо змінні значеннями в відсотках, яку частину екрана подолав курсор відносно центру
          coordXprocent = coordX / parallaxWidth * 100;
          coordYprocent = coordY / parallaxHeight * 100;
      });
  }
}


//Slider
let slideIndex = 1;
const nextSlide = () => {
    showSlides(slideIndex += 1);
}
const previousSlide = () => {
    showSlides(slideIndex -= 1);
}
const currentSlide = (n) => {
    showSlides(slideIndex = n);
}
const showSlides = (n) => {
    let slides = document.querySelectorAll(".item");
    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
document.querySelector('.previous_slide').addEventListener('click', previousSlide);
document.querySelector('.next_slide').addEventListener('click', nextSlide);
showSlides(slideIndex);
setInterval(nextSlide, 7000);