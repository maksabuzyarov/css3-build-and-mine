import game from '../config';

/**
 * Class for managing active elements and tools in the interface
 */
class Interface {

  constructor() {
    this.size = 6;
    this.$element = this.createElement();

    $(document.body).append(this.$element);

    this.initEvents();
  }

  /**
   * Creating a main element
   * @returns {jQuery.fn.init|*|jQuery|HTMLElement}
   */
  createElement() {
    let template = `
      <div class="interface">
        <div class="interface__line"></div>
      </div>
    `;

    let $element = $(template);
    let $line = $element.children();

    for (let i = 0; i < this.size; i++) {
      let tool = false;

      if (typeof game.interfaceTools[i] !== 'undefined') {
        let toolID = game.interfaceTools[i];
        tool = game.tools.find(item => item.id === toolID);
      }

      let active = i === 0;
      let $card = this.createCardElement({tool, active});

      $line.append($card);
    }

    return $element;
  }

  /**
   * Creating one card element for Interface
   * @param tool
   * @param active
   * @returns {jQuery.fn.init|*|jQuery|HTMLElement}
   */
  createCardElement({tool, active}) {
    let template = `<div class="interface-card js-interface-card"></div>`;
    let $element = $(template);

    if (active === true) {
      $element.addClass('is-active');
    }

    if (tool) {
      $element.data('tool', tool.id);

      if (tool.type === 'block') {
        let cubeTemplate = `
        <div class="cube cube_in-card cube_material_${tool.kind}">
          <div class="cube__side cube__side_f" data-side="F"></div>
          <div class="cube__side cube__side_u" data-side="U"></div>
          <div class="cube__side cube__side_b" data-side="B"></div>
          <div class="cube__side cube__side_d" data-side="D"></div>
          <div class="cube__side cube__side_l" data-side="L"></div>
          <div class="cube__side cube__side_r" data-side="R"></div>
        </div>
      `;

        $element.append($(cubeTemplate));
      }
    }

    return $element;
  }

  /**
   * Running event listeners
   */
  initEvents() {

    $(document.body).on('click', '.js-interface-card', function() {
      let $card = $(this);
      let toolID = $card.data('tool');

      if (typeof toolID === 'undefined') return false;

      game.currentTool = game.tools.find(item => item.id === toolID);

      $('.js-interface-card').removeClass('is-active');

      $card.addClass('is-active');
    });
  }
}

export default Interface;