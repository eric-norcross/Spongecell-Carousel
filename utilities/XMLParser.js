function XMLParser() {  
  var public = {
    parse: function(xmlURL, adSize) {
      var xmlDoc = fetch(xmlURL);
      var itemsXML = xmlDoc.getElementsByTagName('item');
      var items = [];
      
      
      for (var i = 0; i < itemsXML.length; i++) {
        var item = {};
        //item.id = itemsXML[i].getAttribute("id");
        item.id = i + 1;
        //console.log(itemsXML[i].nodeName);
        //console.log(itemsXML[i].childNodes.length);
        for (var j = 0; j < itemsXML[i].childNodes.length; j++) {
          //console.log("NODE NAME: " + itemsXML[i].childNodes[j].nodeName + " :: NODE TYPE: " + itemsXML[i].childNodes[j].nodeType);
          if (itemsXML[i].childNodes[j].nodeType == 1) {
            //console.log("NODE NAME: " + itemsXML[i].childNodes[j].nodeName + " :: NODE VALUE: " + itemsXML[i].childNodes[j].firstChild.nodeValue);
            //console.log("SIZE: " + itemsXML[i].childNodes[j].getAttribute("size"));
            if (itemsXML[i].childNodes[j].getAttribute("size")) {
              if (itemsXML[i].childNodes[j].getAttribute("size") == adSize) {
                item[itemsXML[i].childNodes[j].nodeName] = itemsXML[i].childNodes[j].firstChild.nodeValue;
              }
            } else {
              item[itemsXML[i].childNodes[j].nodeName] = itemsXML[i].childNodes[j].firstChild.nodeValue;
            }
            
            //console.log("item." + itemsXML[i].childNodes[j].nodeName + ": " + item[itemsXML[i].childNodes[j].nodeName]);
          }
        }
        //console.log(itemsXML[i].getElementsByTagName("layout")[0].firstChild.nodeValue);
        items.push(item);
      }
      
      //console.log("XMLParser :: parse :: items.length: " + items.length);
      
      return items;
    }   
  }
  
  //private
  var METHOD      = "GET";
  var PROXY_URL   = "spongecellCS.php";
  
  var _xmlhttp;

  var fetch = function(xmlURL) {
    if (window.XMLHttpRequest) {
      _xmlhttp = new XMLHttpRequest();
    } else {
      // IE 5/6
      _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    _xmlhttp.onreadystatechange = function() {
      if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
        //console.log(_xmlhttp.getAllResponseHeaders());
      }
    }
    

    var proxyURL = PROXY_URL + "?url=" + xmlURL;
    //console.log(proxyURL);
    _xmlhttp.open(METHOD, proxyURL, false);
    _xmlhttp.send();
    //console.log(_xmlhttp);  
    
    return _xmlhttp.responseXML;
  }
  
  return public;
}