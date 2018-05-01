function GramophoneTools(){
	// menu flag
	this.commandsFlag = false;
	this.equalizerFlag = false;
	this.songDbFlag = false;
	this.songDb2Flag = false;
	
	// commands flag
	this.rotationFlag = false;
	this.equalizationFlag = false;
	this.hornFlag = false;
	
	this.info = false;
	this.playState = false;
};



GramophoneTools.prototype.play = function(){
	
	var $a  = jQuery.noConflict();
	
	//console.log(this.playState);
	
	
		
		if(!this.playState)
		{
			pauseToPlay();
			gram.playDisk();
		}
		else
		{
			playToPause();
			stopArmAnimation();
		}
		
	
	
};

GramophoneTools.prototype.openInfo = function(){
	var $a  = jQuery.noConflict();
	if(this.info == false){
		$a("#player").css("background-image", "url(\"./images/baseHelp.png\")");
		this.info = true;
	}
	else{
		$a("#player").css("background-image", "url(\"./images/base.png\")");
		this.info = false;
	}
};

GramophoneTools.prototype.openTool = function (tool){
	var $ot  = jQuery.noConflict();
	var $part = null;
	var $title = null;
	var $upPart = null;
	var flag = false;
	
	switch(tool){
		// commands
		case 1:
			$upPart = $ot("#controlsTitle");
			$part = $ot("#controlsMenu");
			$title = $ot("#openControls");
			flag = this.commandsFlag;
			if(this.commandsFlag)
				this.commandsFlag = false;
			else
				this.commandsFlag = true;
			break;
		// equalizer
		case 2:
			$upPart = $ot("#equalizationTitle");
			$part = $ot("#eqMenu");
			$title = $ot("#openEq");
			flag = this.equalizerFlag;
			if(gram.isPlaying)	
				gram.activeEqualizer();
			if(this.equalizerFlag){
				this.equalizerFlag = false;
			}
			else
				this.equalizerFlag = true;
			break;
		// song db
		case 3:
			$upPart = $ot("#songDBTitle");
			$part = $ot("#dbMenu");
			$title = $ot("#openDB");
			flag = this.songDbFlag;
			if(this.songDbFlag)
				this.songDbFlag = false;
			else
				this.songDbFlag = true;
			break;
		// song db 2
		case 4:
			$upPart = $ot("#songDB2Title");
			$part = $ot("#db2Menu");
			$title = $ot("#openDB2");
			flag = this.songDb2Flag;
			if(this.songDb2Flag)
				this.songDb2Flag = false;
			else
				this.songDb2Flag = true;
			break;
		// rotation control
		case 5:
			$part = null;
			$part = $ot("#rotationControl");
			$title = $ot("#openControl1");
			flag = this.rotationFlag;
			if(this.rotationFlag)
				this.rotationFlag = false;
			else
				this.rotationFlag = true;
			break;
		// equalization preset control
		case 6:
			$part = null;
			$part = $ot("#equalizationControl");
			$title = $ot("#openControl2");
			flag = this.equalizationFlag;
			if(this.equalizationFlag)
				this.equalizationFlag = false;
			else
				this.equalizationFlag = true;
			break;
		// horn control
		case 7:
			$part = null;
			$part = $ot("#hornControl");
			$title = $ot("#openControl3");
			flag = this.hornFlag;
			if(this.hornFlag)
				this.hornFlag = false;
			else
				this.hornFlag = true;
			break;
		
		default:
			alert("menu open error");
			break;
	}
	// the window is open => i will close the window
	if(flag){
		if($upPart != null){
			$upPart.delay(1000).animate({
				width: "920px",
				marginLeft: "+=0px"
			}, 
			100,
			function(){	
			}
					);
		}
		$part.slideUp(1000);
		console.log("tool"+tool);
		
		if(tool < 5)
		{
			$title.css("background-image", "url(\"./images/goDownWhite.png\")");
		}
		else
		{
			$title.css("background-image", "url(\"./images/goDownBlack.png\")");
		}
		
	}
	//the windows is closed
	else{
		if($upPart != null){
			$upPart.animate({
				width: "920px",
				marginLeft: "-=0px"
			}, 
			100,
			function(){
				
			});
		}
		$part.slideDown(1000);
		console.log("tool"+tool);
		
		if(tool < 5)
		{
			$title.css("background-image", "url(\"./images/goUpWhite.png\")");
		}
		else
		{
			$title.css("background-image", "url(\"./images/goUpBlack.png\")");
		}
	}
};

disableEqualizationPreset = function(){
	var $a = jQuery.noConflict();
	$a("#radioEq0").attr('disabled','disabled');
	$a("#radioEq1").attr('disabled','disabled');
	$a("#radioEq2").attr('disabled','disabled');
	$a("#radioEq3").attr('disabled','disabled');
	$a("#radioEq4").attr('disabled','disabled');
	$a("#radioEq5").attr('disabled','disabled');
	$a("#radioEq6").attr('disabled','disabled');
};

enableEqualizationPreset = function(){
	var $a = jQuery.noConflict();
	$a("#radioEq0").removeAttr('disabled');
	$a("#radioEq1").removeAttr('disabled');
	$a("#radioEq2").removeAttr('disabled');
	$a("#radioEq3").removeAttr('disabled');
	$a("#radioEq4").removeAttr('disabled');
	$a("#radioEq5").removeAttr('disabled');
	$a("#radioEq6").removeAttr('disabled');
};

disableRotationPreset = function(){
	var $a = jQuery.noConflict();
	$a("#Rotation0").attr('disabled','disabled');
	$a("#Rotation1").attr('disabled','disabled');
	$a("#Rotation2").attr('disabled','disabled');
	$a("#Rotation3").attr('disabled','disabled');
	$a("#Rotation4").attr('disabled','disabled');
	$a("#Rotation5").attr('disabled','disabled');
	$a("#Rotation6").attr('disabled','disabled');
};

enableRotationPreset = function(){
	var $a = jQuery.noConflict();
	$a("#Rotation0").removeAttr('disabled');
	$a("#Rotation1").removeAttr('disabled');
	$a("#Rotation2").removeAttr('disabled');
	$a("#Rotation3").removeAttr('disabled');
	$a("#Rotation4").removeAttr('disabled');
	$a("#Rotation5").removeAttr('disabled');
	$a("#Rotation6").removeAttr('disabled');
};

disableHornPreset = function(){
	var $a = jQuery.noConflict();
	$a("#Horn0").attr('disabled','disabled');
	$a("#Horn1").attr('disabled','disabled');
	$a("#Horn2").attr('disabled','disabled');
};

enableHornPreset = function(){
	var $a = jQuery.noConflict();
	$a("#Horn0").removeAttr('disabled');
	$a("#Horn1").removeAttr('disabled');
	$a("#Horn2").removeAttr('disabled');
};

disableLoadDisk = function(){
	var $a = jQuery.noConflict();
	$a(".loadDisk").attr('disabled','disabled');
	$a(".trackLoaderButton").attr('disabled','disabled');
};

enableLoadDisk = function(){
	var $a = jQuery.noConflict();
	$a(".loadDisk").removeAttr('disabled');
	$a(".trackLoaderButton").removeAttr('disabled');
};

startBufferingAnimation = function(){
	var $a = jQuery.noConflict();
	$a("#label").css("padding-top","0px");
	$a("#label").css("margin-top", "143px");
	$a("#label").css("margin-left", "143px");
	$a("#label").html("<div id = \"rotate\"></div>");
};

showLabel = function(labelText){
	var $a = jQuery.noConflict();
	$a("#label").css("margin-top", "148px");
	$a("#label").css("margin-left", "155px");
	$a("#label").text(labelText).css("padding-top","20px");
};

inviteToLoad = function(){
	var $a = jQuery.noConflict();
	alert("Track not selected");
	// go to  gramophone
	$a(document).scrollTop($a("#songDBTitle").offset().top);
	// open loader
	gramTools.openTool(3);
};

disableAllCommands = function(){
	var $a = jQuery.noConflict();
	$a("#pauseRange").attr('disabled','disabled');
	$a("#playRange").attr('disabled','disabled');
	$a("#changeRotationInput").attr('disabled','disabled');
	disableEqualizationPreset();
	disableRotationPreset();
	disableLoadDisk();
	//disableHornPreset();
};

enableAllCommands = function(){
	var $a = jQuery.noConflict();
	$a("#pauseRange").removeAttr('disabled');
	$a("#playRange").removeAttr('disabled');
	$a("#changeRotationInput").removeAttr('disabled');
	enableEqualizationPreset();
	enableRotationPreset();
	enableLoadDisk();
	  //enableHornPreset();
};

startVinylRotation = function(){
	var $a = jQuery.noConflict();
	$a("#vinyl").css("-webkit-animation-play-state", "running");
	$a("#vinyl").css("animation-play-state", "running");
};

stopVinylRotation = function(){
	var $a = jQuery.noConflict();
	$a("#vinyl").css("-webkit-animation-play-state", "paused");
	$a("#vinyl").css("animation-play-state", "paused");
};

playToPause = function(){
	/* var $a = jQuery.noConflict();
	$a("#playDiv").html("<input id = \"pauseRange\" type = \"range\" onchange = \"gram.playDisk()\" " +
	"value = \"1\" max = \"1\" min = \"0\" step = \"1\">"); */
	
	var $a = jQuery.noConflict();
	$a("#play").animate({right: "+10px", marginTop: "50px"});
	$a("#play").rotate({animateTo:0});
	this.playState = false;
	console.log("pause");

};

pauseToPlay = function(){
	/* var $a = jQuery.noConflict();
	$a("#playDiv").html("<input id = \"playRange\" type = \"range\" onchange = \"gram.playDisk()\" " +
			"value = \"0\" max = \"1\" min = \"0\" step = \"1\">"); */
			
	var $a = jQuery.noConflict();		
	$a("#play").animate({right: "+10px", marginTop: "0px"});
	$a("#play").rotate({animateTo:45});
	this.playState = true;
	console.log("play");

};

stopArmAnimation = function(){
	var $a = jQuery.noConflict();
	//$a("#arm").css({"transform": "rotate(95deg)", "transition-duration": "2s"});
	//gram.moveArm(5, 95, 1000, 1);
	$a("#arm").css({"transform":"rotate(95deg)", "transition-duration": "1s"});
	$a("#temp").stop(true,false);
	
};

changeVinylRotation = function(speed, isRequiredCompensation, oldRotationSpeed){
	var $a = jQuery.noConflict();
	var oldTime = 60/oldRotationSpeed;
	var time = 60/speed;
	//"s linear 0s normal none infinite rotate "
	
	$a(".discoRotation").css("-moz-animation-duration", time + "s");
	$a(".discoRotation").css("-o-animation-duration", time + "s");
	$a(".discoRotation").css("-webkit-animation-duration", time + "s");
	$a(".discoRotation").css("-ms-animation-duration", time + "s");
	$a(".discoRotation").css("animation-duration", time + "s");
	
	if(isRequiredCompensation){
		var degree = 360 * (oldTime - time)/time; 
		$a(".discoRotation").css({'-webkit-transform' : 'rotate('+degree+'deg)',
		     '-moz-transform' : 'rotate('+degree+'deg)',  
		      '-ms-transform' : 'rotate('+degree+'deg)',  
		       '-o-transform' : 'rotate('+degree+'deg)',  
		          'transform' : 'rotate('+degree+'deg)'});
	}
	
};

debugTest = function(message){
	var $a = jQuery.noConflict();
	$a("#debug").html(message);
};

function stripslashes(str) {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
}