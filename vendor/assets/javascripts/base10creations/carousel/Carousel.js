function Carousel() {
  //console.log("Console :: constructor");
  console.log("Tracking: start                 " + CAROUSEL_NAME)
  
  //PUBLIC
  //=======================================================================================================================
	var public = {
	  //public vars

    //public methods
    init: function() { 
      //console.log("Carousel :: init");
      
      if (ENVIRONMENT == "remote") {
        _xmlParser =  new XMLParser(),
        _items = _xmlParser.parse(XML_URL, AD_SIZE);
        //console.log("Carousel :: init :: _items.length: " + _items.length);
      }
      
      
      document.addEventListener('Spongecell :: Carousel Event :: Click', clickHandler, false);

      for (var h = 0; h < _items.length; h++) {
  			var item = _items[h];

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
  		curItem.run();
  	}
  }
  //=======================================================================================================================
  
  
  //PRIVATE
  //=======================================================================================================================
  var DEFAULT_LAYOUT          = "default";
  var DEFAULT_TRANSITION_TYPE = "Horizontal Slide"; //Vertical Slide //None
  var AD_SIZE                 = "Rectangle";
  var XML_URL                 = "http://spongecell.com/campaigns/3829/signal_processors/6/version/1/landscapes/all/items.xml";

  //Use pre-populated array for local dev. Non-local dev will overwrite _items.
  var _items          = [
      {id:1, layout:1, track:1, title:"Title 1", link:"http://www.spongecell.com?link=[clickTag1]", image:"assets/images/1.jpg", thumbnail:"assets/images/thumbs/1.jpg", tip:"Tool Tip Text 1", tipLink:"[clickTag1]", dynamicText1:"Text 1", buttonOne:"[clickTag1]"},
      {id:2, layout:2, track:2, title:"Title 2", link:"http://www.spongecell.com?link=[clickTag2]", image:"assets/images/2.jpg", thumbnail:"assets/images/thumbs/2.jpg", tip:"Tool Tip Text 2", tipLink:"[clickTag2]", dynamicText1:"Text 2", buttonOne:"[clickTag2]"},
      {id:3, layout:3, track:3, title:"Title 3", link:"http://www.spongecell.com?link=[clickTag3]", image:"assets/images/3.jpg", thumbnail:"assets/images/thumbs/3.jpg", tip:"Tool Tip Text 3", tipLink:"[clickTag3]", dynamicText1:"Text 3", buttonOne:"[clickTag3]"},
      {id:4, layout:4, track:4, title:"Title 4", link:"http://www.spongecell.com?link=[clickTag4]", image:"assets/images/4.jpg", thumbnail:"assets/images/thumbs/4.jpg", tip:"Tool Tip Text 4", tipLink:"[clickTag4]", dynamicText1:"Text 4", buttonOne:"[clickTag4]"}
  ];
  
  
  
  //private vars
  var itemCount       = 0,
      layouts         = [],
      layoutCount     = 0,
      curLayoutId     = 0,
      prevLayoutId    = 0,
      curItem         = null,
      nav             = null,
      _xmlParser      = null
  ;
  
  var transitionSettings 												  = new TransitionManagerSettings();
	transitionSettings.transitionDuration(1000);
	transitionSettings.motionTransition 					  = DEFAULT_TRANSITION_TYPE;
	transitionSettings.effectTransitions 					  = {};
	transitionSettings.effectTransitions.fade 		  = true;
	//transitionSettings.effectTransitions.blur 	  = false; //Not supported in GSAP 12
	//transitionSettings.effectTransitions.whiteOut = false; //Haven't looked into this yet
	//transitionSettings.effectTransitions.snap		  = false; //Haven't looked into this yet
	transitionSettings.dimensions                   = {};
	transitionSettings.dimensions.width             = 300;
	transitionSettings.dimensions.height            = 250;
	
	//console.log("Carousel :: construtor :: transitionSettings: " + transitionSettings)

	var nav = document.getElementById('nav');
	
	var previous = new Button();
	previous.init({name: "previous", text:"&#9668;", parent:nav});

	var next = new Button();
	next.init({name: "next", text:"&#9658;", parent:nav})

  //private methods
  var createNewLayout = function(item) {
	  //console.log("Carousel :: createNewLayout");
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
	  //console.log("Carousel :: clickHandler :: event.target: " + event.target);
	  for (var param in event.target) {
	    //console.log(param + ": " + event.target[param]);
	  }
	  //console.log("Carousel :: clickHandler :: event.target.id: " + event.target.id);
	  //console.log("Carousel :: clickHandler :: event.target.className: " + event.target.className);
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
			  if (event.data && event.data.type == "item") {
			    console.log("Tracking: completion            " + CAROUSEL_NAME +"                   Clicked Button Link             (" + event.data.track + ") ");
			    console.log("Tracking: interaction           " + CAROUSEL_NAME +"                   Clicked Button Link             (" + event.data.track + ") ");
			    console.log("Tracking: click_through         " + CAROUSEL_NAME +"                   Clicked Button Link             (" + event.data.track + ") ");
			    window.open(event.data.link, "_newtab");
			  }
			  //console.log("Carousel :: clickHadler - Could not find matching case for " + event.target.id)
		}
	}
	
	var next = function() {
	  //console.log("Carousel :: next");
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
	  //console.log("Carousel :: previous");
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