const scrollEvents = () => {
  const section = document.querySelectorAll('.section'),
        links = document.querySelectorAll('.nav__link'),
        menu = document.querySelector('.nav__list');

  const observer = new IntersectionObserver(entries => {
    //проходимся по списку всех observer
    entries.forEach(entry => {
      //отрабатываем на каждом вызове всех observer
      if(entry.isIntersecting) {
        //если вызвался observer на конкретной секции
        //выцепливаем конкретный
        links.forEach(link => {
          const linkHref = link.getAttribute('href').replace('#', '');
          //сравниваем href в ссылке с id атрибутом секций
          if (linkHref === entry.target.id) {
            link.classList.add('active');
          } else link.classList.remove('active');
        })
      }
    })
  }, {
    threshold: 0.8
  });
  //на каждую секцию мы добавляем observer
  section.forEach(section => {
    observer.observe(section);
  });
  menu.addEventListener('click', (e) => {
    if(e.target.classList.contains('nav__link')) {
      e.preventDefault();
      const sectionId = e.target.getAttribute('href').replace('#', '');
      window.scrollTo({
        top: document.getElementById(sectionId).offsetTop,
        behavior: 'smooth'
      })
    }
  })
}

scrollEvents();

const animateProgressBar = () => {
  const progress = document.querySelector('.progress__bar');

  //сколько проскроллили от верха страницы
  const scrollValue = document.documentElement.scrollTop;
  
  //высота всего документа
  const documentHeight = document.documentElement.scrollHeight;

  //высота экрана пользователя
  const viewportHeight = document.documentElement.clientHeight;

  //разница между сайтом и экраном пользователя
  const height = documentHeight - viewportHeight;

  //процент прокрутки
  const scrollPercent = scrollValue / height * 100;

  //добавить стили прогресс бару
  progress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', animateProgressBar)
