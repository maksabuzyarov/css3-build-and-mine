class World {

  constructor() {
    this.objects = [];

    this.rot = {
      x: 0,
      y: 0,
      z: 0
    };

    this.zoom = 1;

    this.$element = $('#world');
  }

  update() {

    this.$element.css(
      'transform',
      `scale(${this.zoom}) rotateX(${-this.rot.x}deg) rotateY(${-this.rot.y}deg)`
    );
  }

  add(object) {
    this.objects.push(object);
    this.$element.append(object.$element);
  }

  remove(object) {
    if (object.$element) {
      let objectIndex = this.objects.indexOf(object);

      if (objectIndex > -1) {
        this.$element.find(object.$element).remove();
        this.objects.splice(objectIndex, 1);
      }

    }
  }

  rotate(rotate = null) {

    if (rotate === null) {
      return this.rot;
    }

    this.rot = rotate;
  }

  render() {

    this.$element.html();

    this.objects.forEach((item) => {
      this.$element.append(item.$element);
    })
  }
}

export default World;