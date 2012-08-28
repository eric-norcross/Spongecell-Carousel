var Utilities = {
  addClass: function(element, classNames) {
    //console.log("Utilities :: removeClass :: element.classList: " + element.classList);
    
    for (var classNameInt = 0; classNameInt < classNames.length; classNameInt++) {
      var className = classNames[classNameInt];
      element.classList.add(className);
    }
    
    //console.log("Utilities :: removeClass :: element.classList: " + element.classList);
  },
  
  removeClass: function(element, classNames) {
    //console.log("Utilities :: removeClass :: element.classList: " + element.classList);
    
     for (var classNameInt = 0; classNameInt < classNames.length; classNameInt++) {
      var className = classNames[classNameInt];
      element.classList.remove(className);
    }
    
    //console.log("Utilities :: removeClass :: element.classList: " + element.classList);
  }, 
  
  modifyCSS: function(element, property, value) {
    //console.log("Utilities :: modifyCSS :: element: " + element);
    //console.log("Utilities :: modifyCSS :: property: " + property);
    //console.log("Utilities :: modifyCSS :: value: " + value);
    //console.log("Utilities :: modifyCSS :: element.style[property]: " + element.style[property]);
    
    element.style[property] = value;
    
    //console.log("Utilities :: modifyCSS :: element.style[property]: " + element.style[property]);
  },

  getNextHighestZIndex: function(element) {
    var highestIndex = 0;
    var currentIndex = 0;
    var nextHighestIndex = 0;
    var elements = [];

    if (element) { 
      elements = element.getElementsByTagName('*'); 
    } else {
      elements = document.getElementsByTagName('*');
    }

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].currentStyle) {
        currentIndex = parseFloat(elements[i].currentStyle['zIndex']);
      } else if (window.getComputedStyle){
        currentIndex = parseFloat(document.defaultView.getComputedStyle(elements[i], null).getPropertyValue('z-index'));
      }
      
      if (!isNaN(currentIndex) && currentIndex > highestIndex)  {
        highestIndex = currentIndex;
      }
    }
    
    //console.log("Utilities :: getNextHighestZIndex :: highestIndex: " + highestIndex);
    
    nextHighestIndex = highestIndex + 1;
    
    //console.log("Utilities :: getNextHighestZIndex :: nextHighestIndex: " + nextHighestIndex);
    
    return(nextHighestIndex);
  }
}