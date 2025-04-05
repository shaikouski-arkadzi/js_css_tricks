const callModal = document.querySelectorAll('.js-toggle-modal'),
      closeModal = document.querySelectorAll('.js-close-modal');

callModal.forEach(el => {
  el.onclick = function (e) {
    e.preventDefault();

    const target = this.getAttribute('data-target');

    document.querySelector(target).classList.toggle('opened');
  }
});
