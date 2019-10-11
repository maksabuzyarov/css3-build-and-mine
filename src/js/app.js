import Cube from './classes/Cube';
import World from './classes/World';

const $body = $(document.body);

let currentTool = '';
let currentToolKind = '';

let world = new World();
world.rotate({x: 30, y: 30, z: 0});
world.zoom = 1;
world.update();

let ghostCube = null;

let cube1 = new Cube(0, 0, 0, 'grass');
world.add(cube1);

//world.render();

$body.on('mousemove', function () {
  if (event.which === 1) {
    let r = world.rotate();

    r.x -= event.movementY;
    r.y += event.movementX;

    world.rotate(r);
    world.update();
  }
});

$body.on('mousewheel', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let delta = event.deltaY;

  world.zoom += delta / 1000;

  if(world.zoom < 0.1) {
    world.zoom = 0.1;
  }

  world.update();
});

$body.on('mousemove', '.js-cube-side', function () {
  if (currentTool === 'block') {
    let $side = $(this);
    let $cube = $side.closest('.js-cube');
    let cubeData = $cube[0]._data;
    let sideKey = $side.data('side');

    if (!cubeData.ghost()) {
      if (ghostCube !== null) {
        world.remove(ghostCube);
      }

      let newPos = calcNewCubePosition(cubeData.pos, sideKey);

      ghostCube = new Cube(newPos.x, newPos.y, newPos.z, currentToolKind);
      ghostCube.ghost(true);
      world.add(ghostCube);
    }
  }
});

$body.on('mouseleave', '.js-cube', function () {
  let cubeData = this._data;

  if (cubeData.ghost()) {
    world.remove(ghostCube);
    ghostCube = null;
  }
});

$body.on('mouseenter', '.js-cube', function () {
  if (currentTool === '') {
    let cubeData = this._data;
    cubeData.$element.addClass('is-active');
  }
});

$body.on('mouseleave', '.js-cube', function () {
  if (currentTool === '') {
    let cubeData = this._data;
    cubeData.$element.removeClass('is-active');
  }
});

$body.on('click', '.js-cube', function() {

  let cubeData = this._data;

  if (event.which === 1) {

    if (cubeData.ghost() && currentTool === 'block') {
      ghostCube.ghost(false);
      ghostCube = null;
    }

    if (currentTool === '') {
      world.remove(cubeData);
    }
  }

});

$('.js-interface-card').on('click', function() {
  let $card = $(this);
  let tool = $card.data('tool') || '';
  let toolKind = $card.data('tool-kind') || '';

  currentTool = tool;
  currentToolKind = toolKind;

  $('.js-interface-card').removeClass('is-active');

  $card.addClass('is-active');
});

function calcNewCubePosition(pos, sideKey) {
  let offset = {
    x: 0,
    y: 0,
    z: 0,
  };

  switch(sideKey) {
    case 'F': offset.z = 1; break;
    case 'B': offset.z = -1; break;
    case 'U': offset.y = -1; break;
    case 'D': offset.y = 1; break;
    case 'L': offset.x = -1; break;
    case 'R': offset.x = 1; break;
  }

  return {
    x: pos.x + offset.x,
    y: pos.y + offset.y,
    z: pos.z + offset.z,
  };
}