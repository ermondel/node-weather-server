const weatherForm = document.querySelector('form');
const messageBox = document.getElementById('message');
const forecastBox = document.getElementById('forecast');

function weather(address) {
  messageBox.textContent = 'Loading..';
  forecastBox.textContent = '';

  fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageBox.textContent = data.error;
      } else {
        messageBox.textContent = data.location;
        forecastBox.textContent = data.forecast;
      }
    });
  });
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  weather(event.target.elements.location.value.trim());
});
