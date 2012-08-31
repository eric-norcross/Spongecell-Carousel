function Layout() {
  //console.log("Layout :: constructor");
  
  //PUBLIC
  //=======================================================================================================================
  var public = {
    id:           null,
    curItemId:    0,
    prevItemId:   null,
    items:        [],
    layoutType:   null,
    
    init: function(dataObj, transitionSettings) {
      //console.log("Layout :: init");
      _data = dataObj;
      _transitionSettings = transitionSettings;
      //console.log("Layout :: init :: _transitionSettings: " + _transitionSettings)

      _element = document.createElement('div');
      //console.log("Layout :: init :: layoutType: " + this.layoutType)
      _element.id = this.layoutType;
      //console.log("Layout :: init :: layoutElement: " + this.layoutElement)
      document.getElementById("layouts").appendChild(_element);
      Utilities.addClass(_element, ["layout"]);
    },
    
    addItem: function(dataObj) {
      //console.log("Layout :: addItem");

  		var item = new Item();
  		this.items.push(item);
  		//console.log("Layout :: addItem :: items: " + this.items);

  		item.id = _itemCount;
  		item.init(dataObj);
      
  		_itemCount++;
    },

    nextItem: function() {
      //console.log("Layout :: nextItem");
      //console.log("Layout :: nextItem :: this.curItemId: " + this.curItemId)
      //console.log("Layout :: nextItem :: this.prevItemId: " + this.prevItemId)
      this.prevItemId = this.curItemId;
      

  		if ((this.curItemId + 1) < this.items.length) {
  			this.curItemId++;
  		} else {
  			this.curItemId = 0;
  		}
  		
  		//console.log("Layout :: nextItem :: this.curItemId: " + this.curItemId)
      //console.log("Layout :: nextItem :: this.prevItemId: " + this.prevItemId)

  		setIndicies([this.items[this.prevItemId].element(), this.items[this.curItemId].element()]);

  		new TransitionManager(this.items[this.curItemId].element(), "in", _transitionSettings);
  		new TransitionManager(this.items[this.prevItemId].element(), "out", _transitionSettings);
    },

    previousItem: function() {
      //console.log("Layout :: previousItem ");
      this.prevItemId = this.curItemId;

  		if (this.curItemId > 0) {
  			this.curItemId--;
  		} else {
  			this.curItemId = this.items.length - 1;
  		}

  		setIndicies([this.items[this.prevItemId].element(), this.items[this.curItemId].element()]);

  		new TransitionManager(this.items[this.curItemId].element(), "in", _transitionSettings, {reverse:true});
  		new TransitionManager(this.items[this.prevItemId].element(), "out", _transitionSettings, {reverse:true});
    },
    
    element: function() { return _element; } 
  }
  //=======================================================================================================================
  
  
  //PRIVATE
  //=======================================================================================================================
  var _data,
      _itemCount = 0,
      _transitionSettings,
      _element
  ;
  
  var setIndicies = function(elements) {
    //console.log("Layout :: setIndicies :: elements.length: " + elements.length)
		for (var elementInt = 0; elementInt < elements.length; elementInt++) {
			var element = elements[elementInt];
			Utilities.modifyCSS(element, "zIndex", Utilities.getNextHighestZIndex());
		}

		if (document.getElementById('foreground')) {
			Utilities.modifyCSS(document.getElementById('foreground'), "zIndex", Utilities.getNextHighestZIndex());
		}
  }
  //=======================================================================================================================
  
  return public;
}