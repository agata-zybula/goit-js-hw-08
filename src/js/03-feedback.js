import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const email = document.querySelector('input[name=email]');
const message = document.querySelector('textarea[name-message]');
const LOCALSTORAGE_KEY = 'feedback-form-state';


// window.addEventListener('load', () => {
//   Array.from(form.elements).forEach(el => {
//     if (el.name) {
//       const prevValue = localStorage.getItem(el.name);
//       el.value = prevValue;
//     }
//   });
// });

// const onInput = form.addEventListener('input', e => {
//   e.preventDefault();
//   Array.from(form.elements).forEach(el => {
//     if (el.name) {
//       localStorage.setItem(el.name, el.value);
//     }
//   });
// });

// form.addEventListener('submit', e => {
//   Array.from(form.elements).forEach(el => {
//     if (el.name) {
//       localStorage.removeItem(el.name, el.value);
//        console.log({
//          email: form.elements.email.value,
//          message: form.elements.message.value,
//        });
//     }
//   });
// });

// form.addEventListener("input", throttle(onInput, 500));


window.addEventListener("load", () => { //automatyczne wypelnianie formualrza po wejsciu na strone (zapamietanie danych)
  Array.from(form.elements).forEach(el => {
    if (el.name) {
      const prevVal = localStorage.getItem(el.name); //prevVal = email         prevVal = message
      el.value = prevVal; // test@test.pl = email     wiadomoscktorajestwpisana = message
    }
  });
});


// form.addEventListener('input', e => { //zdarzenie input - po uzupelnieniu formularza, ale NIE WYSLANIU, dane sa zapisane w localstorage i po przeladowaniu strony nadal tam beda - automatycznie sie uzupelnia
//   e.preventDefault();
//   Array.from(form.elements).forEach(el => {
//     if (el.name) {
//       localStorage.setItem(el.name, el.value);
//     }
//   });
// });

form.addEventListener('input', throttle(() => {
  Array.from(form.elements).forEach(el => {
    if (el.name) {
      localStorage.setItem(el.name, el.value);
    }
  })
}, 500));


form.addEventListener('submit', e => { //jak klikne submit, to wyczysci sie formularz i localstorage, po przeladowaniu strony bede miec pusty formularz, bo localstorage zostalo wyczyszczone
  e.preventDefault();
  Array.from(form.elements).forEach(el => {
    if (el.name) {
      localStorage.setItem(el.name, el.value);
    }
  });
  form.reset();
  localStorage.clear();
  }
);
