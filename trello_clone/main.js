const lists = document.querySelectorAll('.list'),
      createCardBtn = document.querySelector('.create-btn button'),
      addCardBtn = document.querySelector('.add-item-btn'),
      cancelCardBtn = document.querySelector('.cancel-item-btn'),
      textarea = document.querySelector('textarea'),
      form = document.querySelector('.form'),
      createBoard = document.querySelector('.create-board'),
      boards = document.querySelector('.boards'),
      titles = document.querySelectorAll('.title');

function addTask() {
  let value;
  createCardBtn.addEventListener('click', () => {
    form.classList.remove('none');
    createCardBtn.classList.add('none');
    addCardBtn.classList.add('none');
    textarea.addEventListener('input', e => {
      value = e.target.value;
      if(value){
        addCardBtn.classList.remove('none');
      } else {
        addCardBtn.classList.add('none');
      }
    })
  });

  cancelCardBtn.addEventListener('click', () => {
    textarea.value = '';
    value = '';
    form.classList.add('none');
    createCardBtn.classList.remove('none');
  });

  addCardBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.classList.add('list__item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);
    form.classList.add('none');
    createCardBtn.classList.remove('none');
    textarea.value = '';
    value = '';    
    dragNdrop();
  });
}

addTask();

function addBoard() {
  const board = document.createElement('div');
  board.classList.add('boards__item');
  board.innerHTML = `
    <span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>
  `;
  boards.append(board);
  changeTitle();
  dragNdrop();
}

createBoard.addEventListener('click', addBoard);

function changeTitle() {
  titles.forEach(title => {
    title.addEventListener('click', e => e.target.textContent = '')
  })
}

changeTitle();

let draggedItem = null;

function dragNdrop() {
  const lists = document.querySelectorAll('.list'),
        list = document.querySelectorAll('.list__item');
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.classList.add('none');
      }, 0);
    });

    item.addEventListener('dragend', () => {
      draggedItem = null;
      setTimeout(() => {
        item.classList.remove('none');
      }, 0);
    });

    item.addEventListener('dblclick', () => {
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', e => e.preventDefault());

      list.addEventListener('dragenter', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#0000004d';
      });

      list.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'transparent';
      });

      list.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'transparent';
        this.append(draggedItem);
      });
    }
  }
}

dragNdrop();