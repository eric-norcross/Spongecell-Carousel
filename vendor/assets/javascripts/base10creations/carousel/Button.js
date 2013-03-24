function Button() {
  //console.log("Button :: constructor");
  
  //private vars
  var _data,
      _element
  ;
  
  //private methods
  var clickHandler = function(event) {
    event.stopImmediatePropagation();

    var customEvent = document.createEvent("Event");
    customEvent.initEvent("Spongecell :: Carousel Event :: Click", true, true);
    customEvent.data = {};
    //console.log("Button :: clickHandler :: customEvent: " + customEvent);
    _element.dispatchEvent(customEvent);
  }
  
  //public vars & methods
  var public = {
    //public vars
    id:           null,
    layoutType:   null,
    
    //public methods
    init: function(dataObj) {
      //console.log("Button :: init");
      _data = dataObj;

      var button = document.createElement('div');
      button.id = _data.name;
      Utilities.addClass(button, ["button"]);
      button.addEventListener("click", clickHandler, false)
      
      var arrow = document.createElement('div');
      Utilities.addClass(arrow, ["arrow"]);
      button.appendChild(arrow);
      arrow.innerHTML = _data.text;
      
      var background = document.createElement('div');
      Utilities.addClass(background, ["bg"]);
      button.appendChild(background);
      //TweenLite.to(background, 0, {css:{autoAlpha:.2}});
      
      _data.parent.appendChild(button);

      this.element(button);
    },
    
    element: function(element) {
      if (element) {
        _element = element;
      }

      return _element;
    }
  }
  
  return public;
}