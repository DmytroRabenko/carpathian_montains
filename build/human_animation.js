const absoluteElement = document.querySelector('.absolute-element');
const lineContainer = document.querySelector('.line-container');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const animationDuration = 10000; // Час тривалості анімації (10 секунд)

function getRandomPosition() {
  const elementRect = absoluteElement.getBoundingClientRect();
  const elementWidth = elementRect.width;
  const elementHeight = elementRect.height;

  let randomLeft = Math.random() * (windowWidth - elementWidth);
  let randomTop = Math.random() * (windowHeight - elementHeight);
  // Перевіряємо, чи елемент знаходиться повністю всередині видимої області
  while (randomLeft < 0 || randomLeft + elementWidth > windowWidth || randomTop < 0 || randomTop + elementHeight > windowHeight) {
    randomLeft = Math.random() * (windowWidth - elementWidth);// Випадкова позиція по горизонталі (від 0 до ширини вікна браузера - ширина елемента)
    randomTop = Math.random() * (windowHeight - elementHeight);// Випадкова позиція по вертикалі (від 0 до висоти вікна браузера - висота елемента)
  }

  // Створення нового елемента для відображення лінії переміщення
  const line = document.createElement('div');
  line.classList.add('line');
  line.style.left = (elementRect.left + elementWidth / 2) + 'px';
  line.style.top = (elementRect.top + elementHeight / 2) + 'px';
  lineContainer.appendChild(line);

  // Анімація зникаючої лінії
  setTimeout(() => {
    line.remove();
  }, animationDuration);

  absoluteElement.style.left = randomLeft + 'px';
  absoluteElement.style.top = randomTop + 'px';
}

setInterval(getRandomPosition, 10000);


