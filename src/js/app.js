import Cube from './classes/Cube';
import World from './classes/World';
import Interface from './classes/Interface';

import game from './config.js';

game.interface = new Interface();

game.world = new World();
game.world.rotate({x: 30, y: 30, z: 0});
game.world.zoom = .15;
game.world.update();

let ghostCube = null;

let cube1 = new Cube(0, 0, 0, 'grass');
game.world.add(cube1);

//world.render();


// -------------------------------------
//   Events
// -------------------------------------

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

$(document.body).on('mousemove', '.js-cube-side', function () {
  if (game.currentTool.type === 'block') {
    let $side = $(this);
    let $cube = $side.closest('.js-cube');
    let cubeData = $cube[0]._data;
    let sideKey = $side.data('side');

    if (!cubeData.ghost()) {
      if (ghostCube !== null) {
        game.world.remove(ghostCube);
      }

      let newPos = Cube.calcPositionForNew(cubeData.pos, sideKey);

      ghostCube = new Cube(newPos.x, newPos.y, newPos.z, game.currentTool.kind);
      ghostCube.ghost(true);
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
  } else if (cubeData.ghost()) {
    game.world.remove(ghostCube);
    ghostCube = null;
  }
});

$(document.body).on('click', '.js-cube', function() {

  let cubeData = this._data;

  if (event.which === 1) {

    if (cubeData.ghost() && game.currentTool.type === 'block') {
      ghostCube.ghost(false);
      ghostCube = null;
    }

    if (game.currentTool.type === 'remove') {
      game.world.remove(cubeData);
    }
  }
});

