/**
 * Class for storing all objects
 */
class World {

  constructor() {
    this.objects = [];
    this.rot = { x: 0, y: 0, z: 0 };
    this.zoom = 1;
    this.$element = $('<div class="world" id="#world">');

    $(document.body).append(this.$element);
  }

  /**
   * Update world state
   */
  update() {
    this.$element.css(
      'transform',
      `scale(${ this.zoom }) rotateX(${ -this.rot.x }deg) rotateY(${ -this.rot.y }deg)`,
    );
  }

  /**
   * Add an object to the world
   * @param object
   */
  add(object) {
    this.objects.push(object);
    this.$element.append(object.$element);
  }

  /**
   * Remove object from the world
   * @param object
   */
  remove(object) {
    if (object.$element) {
      let objectIndex = this.objects.indexOf(object);

      if (objectIndex > -1) {
        this.$element.find(object.$element).remove();
        this.objects.splice(objectIndex, 1);
      }

    }
  }

  /**
   * Get (if empty parameters) or Set rotate value
   * @param rot object with 3d rotate data
   * @returns {{x: number, y: number, z: number}|*}
   */
  rotate(rot) {

    if (rot === null) {
      return this.rot;
    }

    this.rot = rot;
  }

  /**
   * Clean world and add all objects again
   */
  render() {
    this.$element.html();

    this.objects.forEach((item) => {
      this.$element.append(item.$element);
    });
  }
}

export default World;