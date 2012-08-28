function Carousel() {
  console.log("Console :: constructor");
  
  //PUBLIC
  //=======================================================================================================================
	var public = {
	  //public vars
    itemsArray: [
      {image: "images/1.jpg", layoutType: "default", title: "1", track: "1"}, 
      {image: "images/2.jpg", layoutType: "default", title: "2", track: "2"}, 
      {image: "images/3.jpg", layoutType: "default", title: "3", track: "3"}, 
      {image: "images/4.jpg", layoutType: "default", title: "4", track: "4"}
    ],
    
    //public methods
    init: function() { 
      console.log("Carousel :: buildItems");
      document.addEventListener('Spongecell :: Carousel Event :: Click', clickHandler, false);

      for (var h = 0; h < this.itemsArray.length; h++) {
  			var item = this.itemsArray[h];

  			/*
  			if (item.track && String(item.track) != "") {
  				trackingNodeCheck.push(String(item.track));
  			} else {
  				throw new Error(ERROR_TRACK_NODE_REQUIRED);
  			}
  			*/

  			if (!item.layoutType) {
  				item.layoutType = DEFAULT_LAYOUT;
  			}

  			itemCount++;

  			if (h > 0) {
  				if (layouts[layoutCount - 1].layoutType == item.layoutType) {
  					layouts[layoutCount - 1].addItem(item);
  				} else {
  					createNewLayout(item);
  				}
  			} else {
  				createNewLayout(item);
  			}
  		}

  		curItem = layouts[0].items[0];
  		TweenLite.to(curItem.element(), 0, {css:{autoAlpha:1}});
  	}
  }
  //=======================================================================================================================
  
  
  
  
  //PRIVATE
  //=======================================================================================================================
  var DEFAULT_LAYOUT  = "default";
  
  //private vars
  var itemCount       = 0,
      layouts         = [],
      layoutCount     = 0,
      curLayoutId     = 0,
      prevLayoutId    = 0,
      curItem         = null,
      nav             = null
  ;
  
  var transitionSettings 												= new TransitionManagerSettings();
	transitionSettings.transitionDuration(1000);
	transitionSettings.motionTransition 					= "None";
	transitionSettings.effectTransitions 					= {};
	transitionSettings.effectTransitions.fade 		= true;
	//transitionSettings.effectTransitions.blur 		= false;
	transitionSettings.effectTransitions.whiteOut = false;
	transitionSettings.effectTransitions.snap			= false;
	transitionSettings.dimensions                 = {};
	transitionSettings.dimensions.width           = 300;
	transitionSettings.dimensions.height          = 250;
	
	//console.log("Carousel :: construtor :: transitionSettings: " + transitionSettings)

	var nav = document.getElementById('nav');
	
	var previous = new Button();
	previous.init({name: "previous", text:"&#9668;", parent:nav});

	var next = new Button();
	next.init({name: "next", text:"&#9658;", parent:nav})

  //private methods
  var createNewLayout = function(item) {
	  console.log("Carousel :: createNewLayout");
		var layout = new Layout();
		layouts.push(layout);
		//console.log("Carousel :: createNewLayout :: layoutCount: " + layoutCount)
		layout.layoutType = item.layoutType;
		layout.id = layoutCount;
		layout.init(item, transitionSettings);//, carouselSettings, transitionSettings);
		layout.addItem(item);
		//console.log("Carousel :: createNewLayout :: layoutCount: " + layoutCount)
		
		
    //console.log("Carousel :: createNewLayout :: layout.id: " + layout.id)
		if (layoutCount == 0) {
			layouts[curLayoutId] = layout;
		}
		
		//console.log("Carousel :: createNewLayout :: layout: " + layout)
		//console.log("Carousel :: createNewLayout :: layout.items: " + layout.items)
	  //console.log("Carousel :: createNewLayout :: layout.items[0]: " + layout.items[0])
	  //console.log("Carousel :: createNewLayout :: layout.items[0].element(): " + layout.items[0].element())
		Utilities.removeClass(layout.items[0].element(), ["hidden"]);

		layoutCount++;
  }
	
	var clickHandler = function(event) {
	  console.log("Carousel :: clickHandler :: event.target: " + event.target);
	  for (var param in event.target) {
	    //console.log(param + ": " + event.target[param]);
	  }
	  console.log("Carousel :: clickHandler :: event.target.id: " + event.target.id);
	  console.log("Carousel :: clickHandler :: event.target.className: " + event.target.className);
		switch (event.target.id) {
			case "next":
				/*
				if (autoAdvanceInterval) {
					autoAdvanceInterval.stopInterval();
				}
				*/
				//dispatchEvent(new CarouselEvent(CarouselEvent.NEXT_ITEM));
				next();
				break;
			case "previous":
				/*
				if (autoAdvanceInterval) {
					autoAdvanceInterval.stopInterval();
				}
				*/
				//dispatchEvent(new CarouselEvent(CarouselEvent.PREVIOUS_ITEM));
				previous();
				break;
			default: 
			  console.log("Carousel :: clickHadler - Could not find matching case for " + event.target.id)
		}
	}
	
	var next = function() {
	  console.log("Carousel :: next");
		if (layouts[curLayoutId].curItemId < (layouts[curLayoutId].items.length - 1)) {
			layouts[curLayoutId].nextItem();
		} else if (layouts[curLayoutId].curItemId == (layouts[curLayoutId].items.length - 1) && layouts.length == 1) {
			layouts[curLayoutId].nextItem();
		} else if (layouts.length > 1) {
			//nextLayout();
		}

		//setNavButtons();

		curItem = layouts[curLayoutId].items[layouts[curLayoutId].curItemId];
		curItem.run();
	}
	
	var previous = function() {
	  console.log("Carousel :: previous");
	  if (layouts[curLayoutId].curItemId > 0) {
			layouts[curLayoutId].previousItem();
		} else if (layouts[curLayoutId].curItemId == 0 && layouts.length == 1) {
			layouts[curLayoutId].previousItem();
		} else if (layouts.length > 1) {
			prevLayout();
		}

		//setNavButtons();

		curItem = layouts[curLayoutId].items[layouts[curLayoutId].curItemId];
		curItem.run();
	}
	//=======================================================================================================================
  
  return public;
};