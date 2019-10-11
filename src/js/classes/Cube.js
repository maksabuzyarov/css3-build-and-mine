class Cube {

  constructor(x = 0, y = 0, z = 0, material = false) {
    this.pos = {
      x: x,
      y: y,
      z: z,
    };

    this.material = material;

    this.$element = this.createElement();

    this.$element[0]._data = this;

    this.isGhost = false;
  }

  createElement() {
    let template = `
      <div class="cube js-cube">
        <div class="cube__side cube__side_f js-cube-side" data-side="F"></div>
        <div class="cube__side cube__side_u js-cube-side" data-side="U"></div>
        <div class="cube__side cube__side_b js-cube-side" data-side="B"></div>
        <div class="cube__side cube__side_d js-cube-side" data-side="D"></div>
        <div class="cube__side cube__side_l js-cube-side" data-side="L"></div>
        <div class="cube__side cube__side_r js-cube-side" data-side="R"></div>
      </div>
    `;

    let $element = $(template);

    if (this.material) {
      $element.addClass(`cube_material_${this.material}`);
    }

    $element.css('transform', `translate3d(${this.pos.x}em, ${this.pos.y}em, ${this.pos.z}em)`);

    return $element;
  }

  ghost(isGhost = null) {
    if (isGhost === null) {
      return this.isGhost;
    }

    this.isGhost = !!isGhost;

    if (this.isGhost) {
      this.$element.addClass('cube_ghost');
    } else {
      this.$element.removeClass('cube_ghost');
    }
  }

  static calcPositionForNew(pos, sideKey) {
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
}

export default Cube;