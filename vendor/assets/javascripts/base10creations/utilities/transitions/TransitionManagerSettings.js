function TransitionManagerSettings() {
  	
	//public
	//=======================================================================================================================
	var public = {
	  //public constants
    DEFAULT_DURATION          : .75,
  	DEFAULT_MOTION            : "Horizontal Slide",
  	DEFAULT_EFFECTS           : {fade:true},
  	
  	//public vars
	  motionTransition   			  : this.DEFAULT_MOTION,
  	effectTransitions         : this.DEFAULT_EFFECTS,
  	dimensions                : {},
  	
  	//public methods
	  addEffects: function(effects) {
  		this.effectTransitions = {}; //Overrides Default

  		var effectsArray = effects.split(",");

  		for (var effectInt = 0; effectInt < effectsArray.length; effectInt++) {
  		  var effect = effectsArray[effectInt];
  			var cleanEffect = effect.replace(" ", "");
  			this.effectTransitions[cleanEffect] = true;
  			console.log("TransitionManagerSettings :: addEffects :: effectTransitions[" + cleanEffect +"]: " + this.effectTransitions[cleanEffect]);
  		}
  	},
  	
  	//getter/setter
  	transitionDuration: function(value) {
  	  if (value){
  	    _transitionDuration = (value/1000);
  	  }
  		return _transitionDuration;
  	}
	};
	//=======================================================================================================================
	
	
	//private
	//=======================================================================================================================
	var _transitionDuration = public.DEFAULT_DURATION;
	//=======================================================================================================================
	
	return public;	
}