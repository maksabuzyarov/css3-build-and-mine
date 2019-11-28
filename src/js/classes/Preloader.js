import anime from 'animejs/lib/anime.es.js';

class Preloader {
  constructor() {
    this.$element = $('#preloader');

    this.$button = this.$element.find('.js-preloader-btn');
    this.$buttonFill = this.$button.find('.js-preloader-btn-fill');

    this.$cube = this.$element.find('.js-preloader-cube');
    this.cubeSides = {};
    this.cubeSides.all = Array.from(this.$cube.find('.js-preloader-cube-side'));

    this.cubeSides.all.forEach((side) => {
      this.cubeSides[side.dataset.side] = $(side);
    });

  }

  /**
   * Show preloader
   */
  show() {
    anime( {
      targets: this.$element[0],
      easing: 'easeInOutCirc',
      opacity: [0, 1],
      scaleX: [1.4, 1],
      scaleY: [1.4, 1],
      duration: 500,
      begin: () => {
        this.$element.show(0);
      },
    });
  }

  /**
   * Hide preloader
   */
  hide() {
    anime({
      targets: this.$element[0],
      easing: 'easeOutCirc',
      opacity: [1, 0],
      scaleX: [1, 1.4],
      scaleY: [1, 1.4],
      duration: 500,
      complete: () => {
        this.$element.hide(0);
      },
    });
  }

  /**
   * Start main load animation
   */
  startLoad() {
    let timeline = anime.timeline({
      easing: 'linear',
      complete: () => {
        this.hide();
      },
    });

    //TODO: Make 2D to 3D animation for Cube

    timeline
      .add({
        targets: this.$buttonFill[0],
        width: '100%',
        duration: 1200,
      })
      .add({
        targets: this.$cube[0],
        translateX: '-15%',
        translateY: '25%',
        rotateX: '-30deg',
        rotateY: '-45deg',
        offset: 0,
        duration: 1200,
      }, 0);


    timeline.play();
  }
}

export default Preloader;
