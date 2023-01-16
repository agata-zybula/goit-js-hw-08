import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const formEmail = document.querySelector('input[name=email]');
const formMessage = document.querySelector('textarea[name=message]');

window.addEventListener('load', () => { //automatyczne wypelnianie formualrza po wejsciu na strone (zapamietanie danych) - jesli nie klikne submit (czyli niewyslane dane)
  const prevVal = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (localStorage.getItem('feedback-form-state') !== null) {
    formEmail.value = prevVal.email;
    formMessage.value = prevVal.message;
  }
});

form.addEventListener('input', throttle(() => {
    let someData = {
      email: formEmail.value,
      message: formMessage.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(someData));
  }, 500)
);

form.addEventListener('submit', e => { //jak klikne submit, to wyczysci sie formularz i localstorage, po przeladowaniu strony bede miec pusty formularz, bo localstorage zostalo wyczyszczone
  e.preventDefault();
  console.log(localStorage.getItem('feedback-form-state')); //obiekt z danymi w konsoli
  form.reset(); //czyszczenie formularza po submit
  localStorage.clear(); //czyszczenie localStorage po submit
});
