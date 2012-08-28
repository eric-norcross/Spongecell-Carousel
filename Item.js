function Item() {
  console.log("Item :: constructor");

  //PUBLIC
  //=======================================================================================================================
  var public = {
    //public vars
    id:           null,
    layoutType:   null,
    
    //public methods
    init: function(dataObj) {
      console.log("Item :: init");
      _data = dataObj;

      var itemElement = document.createElement('div');
      itemElement.id = 'item' + this.id;
      Utilities.addClass(itemElement, ["item", "hidden"]);
      Utilities.modifyCSS(itemElement, "zIndex", this.id);

      document.getElementById(this.layoutType).appendChild(itemElement);

      _element = document.getElementById("item" + this.id);
      TweenLite.to(_element, 0, {css:{autoAlpha:0}});

      match();
    },

    run: function() {
      console.log("Item :: run");
    },
    
    //getter/setter
    element: function() { return _element; } 
    //, setElement: function(element) { if (element) { _element = element } }
  }
  //=======================================================================================================================
  
  
  
  
  //PRIVATE
  //=======================================================================================================================
  var _data,
      _element
  ;
  
  var match = function() {
    var image = document.createElement('img');
    image.src = _data.image;
    _element.appendChild(image);
  }
  //=======================================================================================================================
  
  return public;
}