function weather(address) {
  fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
}

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  weather(event.target.elements.location.value.trim());
});
