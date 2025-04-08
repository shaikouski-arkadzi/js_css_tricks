let uploadInput = document.querySelector('.js-upload-input'),
    uploadBtn = document.querySelector('.js-upload-btn'),
    uploadImage = document.querySelector('.js-upload-image');

uploadBtn.onclick = function () {
  uploadInput.click();
}

uploadInput.onchange = function () {
  getImageData();
}

function getImageData() {
  const files = uploadInput.files[0];

  if (files) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(files);

    fileReader.onload = function () {
      uploadImage.classList.add('active');
      uploadImage.src = this.result;
    }
  }
}