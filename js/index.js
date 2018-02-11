// Question 2
(function($) {
  "use strict"; // Start of use strict

  $(document).ready(function () {
    var q02_diag01 = $('#q02_diag01');
    var q02_diag02 = $('#q02_diag02');
    var q02_diag03 = $('#q02_diag03');

    alignBasedOn(q02_diag02, q02_diag01, 1.25, false);

    alignBasedOn(q02_diag03, q02_diag02, 0.9, true);

    $('#business-man').connections({ to: '#q02_diag01' });
    connect();
  });

  // TODO: Fix this terrible block of code
  function alignBasedOn(toAlign, referenceElement, referenceRatio, addMargins) {
    var parent = toAlign;
    var parentReferenceElement = referenceElement;
    toAlign = toAlign.children('.icon-rounded').first();
    referenceElement = referenceElement.children('.icon-rounded').first();

    var marginTop = (referenceElement.height() * referenceRatio);
    if(addMargins) {
      var text = parentReferenceElement.children('.analysis-answer').first();
      marginTop += getNumberOfPixels(text, 'padding-top');
    }

    // toAlign.css({
    //   'margin-top': marginTop
    // });

    var text = parent.children('.analysis-answer').first();
    // text.css({
    //   'margin-top': marginTop + 'px !important'
    // });
    text.each(function () {
      this.style.setProperty( 'padding-top', marginTop + 'px', 'important' );
    });
  }

  function alignText(toAlign) {
    var referenceElement = referenceElement.children('.icon-rounded').first();
    toAlign = toAlign.children('.analysis-answer').first();
  }

  function getNumberOfPixels(element, css_attribute) {
    return pxToInt(element.css(css_attribute));
  }

  function pxToInt(value) {
    value = value || '0px';
    return parseFloat(value.substr(0, value.length-2));
  }

  function connect() {
    $('#origin-point').click(function() {
      var linkLine = $('<div id="new-link-line"></div>').appendTo('body');

      linkLine
        .css('top', $('#origin-point').offset().top + $('#origin-point').outerWidth() / 2)
        .css('left', $('#origin-point').offset().left + $('#origin-point').outerHeight() / 2);

      connectTo($('#q02_diag01'));
    });

    function connectTo(event) {
      // event.pageX = event.offset().right;
      // event.pageY = event.offset().top;

      if($('#new-link-line').length > 0) {
        var originX = $('#origin-point').offset().left + $('#origin-point').outerWidth() / 2;
        var originY = $('#origin-point').offset().top + $('#origin-point').outerHeight() / 2;

        var length = Math.sqrt((event.pageX - originX) * (event.pageX - originX)
          + (event.pageY - originY) * (event.pageY - originY));

        var angle = 180 / 3.1415 * Math.acos((event.pageY - originY) / length);
        if(event.pageX > originX)
          angle *= -1;

        $('#new-link-line')
          .css('height', length)
          .css('-webkit-transform', 'rotate(' + angle + 'deg)')
          .css('-moz-transform', 'rotate(' + angle + 'deg)')
          .css('-o-transform', 'rotate(' + angle + 'deg)')
          .css('-ms-transform', 'rotate(' + angle + 'deg)')
          .css('transform', 'rotate(' + angle + 'deg)');
      }
    }
  }

})(jQuery); // End of use strict

