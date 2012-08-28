function TransitionManager(element, direction, settings, params) {
  var NO_TRANSITION_TYPE_FOUND					  = "No transition type found",
		  DROP_SCALE											    = 2
	;
	
  //Transition Direction
  var TRANSITION_IN 											= "in",
	    TRANSITION_OUT 											= "out"
	;
		
		//Motion Transitions
	var MOTION_TRANSITION_VERTICAL_SLIDE 		= "Vertical Slide",
	    MOTION_TRANSITION_HORIZONTAL_SLIDE 	= "Horizontal Slide",
	    MOTION_TRANSITION_DROP 							= "Drop",
	    MOTION_TRANSITION_NONE 							= "None"
	;
		
		//Effect Transitions
	var EFFECT_TRANSITION_FADE 							= "Fade",
	    //EFFECT_TRANSITION_BLUR 							= "Blur",
	    EFFECT_TRANSITION_WHITE_OUT 				= "White Out",
	    EFFECT_TRANSITION_SNAP 							= "Snap",
		  EASING_QUAD_EASE_OUT      				  = Quad.easeOut
	;
		
	var _completeFunction,
		  _onCompleteParamsArray,
		
		  //_transitionBlur 			              = {blurX:0, blurY:0}, //blur
		  _transitionWhiteOut 	              = {tint:0xffffff, tintAmount:0}, //white out
		  _transitionEase 		                = EASING_QUAD_EASE_OUT,
		  _transitionAlpha 			              = 1, //fade
		
		  _transitionX 					              = 0,
		  _transitionY 					              = 0,
		  _transitionScaleX 		              = 1,
		  _transitionScaleY			              = 1,
		
		  _transitionDelay			              = 0,
		  _transitionDuration,
		
		  _element,
		  _direction,
		  _transitionSettings,
		  _reverse
	;
	
	var init = function() {
	  _element = element;
    _direction = direction;
  	_transitionSettings = settings;
  	_transitionDuration = _transitionSettings.transitionDuration();

  	//SETS THE EASING METHOD IF THE "SNAP" EFFECT IS ENABLED;
  	if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.snap) {
  		_transitionEase = Back.easeOut;
  	}	

  	if (params) {
  		if (params.reverse) {
  			_reverse = params.reverse;
  		}

  		if (params.onComplete) {
  			_completeFunction = params.onComplete;
  		}

  		if (params.onCompleteParams) {
  			_onCompleteParamsArray = params.onCompleteParams;
  		}
  	}
	
  	//TO DO:
  	//_element.visible = true;
  	//console.log("TransitionManager :: Constructor :: element: " + element)
  	Utilities.removeClass(_element, ["hidden"]);
		
  	if (_direction == TRANSITION_IN) {
  		setXYIn();
  		var effectObj = {};
		
  		if (params && params.debug) {
  			console.log("TransitionManager :: ");
  			console.log("TransitionManager :: FADE: "+_transitionSettings.effectTransitions.fade);
  			//console.log("TransitionManager :: BLUR: "+_transitionSettings.effectTransitions.blur);
  			console.log("TransitionManager :: WHITEOUT: "+_transitionSettings.effectTransitions.whiteOut);
  			console.log("TransitionManager :: SNAP: "+_transitionSettings.effectTransitions.snap);
  			console.log("TransitionManager :: =======================");
  		}
		
  		//SETS UP THE FADING IF THE "FADE" EFFECT IS ENABLED
  		if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.fade) {
  			TweenLite.to(_element, 0, {css:{autoAlpha:0}});
  			_element.style.display = "block";
  			_transitionAlpha = 1;
  		}

      // //No blur effect in JS version of Greensock
      //    //SETS UP THE BLURING IF THE "BLUR" EFFECT IS ENABLED
      //    if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.blur) {
      //      effectObj.blurFilter = {blurX:20, blurY:20};
      //      _transitionBlur = {blurX:0, blurY:0};
      //    }
		
  		//SETS UP THE COLOR TRANSITION IF THE "WHITE OUT" EFFECT IS ENABLED
  		if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.whiteOut) {
  			effectObj.colorTransform = {tint:0xffffff, tintAmount:1};
  			_transitionWhiteOut = {tint:0xffffff, tintAmount:0};
  		}
		
  		TweenLite.to(_element, 0, effectObj);
  	} else if (_direction == TRANSITION_OUT) {
    	setXYOut();

  		//SETS UP THE FADING IF THE "FADE" EFFECT IS ENABLED
  		if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.fade) {
  		  console.log("SETTING ALPHA TO 0")
  			_transitionAlpha = 0;
  		}


      // //No blur effect in JS version of Greensock
      //    //SETS UP THE BLURING IF THE "BLUR" EFFECT IS ENABLED
      //    if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.blur) {
      //      _transitionBlur = {blurX:20, blurY:20};
      //    }


  		//SETS UP THE COLOR TRANSITION IF THE "WHITE OUT" EFFECT IS ENABLED
  		if (_transitionSettings.effectTransitions && _transitionSettings.effectTransitions.whiteOut) {
  			_transitionWhiteOut = {tint:0xffffff, tintAmount:1};
  		}
  	}
	
  	if (params && params.debug) {
  		console.log("TransitionManager :: =======================");
  		console.log("TransitionManager :: params: "+params);
  		if (params) {
  			for (var param in params) {
  				console.log("TransitionManager :: " + param + ": " + params[param]);
  			}
  		} else {
  			console.log("TransitionManager :: NO PARAMS");
  		}
  		console.log("TransitionManager :: motionTransition: " + _transitionSettings.motionTransition);
  		console.log("TransitionManager :: _transitionDuration: " + _transitionDuration);
  		console.log("TransitionManager :: _element: "+_element);
  		console.log("TransitionManager :: alpha: "+_transitionAlpha);
  		console.log("TransitionManager :: x: "+_transitionX); 
  		console.log("TransitionManager :: y: "+_transitionY);
  		console.log("TransitionManager :: scaleX: "+_transitionScaleX);
  		console.log("TransitionManager :: scaleY: "+_transitionScaleY);
  		//console.log("TransitionManager :: blurFilter: "+_transitionBlur.blurX);
  		console.log("TransitionManager :: colorTransform: "+_transitionWhiteOut.tintAmount);
  		console.log("TransitionManager :: ease: "+_transitionEase);
  		console.log("TransitionManager :: _element.x: "+_element.x);
  		console.log("TransitionManager :: _element.y: "+_element.y);
  		console.log("TransitionManager :: =======================");
  	}
	
  	TweenLite.to(_element, _transitionDuration, {css:{autoAlpha:_transitionAlpha, x:_transitionX, y:_transitionY, scaleX:_transitionScaleX, scaleY:_transitionScaleY}, colorTransform:_transitionWhiteOut, ease:_transitionEase, delay:_transitionDelay, onComplete:complete});
	}
	
	var setXYIn = function() {
		switch (_transitionSettings.motionTransition) {
			case MOTION_TRANSITION_HORIZONTAL_SLIDE:
			  if (_reverse) {
			    //_element.x = 0 - _transitionSettings.dimensions.width;
			    //Utilities.modifyCSS(_element, "left", ((0 - _transitionSettings.dimensions.width) + "px"));
			    TweenLite.to(_element, 0, {css:{x:(0 - _transitionSettings.dimensions.width)}})
			  } else {
			    //_element.x = _transitionSettings.dimensions.width;
			    //Utilities.modifyCSS(_element, "left", (_transitionSettings.dimensions.width + "px"));
			    TweenLite.to(_element, 0, {css:{x:(_transitionSettings.dimensions.width)}})
			  }
				break;
			case MOTION_TRANSITION_VERTICAL_SLIDE:
				if (_reverse) {
				  //_element.y = 0 - _transitionSettings.dimensions.height;
				  //Utilities.modifyCSS(_element, "top", ((0 - _transitionSettings.dimensions.height) + "px"));
				  TweenLite.to(_element, 0, {css:{y:(0 - _transitionSettings.dimensions.height)}})
				} else {
					//_element.y = _transitionSettings.dimensions.height;
					//Utilities.modifyCSS(_element, "top", (_transitionSettings.dimensions.height + "px"));
					TweenLite.to(_element, 0, {css:{y:(_transitionSettings.dimensions.height)}})
				}
				break;
			case MOTION_TRANSITION_DROP:
			
				// if (_element.scaleX == 1) {
				//             _element.scaleX = _element.scaleY = DROP_SCALE;
				//             
				//             if (_element is TransitionedContentContainer) {
				//               _element.x = _transitionSettings.dimensions.width/2 - ((_element.contentMask.width * DROP_SCALE) / 2);
				//               _element.y = _transitionSettings.dimensions.height/2 - ((_element.contentMask.height * DROP_SCALE) / 2);
				//             } else {
				//               _element.x = _transitionSettings.dimensions.width/2 - _element.width/2;
				//               _element.y = _transitionSettings.dimensions.height/2 - _element.height/2;
				//             }
				//           }
				break;
			case MOTION_TRANSITION_NONE:
				break;
			default:
				console.log("TransitionManager :: " + NO_TRANSITION_TYPE_FOUND);
				break;
		}
	}
	
	var setXYOut = function() {
		switch (_transitionSettings.motionTransition) {
			case MOTION_TRANSITION_HORIZONTAL_SLIDE:
				if (_reverse) {
				  _transitionX = _transitionSettings.dimensions.width;
				} else {
					_transitionX = 0 - _transitionSettings.dimensions.width;
				}
				break;
			case MOTION_TRANSITION_VERTICAL_SLIDE:
				if (_reverse) {
					_transitionY = _transitionSettings.dimensions.height;
				} else {
					_transitionY = 0 - _transitionSettings.dimensions.height;
				}
				break;
			case MOTION_TRANSITION_DROP:
				// _transitionScaleX = _transitionScaleY = 0;
				//        _transitionX = _transitionSettings.dimensions.width/2;
				//        _transitionY = _transitionSettings.dimensions.height/2;
				break;
			case MOTION_TRANSITION_NONE:
				break;
			default:
				console.log("TransitionManager :: " + NO_TRANSITION_TYPE_FOUND);
				break;
		}
	}

  var complete = function() {
		public.removeEffects(_element);
		
		if (_transitionAlpha == 0) {
		  _element.style.display = 'none';
		}
		
		if (_completeFunction != null) {
			if (_onCompleteParamsArray && _onCompleteParamsArray.length > 0) {
				_completeFunction.apply(_element, _onCompleteParamsArray);
			} else {
				_completeFunction();
			}
		}
	}
	
	var public = {
    removeEffects: function(element) {
      TweenLite.to(element, 0, {css:{autoAlpha:1}, colorTransform:{tint:0xffffff, tintAmount:0}, onComplete:
        function() {
    			if (_direction && _direction == TRANSITION_OUT) {
    				element.visible = false;
    				element.x = element.y = 0;
    				element.scaleX = element.scaleY = 1;
    			}
    		}
    	});
    }
  }
  
  init();
}