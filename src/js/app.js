import Cube from './classes/Cube';
import World from './classes/World';
import Interface from './classes/Interface';
import Preloader from './classes/Preloader';

import game from './config.js';

const preloader = new Preloader();

//preloader.hide();

game.interface = new Interface();

game.world = new World();
game.world.rotate({ x: 30, y: 30, z: 0 });
game.world.position({ x: 0, y: 0, z: 0});
game.world.zoom = .6;
game.world.update();

let ghostCube = null;

//world.render();

let startWorldConfig = [
  [0, 0, 0, 'grass'],
  [1, 0, 0, 'grass'],
  [0, 0, 1, 'grass'],
  [1, 0, 1, 'grass'],
  [2, 0, 0, 'grass'],
  [2, 0, 1, 'grass'],
  [0, 0, -1, 'grass'],
  [1, 0, -1, 'grass'],
  [2, 0, -1, 'grass'],
  [-1, 0, 1, 'grass'],
  [-1, 0, 0, 'grass'],
  [-1, 0, -1, 'grass'],
  [2, 0, -2, 'grass'],
  [1, 0, -2, 'grass'],
  [0, 0, -2, 'grass'],
  [-1, 0, -2, 'grass'],
  [2, 0, -3, 'grass'],
  [1, 0, -3, 'grass'],
  [0, 0, -3, 'grass'],
  [-1, 0, -3, 'grass'],
  [-2, 0, -3, 'grass'],
  [-2, 0, -2, 'grass'],
  [-2, 0, -1, 'grass'],
  [-2, 0, 0, 'grass'],
  [-2, 0, 1, 'grass'],
  [2, 0, 2, 'grass'],
  [1, 0, 2, 'grass'],
  [0, 0, 2, 'grass'],
  [-1, 0, 2, 'grass'],
  [-2, 0, 2, 'grass'],
  [3, 0, 2, 'grass'],
  [3, 0, -3, 'grass'],
  [3, 0, -2, 'grass'],
  [3, 0, -1, 'grass'],
  [3, 0, 0, 'grass'],
  [3, 0, 1, 'grass'],
  [3, 0, -4, 'grass'],
  [2, 0, -4, 'grass'],
  [1, 0, -4, 'grass'],
  [0, 0, -4, 'grass'],
  [-1, 0, -4, 'grass'],
  [-2, 0, -4, 'grass'],
  [-3, 0, -4, 'grass'],
  [-3, 0, 2, 'grass'],
  [-3, 0, 1, 'grass'],
  [-3, 0, 0, 'grass'],
  [-3, 0, -1, 'grass'],
  [-3, 0, -2, 'grass'],
  [-3, 0, -3, 'grass'],
  [4, 0, 2, 'grass'],
  [4, 0, 1, 'grass'],
  [4, 0, 0, 'grass'],
  [4, 0, -1, 'grass'],
  [4, 0, -2, 'grass'],
  [4, 0, -3, 'grass'],
  [4, 0, -4, 'grass'],
  [5, 0, -4, 'grass'],
  [5, 0, -3, 'grass'],
  [5, 0, -2, 'grass'],
  [5, 0, -1, 'grass'],
  [5, 0, 0, 'grass'],
  [5, 0, 1, 'grass'],
  [5, 0, 2, 'grass'],
  [-3, 0, -5, 'grass'],
  [-2, 0, -5, 'grass'],
  [-1, 0, -5, 'grass'],
  [0, 0, -5, 'grass'],
  [1, 0, -5, 'grass'],
  [2, 0, -5, 'grass'],
  [3, 0, -5, 'grass'],
  [4, 0, -5, 'grass'],
  [5, 0, -5, 'grass'],
  [-3, 0, -6, 'grass'],
  [-2, 0, -6, 'grass'],
  [-1, 0, -6, 'grass'],
  [0, 0, -6, 'grass'],
  [1, 0, -6, 'grass'],
  [2, 0, -6, 'grass'],
  [3, 0, -6, 'grass'],
  [4, 0, -6, 'grass'],
  [5, 0, -6, 'grass'],
  [-4, 0, 2, 'grass'],
  [-4, 0, 1, 'grass'],
  [-4, 0, 0, 'grass'],
  [-4, 0, -1, 'grass'],
  [-4, 0, -2, 'grass'],
  [-4, 0, -3, 'grass'],
  [-4, 0, -4, 'grass'],
  [-4, 0, -5, 'grass'],
  [-4, 0, -6, 'grass'],
  [5, 0, 3, 'grass'],
  [4, 0, 3, 'grass'],
  [3, 0, 3, 'grass'],
  [2, 0, 3, 'grass'],
  [1, 0, 3, 'grass'],
  [0, 0, 3, 'grass'],
  [-1, 0, 3, 'grass'],
  [-2, 0, 3, 'grass'],
  [-3, 0, 3, 'grass'],
  [-4, 0, 3, 'grass'],
  [-3, -1, -5, 'tree'],
  [-3, -1, -4, 'tree'],
  [-3, -1, -3, 'tree'],
  [-3, -1, -2, 'tree'],
  [-3, -1, -1, 'tree'],
  [-3, -1, 0, 'tree'],
  [-3, -1, 1, 'tree'],
  [-2, -1, -5, 'tree'],
  [-1, -1, -5, 'tree'],
  [0, -1, -5, 'tree'],
  [1, -1, -5, 'tree'],
  [1, -1, -4, 'tree'],
  [1, -1, -3, 'tree'],
  [1, -1, -2, 'tree'],
  [1, -1, -1, 'tree'],
  [1, -1, 0, 'tree'],
  [1, -1, 1, 'tree'],
  [0, -1, 1, 'tree'],
  [-2, -1, 1, 'tree'],
  [-2, -2, 1, 'tree'],
  [-2, -3, 1, 'tree'],
  [-1, -3, 1, 'tree'],
  [0, -3, 1, 'tree'],
  [0, -2, 1, 'tree'],
  [1, -3, 1, 'tree'],
  [1, -3, 0, 'tree'],
  [1, -3, -1, 'tree'],
  [1, -3, -2, 'tree'],
  [1, -3, -3, 'tree'],
  [1, -3, -4, 'tree'],
  [1, -2, -5, 'tree'],
  [1, -3, -5, 'tree'],
  [0, -3, -5, 'tree'],
  [-1, -3, -5, 'tree'],
  [-2, -3, -5, 'tree'],
  [-3, -2, -5, 'tree'],
  [-3, -3, -5, 'tree'],
  [-3, -3, -4, 'tree'],
  [-3, -3, -3, 'tree'],
  [-3, -3, -2, 'tree'],
  [-3, -3, -1, 'tree'],
  [-3, -3, 0, 'tree'],
  [-3, -3, 1, 'tree'],
  [-3, -2, 1, 'tree'],
  [1, -2, 1, 'tree'],
  [-2, -1, -4, 'chest'],
  [0, -1, -4, 'oven'],
  [-3, -4, -5, 'wood'],
  [-2, -4, -5, 'wood'],
  [-3, -4, -4, 'wood'],
  [-3, -4, -3, 'wood'],
  [-3, -4, -2, 'wood'],
  [-3, -4, -1, 'wood'],
  [-3, -4, 0, 'wood'],
  [-3, -4, 1, 'wood'],
  [-2, -4, 1, 'wood'],
  [-1, -4, 1, 'wood'],
  [0, -4, 1, 'wood'],
  [1, -4, 1, 'wood'],
  [1, -4, 0, 'wood'],
  [1, -4, -1, 'wood'],
  [1, -4, -2, 'wood'],
  [1, -4, -3, 'wood'],
  [1, -4, -4, 'wood'],
  [1, -4, -5, 'wood'],
  [0, -4, -5, 'wood'],
  [-1, -4, -5, 'wood'],
  [-2, -5, -4, 'wood'],
  [-1, -5, -4, 'wood'],
  [0, -5, -4, 'wood'],
  [0, -5, -3, 'wood'],
  [0, -5, -2, 'wood'],
  [0, -5, -1, 'wood'],
  [0, -5, 0, 'wood'],
  [-1, -5, 0, 'wood'],
  [-2, -5, 0, 'wood'],
  [-2, -5, -3, 'wood'],
  [-2, -5, -2, 'wood'],
  [-2, -5, -1, 'wood'],
  [-1, -6, -3, 'wood'],
  [-1, -6, -2, 'wood'],
  [-1, -6, -1, 'wood'],
];


// -------------------------------------
//   Events
// -------------------------------------

preloader.$button.on('click', () => {
  preloader.$button.addClass('is-active');
  preloader.startLoad();

  setTimeout(function() {
    startWorldConfig.forEach(function (item, i) {
      setTimeout(function () {
        let cube = new Cube(item[0], item[1], item[2], item[3]);
        game.world.add(cube);
      }, 20 * i);
    });
  }, 1500)
});


$(document.body).on('mousemove', function () {
  if (event.which === 1) {
    let r = game.world.rotate();

    r.x -= event.movementY;
    r.y += event.movementX;

    game.world.rotate(r);
    game.world.update();
  }
});



$(document.body).on('mousewheel', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let delta = event.deltaY;
  game.world.zoom += delta / 1000;

  if(game.world.zoom < 0.1) {
    game.world.zoom = 0.1;
  }

  game.world.update();
});


$(document.body).on('keypress', function (e) {
  let keyCode = e.code;

  let p = game.world.position();

  console.log(e);

  switch (keyCode) {
    case 'KeyW':
      p.z += 1;
      break;
    case 'KeyS':
      p.z -= 1;
      break;
    case 'KeyD':
      p.x -= 1;
      break;
    case 'KeyA':
      p.x += 1;
      break;
    case 'Space':
      p.y += 1;
      break;
  }

  game.world.position(p);
  game.world.update();
});

$(document.body).on('mousemove', '.js-cube-side', function () {
  if (game.currentTool.type === 'block') {
    let $side = $(this);
    let $cube = $side.closest('.js-cube');
    let cubeData = $cube[0]._data;
    let sideKey = $side.data('side');

    if (!cubeData.isGhost) {
      if (ghostCube !== null) {
        game.world.remove(ghostCube);
      }

      let newPos = Cube.calcPositionForNew(cubeData.pos, sideKey);

      ghostCube = new Cube(newPos.x, newPos.y, newPos.z, game.currentTool.kind);
      ghostCube.setGhost(true);
      game.world.add(ghostCube);
    }
  }
});

$(document.body).on('mouseenter', '.js-cube', function () {
  if (game.currentTool.type === 'remove') {
    let cubeData = this._data;
    cubeData.$element.addClass('is-active');
  }
});

$(document.body).on('mouseleave', '.js-cube', function () {
  let cubeData = this._data;

  if (game.currentTool.type === 'remove') {
    cubeData.$element.removeClass('is-active');
  } else if (cubeData.isGhost) {
    game.world.remove(ghostCube);
    ghostCube = null;
  }
});

$(document.body).on('click', '.js-cube', function () {

  let cubeData = this._data;

  if (event.which === 1) {

    if (cubeData.isGhost && game.currentTool.type === 'block') {
      ghostCube.setGhost(false);
      ghostCube = null;
    }

    if (game.currentTool.type === 'remove') {
      game.world.remove(cubeData);
    }
  }
});

