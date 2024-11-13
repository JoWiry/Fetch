// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL  https://dummyimage.com/100x300/, где первое число — ширина картинки, второе — высота.




document.querySelector('.j-btn').addEventListener('click', () => {
    // Получаем значения из input
    const width = parseInt(document.querySelector('#widthInput').value);
    const height = parseInt(document.querySelector('#heightInput').value);
    const message = document.getElementById('message');
    const imageContainer = document.getElementById('imageContainer');
  
    // Сброс сообщения и изображения
    message.textContent = '';
    imageContainer.innerHTML = '';
  
    // Проверка, что оба числа находятся в диапазоне от 100 до 300
    if ([width, height].some(num => isNaN(num) || num < 100 || num > 300)) {
      message.textContent = 'Одно из чисел вне диапазона от 100 до 300';
      return;
    }
  
    // Формируем URL для изображения
    const imageUrl = `https://dummyimage.com/${width}x${height}/`;
  
    // Настраиваем запрос
    const options = {
      method: 'POST',
      body: JSON.stringify({ width, height }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
  
    // Отправляем запрос и добавляем изображение
    fetch(imageUrl, options)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки изображения');
        const img = document.createElement('img');
        img.src = imageUrl;
        imageContainer.appendChild(img);
      })
      .catch(error => {
        message.textContent = 'Не удалось загрузить изображение';
        console.error('Ошибка:', error);
      });
  });
  