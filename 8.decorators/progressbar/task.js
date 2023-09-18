// Получаем элементы из DOM
const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const progressBar = document.getElementById('progress');

// Добавляем обработчик события отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Создаем объект FormData для отправки файла
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  // Создаем объект XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Настраиваем обработчик события прогресса загрузки
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      // Вычисляем прогресс и обновляем значение атрибута value у элемента progress
      const percentComplete = (e.loaded / e.total) * 100;
      progressBar.value = percentComplete;
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status === 201) { 
      progressBar.value = 100;
      console.log('Файл успешно загружен');
    } else {
      
      console.error('Произошла ошибка при загрузке файла');
    }
  });

  // Отправляем AJAX-запрос на сервер
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xhr.send(formData);
});

// Устанавливаем значение прогресс-бара при загрузке страницы
window.addEventListener('load', () => {
  progressBar.value = 0; // Устанавливаем начальное значение в 0%
});

