function Item() {
  //console.log("Item :: constructor");

  //PUBLIC
  //=======================================================================================================================
  var public = {
    //public vars
    id:           null,
    layoutType:   null,
    track:        null,
    title:        null,
    link:         null,
    
    
    
    //public methods
    init: function(dataObj) {
      //console.log("Item :: init");
      _data = dataObj;
      this.id = _data.id;
      this.layoutType = _data.layoutType;
      this.track = _data.track;
      this.title = _data.title;
      this.link = _data.link;

      var itemElement = document.createElement('div');
      itemElement.id = 'item' + this.id;
      Utilities.addClass(itemElement, ["item", "hidden", "button"]);
      Utilities.modifyCSS(itemElement, "zIndex", this.id);
      
      document.getElementById(this.layoutType).appendChild(itemElement);

      _element = document.getElementById("item" + this.id);
      TweenLite.to(_element, 0, {css:{autoAlpha:0}});
      
      match();      
    },

    run: function() {
      console.log("Tracking: interaction           " + CAROUSEL_NAME +"                   Viewed Item                     (" + this.track + ") ");
    },
    
    /*
    Tracking: start                 Carousel_None                   
    Tracking: interaction           Carousel_None                   Viewed Item                     (2)                             
    Tracking: completion            Carousel_None                   Clicked Button Link             (2)                             
    Tracking: interaction           Carousel_None                   Clicked Button Link             (2)                             
    Tracking: click_through         Carousel_None                   Clicked Button Link             (2)*/
    
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
    /*var link = document.createElement("a");
    link.href = this.link;
    link.target = "_blank";
    
    var image = document.createElement('img');
    image.src = _data.image;
    image.addEventListener("click", clickHandler, false);
    
    link.appendChild(image);
    _element.appendChild(link);
    */
    
    var image = document.createElement('img');
    image.src = _data.image;
    image.addEventListener("click", clickHandler, false);
    
    _element.appendChild(image);
  }
  
  var clickHandler = function(event) {
    event.stopImmediatePropagation();

    var customEvent = document.createEvent("Event");
    customEvent.initEvent("Spongecell :: Carousel Event :: Click", true, true);
    customEvent.data = {type:"item", track:_data.track, link:_data.link};
    _element.dispatchEvent(customEvent);
  }
  //=======================================================================================================================
  
  return public;
}