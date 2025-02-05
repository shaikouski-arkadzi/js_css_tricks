// Запуск сцены

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game').appendChild(renderer.domElement);

// Освещение

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

// Отрисовка зеленой платформы

const playerGeometry = new THREE.BoxGeometry(1, 0.2, 1);//создание фигуры(ширина, высота, глубина)
const playerMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});//Настраиваем фигуру(цвет)
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = -3;
scene.add(player);

// Управление зеленой платформой

let moveLeft = false, moveRight = false;

document.addEventListener('keydown', (event) => {
  if(event.code = 'ArrowLeft') moveLeft = true;
  if(event.code = 'ArrowRight') moveRight = true;
});

document.addEventListener('keyup', (event) => {
  if(event.code = 'ArrowLeft') moveLeft = false;
  if(event.code = 'ArrowRight') moveRight = false;
});

// Красные объекты

const obstacles = [];

function createObstacles() {
  const size = Math.random() * 0.5 + 0.2;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhongMaterial({color: 0xff0000});
  const obstacle = new THREE.Mesh(geometry, material);
  obstacle.position.x = (Math.random() - 0.5) * 10;
  obstacle.position.y = 5;
  obstacle.userData = {speed: Math.random() * 0.02 + 0.01};
  scene.add(obstacle);
  obstacles.push(obstacle);
}

// Интервал создания красных объектов

const obstacleInterval = setInterval(createObstacles, 1000);

const score = 0;
const scoreElement = document.getElementById('score');

// Цикл игры

function animate(){
  requestAnimationFrame(animate);

  // Перемещение и ограничение по оси X

  if(moveLeft) player.position.x -= 0.05;
  if(moveRight) player.position.x += 0.05;

  player.position.x = Math.max(-5, Math.min(5, player.position.x));

  // Создание красных объектов на разных позициях

  for(let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    obstacle.position.y -= obstacle.userData.speed;

    // Проверка завершения игры, если объект не упал на зеленую платформу, то цикл продолжает работать
    
    if(checkCollision(player, obstacle)) {
      endGame();
      return;
    }

    // Смена значения счета, если падающий объект пролетел мимо зеленой платформы

    if(obstacle.position.y < -5) {
      scene.remove(obstacle);
      obstacles.splice(i, 1);
      score += 1;
      scoreElement.textContext = `Счет: ${score}`;
    }
  }

  // Изменение скорости при дальнейшей продолжительности игры

  obstacles.forEach(obstacle => {
    obstacle.userData.speed += 0.0001;
  });

  renderer.render(scene, camera);
}

// Проверка столкновения красного куба с зеленой платформой

function checkCollision(obj1, obj2) {
  const box1 = new THREE.Box3().setFromObject(obj1);
  const box2 = new THREE.Box3().setFromObject(obj2);
  return box1.intersectsBox(box2);
}

// Завершение игры

function endGame() {
  alert(`Игра окончена! Ваш счет: ${score}`);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
});

// Запуск игры

animate();
