// Question 2
(function($) {
  "use strict"; // Start of use strict

  $(document).ready(function () {
    var q02_diag01 = $('#q02_diag01');
    var q02_diag02 = $('#q02_diag02');
    var q02_diag03 = $('#q02_diag03');

    alignBasedOn(q02_diag02, q02_diag01, 1.25, false);

    alignBasedOn(q02_diag03, q02_diag02, 0.9, true);
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

    console.log(marginTop + 'px !important');
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

})(jQuery); // End of use strict
