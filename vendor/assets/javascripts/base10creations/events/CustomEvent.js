function CustomEvent(type, dataObject, useCapture, aWantsUntrusted) {
  console.log("Button :: constructor");

  document.createEvent("Event");
  this.initEvent(type, useCapture, aWantsUntrusted);
  //window.dispatchEvent(this)
  
  /*
  var event = document.createEvent("Event");
  event.initEvent("customEvent", true, true);
  event.customData = getYourCustomData();
  window.dispatchEvent(event);
  */
  
  //private methods
  /*
  var clickHandler = function(event) {
    event.stopImmediatePropagation();
    console.log("Button :: clickHandler :: event.target.className: " + event.target.className);
  }
  */
  
  //public vars & methods
  var public = {
    data: dataObject
  }
  
  return public;
}