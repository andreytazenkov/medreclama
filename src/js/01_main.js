const swiper = new Swiper('.information-left-swiper', {
   loop: true,
   speed: 800,
   autoplay: {
      daley: 3000
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   effect: "coverflow",
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: "auto",
   breakpoints: {
      320: {
         coverflowEffect: {
            rotate: 0,
            stretch: 100,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      },
      420: {
         coverflowEffect: {
            rotate: 0,
            stretch: 120,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      },
      480: {
         coverflowEffect: {
            rotate: 0,
            stretch: 140,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      },
      560: {
         coverflowEffect: {
            rotate: 0,
            stretch: 160,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      },
      576: {
         coverflowEffect: {
            rotate: 0,
            stretch: 120,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      },
      1200: {
         coverflowEffect: {
            rotate: 0,
            stretch: 100,
            depth: 100,
            modifier: 3,
            slideShadows: false,
         },
      }
   },
   pagination: {
      el: ".information-left-swiper-pagination",
      clickable: true
   }
});

const informationLeftSwiperPagination = document.querySelectorAll('.information-left-swiper-pagination span');
informationLeftSwiperPagination.forEach(elem => {
   elem.innerHTML = '<svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="3"></svg>'
});

// input mask
var selector = document.querySelector("#phone");

var im = new Inputmask("+7 (999) 999 99 99");
im.mask(selector);

// validate forms
let validateForms = function (selector, rules, successMpdal, yaGoal) {
   new window.JustValidate(selector, {
      rules: rules.rules,
      messages: rules.messages,
      colorWrong: rules.colorWrong,
      submitHandler: function (form) {
         let formData = new FormData(form);
         fetch('mail.php', {
            method: 'POST',
            body: formData
         }).then(() => {
            sayThankYou();
            form.reset();
         })
            .catch(() => {
               console.log('Error')
            });
      }
   });
}

const validateRules = {
   rules: {
      name: {
         required: true,
         minLength: 2,
         maxLength: 30
      },
      phone: {
         required: true,
         function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
         }
      },
   },
   messages: {
      name: 'Имя должно содержать от 2 до 30 символов',
      phone: 'Введите корректный номер телефона'
   },
   colorWrong: '#D11616'
};

validateForms('.header-right-form', validateRules);


// save input value
const headerRightFormInput = document.querySelectorAll('.header-right-form-input');

headerRightFormInput.forEach(elem => {
   elem.onblur = function () {
      let phoneValue = elem.value;
      let a = (phoneValue) ? elem.classList.add('_value') : elem.classList.remove('_value');
   };
})


// drag and drop
const informationRow = document.querySelector('.information-section');
const informationChildren = informationRow.querySelectorAll('.information-children');

for (const children of informationChildren) {
   children.draggable = true;
}


informationChildren.forEach((elem, index) => {
   elem.addEventListener('dragstart', (el) => {
      el.target.closest('.information-children').classList.add('select');
   });
   elem.addEventListener('dragend', (el) => {
      el.target.closest('.information-children').classList.remove('select');
   });
});



informationRow.addEventListener('dragover', (el) => {
   el.preventDefault();
});

informationRow.addEventListener('dragenter', (el) => {
   let elementEnter = el.target.closest('.information-children');
   let activeElement = document.querySelector('.select');

   if (elementEnter !== null) {
      elementEnter.after(activeElement);
   }
})
