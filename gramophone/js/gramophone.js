// --> GRAMOPHONE OBJECT <--

// constructor
function Gramophone (context){
	this.context = context;
	
	// Attributes
	
	this.currentBuffer = null;
	this.startTime = 0;
	this.startOffset = 0;
	this.trackDuration = 0;
	this.playBackRate = 1;
	this.originalSpeed = 1;
	this.currentSpeed = 0;
	this.STARTANGLE = 95;
	this.STARTDISKANGLE = 89;
	this.STOPDISKANGLE = 70;
	this.armCurrentAngle = 95;
	this.STOPTIME = 210; //second
	this.QFACTORVALUE = 4.32;
	this.QFACTORPRESETVALUE = 5.76;
	this.presetGain = 0;
	this.trackName = "";
	this.remainingTime = 0;
	this.elapsedTime = 0;
	
	// Nodes
	this.audioSource = null;
	this.hornNode = null;
	this.volumeNode = this.context.createGain();
	this.normalizer = this.context.createDynamicsCompressor();
	this.normalizer.reduction.value = -20;
	this.volumeNode.connect(this.normalizer);
	this.normalizer.connect(context.destination);
	
	// Equalization Preset Value
	this.bassTurnover = 500;
	this.rolloff = -13.7;
	this.highTurnoverFrequency = 0;
	this.shelving = 50;
	this.isShelvingEnable = false;

	//two curves: old and new
	var customOldReadingCurve{
		bassTurnover = 500;
		rolloff = -13.7;
		highTurnoverFrequency = 0;
		shelving = 50;
		isShelvingEnable = false;
	};

	var customNewReadingCurve{
		bassTurnover = 500;
		rolloff = -13.7;
		highTurnoverFrequency = 0;
		shelving = 50;
		isShelvingEnable = false;
	};
	
	// Equalization Preset Node
	this.equalizationPreset = new Array();
	this.equalizationPresetFrequency = new Array(20, 25, 31.5, 40, 50, 63, 80, 100,
		125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 
		3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000, 25000);
	
	// Albiswerk Equalizer
	this.equalizer = new Array();
	this.equalizerFrequency = new Array(94, 113, 136, 163, 196, 235, 282, 338, 406, 487, 
		584, 701, 841, 1010, 1210, 1450, 1740, 2090, 2510, 3010, 3620, 4340, 5210, 6250);

	// Flags
	this.isTrackLoaded = false; 	// if track is selected true
	this.isPlaying = false;			// if the song is playing  
	this.isEqualizerActive = false; 
	this.isInInitialPosition = true;
	this.isArmEnabled = true;
	this.isPause = false;
	this.playFinish = false;
	
	
	// Filter type
	this.equalizationPresetType = 0;	// 0 if there is not effect
	this.hornType = 0;					// 0 if there is not effect
	
	// Timeout
	this.stopTimeout = null;
	
	

	//State Machine and Transition Flags
	this.previousState = "STOP";
	this.state = "STOP";
	this.armClick = false;
	
	
};

// <-----Load----->
Gramophone.prototype.loadDisk = function(completePath, nameTrack, speed){
	
	if(this.audioSource!= null)
	{
		this.audioSource.stop();
	}
	
	
	this.currentBuffer = null;
	this.audioSource=null;
	
	
	var $st = jQuery.noConflict();
	var path=completePath.substring(0, completePath.indexOf('.')-1);

	// go to  gramophone
	$st(document).scrollTop($st("#player").offset().top);

	// disable all commands until the buffering is finished
	disableAllCommands();
	
	// disable arm movement
	this.isArmEnabled = false;
	
	// track is playing or in pause
	if(this.isPlaying || this.state == "PAUSE"){ 
		// stop the track			
		console.log('loaddisk');
		
		playToPause();
		// stop vinyl rotation
		stopVinylRotation();
		// stop arm animation
		stopArmAnimation();
		// stop timeout
		window.clearTimeout(this.stopTimeout);
		// update flags
		this.isPlaying = false;
		
		this.previousState = this.state;
		this.state = "STOP";
		
	}
	
	if(!this.isInInitialPosition){
		
		// move arm to initial position
		this.moveArm(this.armCurrentAngle, this.STARTANGLE, 2000, 0);
	
		this.armCurrentAngle = this.STARTDISKANGLE;
		
		// update flag
		this.isInInitialPosition = true;
		this.isPause = false;
	}
	if(this.isTrackLoaded){
		// vinyl return in initial position
		var element = document.getElementById("vinyl");
		// -> removing the class
		element.classList.remove("discoRotation");
	  	// -> triggering reflow
		element.offsetWidth = element.offsetWidth;  
	  	// -> and re-adding the class
		element.classList.add("discoRotation");
	}
	else{
		// show vinyl
		$st("#vinyl").show();
	}
	
	// set or reset initial speed values 
	this.playBackRate = 1;
	$st("#Rotation0").attr('checked', 'checked');
	
	
	// false = is not required to compensate the rotation of the disk
	changeVinylRotation(speed, false, 0);
	$st('#slider').slider('value', speed);
	$st('#rpm_speed').html("/ "+parseFloat(speed).toFixed(2)+" RPM");
	
	// set track attributes
	this.originalSpeed = speed;	
	this.currentSpeed = speed;
	this.trackName = nameTrack;
	this.startOffset = 0;
	
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	var ext=completePath.substring(completePath.indexOf('.'),completePath.length);
	
	if (ext==".mp3" || ext==".flac" || ext==".wav")
		request.open("GET", './' + completePath,true);
	else 
		alert(ext + "is not a valid extension");
	
	request.responseType = "arraybuffer";
	var thoseTools = gramTools;
	var those = this;
	request.onload = function() {
		
		var that = those;
		var thatTools = thoseTools;
		// Asynchronously decode the audio file data in request.response
		context.decodeAudioData(
			  request.response,
			  // successfull callback
			  function(buffer) {
				  if (!buffer) {
					  alert('error decoding file data: ' + './' + path);
					  return;
				  }
				  // save the buffer in the gramophone object
				  currentBuffer = buffer; 
				  // write the title of the song on the vinyl  
				  showLabel(stripslashes(that.trackName));
				  // enable commands
				  enableAllCommands();
				  //set flag
				  that.isTrackLoaded = true;
				  // enable arm movement
				  that.isArmEnabled = true;
				  //alert("inside function decoded 202 Gramophone state: "+gram.state);
				  
				  if (thatTools.equalizerFlag){
					  that.activeEqualizer();
				  }
			  },
			  function(error) {
				  console.error('decodeAudioData error', error);
			  }
	  );
	};

	request.onerror = function() {
		alert('BufferLoader: XHR error');
	};

	request.send();
	
	// create the buffering animation
	startBufferingAnimation();
	
	
};

// <-----Play----->
Gramophone.prototype.playDisk = function(){
	// track not selected ( 1 -> 1)
	if (!this.isTrackLoaded){
		playToPause();
		// alert + go to loader
		inviteToLoad();
	}
	else{
		// PLAY
		if (!this.isPlaying){
			// playRange in play position
			pauseToPlay();
			// start the disk rotation
			startVinylRotation();
			
			if(this.isInInitialPosition){
				// disable commands
				disableAllCommands();
				// disable arm movement
				this.isArmEnabled = false;

				var that = this;
				setTimeout(function(){
					// update flag
					that.isInInitialPosition = false;
					// enable commands
					enableAllCommands();
					//enable arm movement
					that.isArmEnabled = true;
					// call play function
					that.play();
					
					}, 2000);
					
					this.moveArm(this.STARTANGLE, this.STARTDISKANGLE, 2000,0);
					
					
					
					
					console.log("State: "+this.state+ " previousState: "+this.previousState+" from playDisk() function rg.249");
		
		
			}
			else{
				
				console.log("2 start angle"+this.STARTANGLE+ "current angle:"+this.armCurrentAngle);
				
				// call play function
				   this.play();
				
			}
		}
		// PAUSE (4 -> 3)
		else{
			// update flags => state 3
			this.isPause = true;
			this.isPlaying = false;
			// update flag
			this.previousState = this.state;
			this.state = "PAUSE";
			
			console.log("State: "+this.state+ " from playDisk() function rg.276");
			console.log('entered in playDisk pause');
			// change playdiv image
			playToPause();
			// stop track esecution
			this.audioSource.stop();
			// update offset
			this.startOffset += (this.context.currentTime - this.startTime) * this.playBackRate;
			// stop the disk rotation
			stopVinylRotation();
			// stop arm movement
			stopArmAnimation();
			// stop timeout
			window.clearTimeout(this.stopTimeout);
		}
			
	}
};

Gramophone.prototype.play = function(){
	// create a new Audio Source Node
	this.audioSource = context.createBufferSource();
	this.audioSource.buffer = currentBuffer;
	// connect the Audio Source Node at the graph
	// no equalizationPreset node
	if(this.equalizationPresetType == 0){
		// no horn node
		if(this.hornType == 0){
			// only equalizer
			if(this.isEqualizerActive){
				this.audioSource.connect(this.equalizer[0]);
				//this.equalizerLastNode.connect(this.volumeNode);
			}
			// no equalizer
			else{
				this.audioSource.connect(this.volumeNode);
			}
		}
		else{
			// with horn node
			this.audioSource.connect(this.hornNode);
			if(this.isEqualizerActive){
				this.hornNode.connect(this.equalizer[0]);
				//this.equalizerLastNode.connect(this.volumeNode);
			}
			else{
				this.hornNode.connect(this.volumeNode);
			}
		}
	}
	// with equalization preset node
	else{
		this.audioSource.connect(this.equalizationPreset[0]);
		// no horn node
		if(this.hornType == 0){
			// with equalizer
			if(this.isEqualizerActive){
				this.equalizationPreset[31].connect(this.equalizer[0]);
				//this.equalizerLastNode.connect(this.volumeNode);
			}
			// no equalizer
			else{
				this.equalizationPreset[31].connect(this.volumeNode);
			}
		}
		// with horn node
		else{
			this.equalizationPreset[31].connect(this.hornNode);
			if(this.isEqualizerActive){
				this.hornNode.connect(this.equalizer[0]);
				//this.equalizerLastNode.connect(this.volumeNode);
			}
			// no equalizer
			else{
				this.hornNode.connect(this.volumeNode);
			}
		}
	}
	
	// set audiosource parameter
	this.audioSource.playbackRate.value = this.playBackRate;
	this.audioSource.loop = false;
	var that = this;
	this.audioSource.onended = function(){
		
		that.playFinish = true;
		
		if(!gram.armClick)
		{
			that.stopSong();
		}
		
	};
	
	
		// update startTime
		this.startTime = this.context.currentTime;
	
	
	// save playbackrate
	
	
	
	// start the music with offset
	this.audioSource.start(0, (this.startOffset) % this.audioSource.buffer.duration);
	// update flag (go to 4° state)
	this.isPlaying = true;
	this.isPause = false;
	this.previousState = this.state;
	this.state = "PLAY";
	
	this.STOPTIME = this.audioSource.buffer.duration;
	
	
	// calculate animation timing
	var remainingTime = (this.STOPTIME  - (this.startOffset % this.audioSource.buffer.duration)) / this.playBackRate * 1000;
	
	this.remainingTime = remainingTime;
	
	// start arm movement
	this.moveArm(this.armCurrentAngle, this.STOPDISKANGLE, remainingTime, 0);
	
	var $a = jQuery.noConflict();
	
	// debug
	var message = "remainingTime: " + remainingTime + "\n playback rate:" 
			+ this.playBackRate + "\n currentime: " + this.context.currentTime;
	debugTest(message);
	
	// start timeout: when the timeout expired call a stop function
	this.stopTimeout = 	setTimeout(function(){
			if(this.remainingTime == 0)
			{
				this.audioSource.stop();
				this.playFinish = true;
				this.previousState = this.state;
				this.state = "STOP";
				this.armCurrentAngle = this.STARTANGLE;
			}
		}, this.remainingTime);
	
	if(gramTools.equalizerFlag ){
		this.isEqualizerActive = false;
	}
	else{
		this.isEqualizerActive = true;
	}
	
	this.activeEqualizer();
	
};

Gramophone.prototype.stopSong = function(){
	if (!this.isPause){
		// disable all commands
		disableAllCommands();
		// disable arm movement
		this.isArmEnabled = false;
		// stop arm animation
		stopArmAnimation();
		// stop timeout
		window.clearTimeout(this.stopTimeout);
		// move the play range to pause condition
		
		this.elapsedTime = 0;
		
		playToPause();
		// stop vinyl rotation
		stopVinylRotation();
		// update flag  and offset
		this.isPlaying = false;	
		this.startOffset = 0;
		this.previousState = this.state;
		this.state = "STOP";
		
		
		var that = this;
		setTimeout(function(){
			that.isInInitialPosition = true;
			// enable commands
			enableAllCommands();
			// enable arm movement
			that.isArmEnabled = true;
			}, 1500);
		// move the arm to the initial place
		this.moveArm(this.armCurrentAngle, this.STARTANGLE, 1000, 0);
		
	}
};

// <-----Volume----->
Gramophone.prototype.changeVolume = function(element) {
	
	var fraction = parseInt(element.value) / parseInt(element.max);
	// Let's use an x*x curve (x-squared) since simple linear (x) does not
	// sound as good.
	this.volumeNode.gain.value = fraction * fraction /*+ this.presetGain*/;
}; 

Gramophone.prototype.addGainToVolume = function(){
	this.volumeNode.gain.value += this.presetGain;
};

Gramophone.prototype.removeGainToVolume = function(){
	this.volumeNode.gain.value -= this.presetGain;
};


// <-----Equalization Preset----->
Gramophone.prototype.createPresetEqualization = function(){
	// initialize preset equalization biquad filters 
	for (var i = 0; i < 32; i++){
		this.equalizationPreset[i] = context.createBiquadFilter();
		this.equalizationPreset[i].type = "peaking";
		this.equalizationPreset[i].frequency.value = this.equalizationPresetFrequency[i];
		this.equalizationPreset[i].Q.value = this.QFACTORPRESETVALUE;
	}
	
	// connect the filters
	for (var j = 0; j < 31; j++){
		this.equalizationPreset[j].connect(this.equalizationPreset[j+1]);
	}
	
	// find the high turnover frequency in Riaa standard
	this.highTurnoverFrequency = this.getTrebleTurnover(this.rolloff); 
};

Gramophone.prototype.getTrebleTurnover = function(rolloff){
	var tto = Math.sqrt(Math.pow(10000 , 2)/(Math.pow(10 , ((-rolloff)/10))-1)); // high frequency turnover
	return tto;
};

Gramophone.prototype.getGain = function(freq, lowTurnoverFreq, highTurnoverFreq, shelvingTurnoverFreq){
	var gainLF = 10 * (Math.log(1+(Math.pow(lowTurnoverFreq , 2)/Math.pow(freq , 2)))/(Math.log(10)));
	var gainHF = (-10) * (Math.log(1+(Math.pow(freq , 2)/Math.pow(highTurnoverFreq , 2)))/(Math.log(10)));
	var gainSHF = (-10) * (Math.log(1+(Math.pow(shelvingTurnoverFreq , 2)/Math.pow(freq , 2)))/(Math.log(10)));
	if (this.isShelvingEnable)
		return (gainHF + gainLF + gainSHF);
	else
		return (gainHF + gainLF);
};

Gramophone.prototype.changePresetValue = function(element, type){

	//change the value of to the curve i want to change: old or new based on the element i'm changing
	var targetCurve = null;
	var eqTarget = element.getAttribute("eqTarget");

	var bassTurnoverLabel = "#bassTurnoverLabel";
	var rolloffLabel = "#rolloffLabel";
	var shelvingLabel = "#shelvingLabel";

	if(eqTarget == "old"){
		targetCurve = customOldReadingCurve;
		bassTurnoverLabel += "Old";
		rolloffLabel += "Old";
		shelvingLabel += "Old";
	}else{
		targetCurve = customNewReadingCurve;
		bassTurnoverLabel += "New";
		rolloffLabel += "New";
		shelvingLabel += "New";
	}

	// get range value
	var rangeValue = element.value;
	// bass turnover
	if(type == 0){
		targetCurve.bassTurnover = rangeValue;
	}
	// rolloff
	else if(type == 1){
		targetCurve.rolloff = rangeValue;
		targetCurve.highTurnoverFrequency = this.getTrebleTurnover(targetCurve.rolloff); 
	}
	// shelving filter
	else if(type == 2){
		targetCurve.shelving = rangeValue;
	}
	// error
	else{
		//alert("changePresetValue error");
	}
	var $pe = jQuery.noConflict();
	$pe(bassTurnoverLabel).text(targetCurve.bassTurnover + "Hz");
	$pe(bassTurnoverLabel).text(targetCurve.rolloff + "dB");
	$pe(bassTurnoverLabel).text(targetCurve.shelving + "Hz");
	this.changeAllGainValue();
};


Gramophone.prototype.allGainToZero = function (){
	//this.removeGainToVolume();
	this.presetGain = 0;
	for (var i = 0; i < 32; i++){
		this.equalizationPreset[i].gain.value = 0;
	}
	this.normalizer.reduction.value = -20;
};

// normalize with a max gain bound at +15dB
Gramophone.prototype.changeAllGainValue = function(){
	var tempMaxGain = 0;
	var notNormalizeGain = new Array();
	
	// calculate not normalize gain value
	for(var i = 0; i < 32; i++){
		notNormalizeGain[i] = this.getGain(
									this.equalizationPresetFrequency[i], 
									this.bassTurnover, 
									this.getTrebleTurnover(this.rolloff), 
									this.shelving);
		// find the max gain value
		if(notNormalizeGain[i] > tempMaxGain)
			tempMaxGain = notNormalizeGain[i];
	}
	
	//this.removeGainToVolume();
	this.presetGain = ( tempMaxGain - 10);
	var tempGain = -20 + this.presetGain;
	if(tempGain > 0)
		this.normalizer.reduction.value = 0;
	else
		this.normalizer.reduction.value = tempGain;
	
	//this.addGainToVolume();
	// save normalized gain value 
	for(var i = 0; i < 32; i++){
		this.equalizationPreset[i].gain.value = notNormalizeGain[i] - this.presetGain;
		//alertString += "freq:" + this.equalizationPresetFrequency[i] + " gain:" + notNormalizeGain[i] + "\n";
	}
	
};

Gramophone.prototype.changePresetEq = function(preset) {
	if(this.equalizationPresetType != preset){
		if(this.equalizationPresetType != 0){
			this.equalizationPreset[31].disconnect();
		}
		this.equalizationPresetType = preset;
		
		var $pe = jQuery.noConflict();
		
		//switch
		switch(this.equalizationPresetType){
			// no equalization
			case 0:
				// all the gain value = 0;
				this.allGainToZero();
				this.isShelvingEnable = false;
				break;
			// RIAA 
			case 1:
				this.bassTurnover = 500;
				this.rolloff = -13,7;
				this.shelving = 50;
				this.isShelvingEnable = true;
				break;
			// RCA 1938 - 48
			case 2:
				this.bassTurnover = 500;
				this.rolloff = -12;
				this.isShelvingEnable = false;
				
				break;
			// HMV 1925 - 1946
			case 3:
				this.bassTurnover = 250;
				this.rolloff = 0;
				this.isShelvingEnable = false;
				break;
			// ffrr decca 1949
			case 4:
				this.bassTurnover = 250;
				this.rolloff = -5;
				this.isShelvingEnable = false;
				break;
			// NAB
			case 5:
				this.bassTurnover = 500;
				this.rolloff = -16;
				this.isShelvingEnable = false;
				break;
			// custom
			case 6:
				break;
			// error
			default:
				alert("equalizationPreset Error");
				break;
		}
		// block the range
		if(this.equalizationPresetType == 0){
			$pe("#bassTurnoverRange").attr('disabled','disabled');
			$pe("#rolloffRange").attr('disabled','disabled');
			$pe("#shelvingRange").attr('disabled','disabled');
			$pe("#shelvingRange").attr('disabled','disabled');
		}
		// change the label with standard parameters 
		else if(this.equalizationPresetType == 6){
			$pe("#bassTurnoverRange").removeAttr('disabled');
			$pe("#rolloffRange").removeAttr('disabled');
			$pe("#shelvingEnable").removeAttr('disabled');
			if (this.isShelvingEnable){
				$pe("#shelvingRange").removeAttr('disabled');
			}
			else{
				$pe("#shelvingRange").attr('disabled','disabled');
			}
				
			this.changeAllGainValue();
		}
		else
		{	
			if(this.equalizationPresetType == 1)
				$pe("#shelvingEnable").attr('checked',true);
			else
				$pe("#shelvingEnable").removeAttr('checked');
			$pe("#shelvingEnable").attr('disabled','disabled');
			$pe("#bassTurnoverRange").attr('disabled','disabled');
			$pe("#rolloffRange").attr('disabled','disabled');
			$pe("#shelvingRange").attr('disabled','disabled');
			$pe("#bassTurnoverLabel").text(this.bassTurnover + "Hz");
			$pe("#rolloffLabel").text(this.rolloff + "dB");
			$pe("#shelvingLabel").text(this.shelving + "Hz");
			$pe("#bassTurnoverRange").val(this.bassTurnover);
			$pe("#rolloffRange").val(this.rolloff);
			$pe("#shelvingRange").val(this.shelving);
			this.changeAllGainValue();
		}
		
		// only if isPlaying and track is selected, otherwise all is done in the play function
		if (this.isTrackLoaded && this.isPlaying){
			this.audioSource.disconnect();
			
			// no equalization preset node
			if(this.equalizationPresetType == 0){
				// no horn node
				if(this.hornType == 0){
					// with equalizer
					if(this.isEqualizerActive)
						this.audioSource.connect(this.equalizer[0]);
					// no equalizer 
					else
						this.audioSource.connect(this.volumeNode);
				}
				// with horn node
				else{
					this.audioSource.connect(this.hornNode);
				}
			}
			// with equalization preset node
			else{
				this.audioSource.connect(this.equalizationPreset[0]);
				// no horn node
				if(this.hornType == 0){
					// with equalizer
					if(this.isEqualizerActive)
						this.equalizationPreset[31].connect(this.equalizer[0]);
					// no equalizer 
					else
						this.equalizationPreset[31].connect(this.volumeNode);
				}
				// with horn node
				else{
					this.equalizationPreset[31].connect(this.hornNode);
				}
			}
		}
	}
};

Gramophone.prototype.enableShelving = function(){
	var $es = jQuery.noConflict();
	// disable shelving filter
	if(this.isShelvingEnable){
		// delete checked state
		$es("#shelvingEnable").removeAttr("checked");
		// disable the shelving range
		$es("#shelvingRange").attr('disabled','disabled');
		// update the flag
		this.isShelvingEnable = false;
		// calculate the new gain value
		this.changeAllGainValue();
	}
	else{
		// delete checked state
		$es("#shelvingEnable").attr("checked", true);
		// disable the shelving range
		$es("#shelvingRange").removeAttr('disabled');
		// update the flag
		this.isShelvingEnable = true;
		// calculate the new gain value
		this.changeAllGainValue();
	}
};


// <-----Rotation----->
Gramophone.prototype.changeRotation = function(element,type){
	if(this.isTrackLoaded){
		var $a = jQuery.noConflict();
		// save old playbackrate
		var oldRotationSpeed = this.currentSpeed;
		var oldPlayBackRate = this.playBackRate;
		var speed = 0;
		// change by range
		if(type == 0){
			speed = parseInt(element.value);
			$a("#Rotation0").attr('checked', 'checked');
		}
		// change by preset
		else
			speed = element;
		
		// calculate new playBackRate
		var  fraction = speed/this.originalSpeed;
		this.currentSpeed = speed;
		this.playBackRate = fraction;
		// change vinyl rotation speed
		changeVinylRotation(speed, this.isTrackLoaded, oldRotationSpeed);
		
		// state 4
		if(this.isPlaying){
			// stop arm movement
			//stopArmAnimation();
			// stop timeout
			window.clearTimeout(this.stopTimeout);
			// update offset with old playbackrate
			this.startOffset += (this.context.currentTime - this.startTime) * oldPlayBackRate;
			// update startTime
			this.startTime = this.context.currentTime;
			// set new playBackRate in audioSource
			this.audioSource.playbackRate.value = fraction;
			// calculate new remainingTime
			var remainingTime = (this.STOPTIME - (this.startOffset % this.audioSource.buffer.duration) ) / this.playBackRate *1000;
			this.remainingTime = remainingTime;
			
			console.log("remainingTime:"+this.remainingTime+" elapsedTime: "+this.elapsedTime+ "buffer: "+this.audioSource.buffer.duration);
			// restart arm movement
			this.moveArm(this.armCurrentAngle, this.STOPDISKANGLE, remainingTime, 0);
			// restart timeout
			this.stopTimeout = window.setTimeout(function(){
				
				if(this.audioSource != null && this.remainingTime==0)
				{
					
					this.audioSource.stop();
				}
				
				
				this.playFinish = true;
				}, remainingTime);
		}
		// state 2 or 3
		else{
			stopVinylRotation();
		}
	}
};

Gramophone.prototype.changePresetRotation = function(type){
	var $rot = jQuery.noConflict();
	var speed = 0;
	switch(type){
	case 0:
		speed = parseFloat(this.originalSpeed);
		break;
	case 2:
		speed = 70.00;
		break;
	case 3:
		speed = 71.29;
		
		break;
	case 4:
		speed = 76.59;
		break;
	case 5:
		speed = 80.00;
		break;
	case 6:
		speed = 78.26;
		break;
	case 1:
		speed = parseFloat(this.originalSpeed);
		break;
	
	default:
		alert("Errore");
		break;
	}
	
	
	$rot('#slider').slider('value', speed);
	$rot("#rpm_speed").html("/ "+speed.toFixed(2)+" RPM");
	// change the playback rate 
	this.changeRotation(speed,1);
};


// <-----Horn----->
Gramophone.prototype.changeHorn = function(horn) {
	if(this.hornType != 0)
		this.hornNode.disconnect();
	if(this.hornType != horn){
		this.hornType = horn;
	
		// Create the horn filter
		if(this.hornType == 1){
			this.hornNode = context.createBiquadFilter();
			this.hornNode.type = "lowpass"; // Low-pass filter. See BiquadFilterNode docs
			this.hornNode.frequency.value = 600; // Set cutoff to 600 HZ
		}
		
		if (this.hornType == 2){
			this.hornNode = context.createBiquadFilter();
			this.hornNode.type = "highpass"; // High-pass filter. See BiquadFilterNode docs
			this.hornNode.frequency.value = 2000; // Set cutoff to 1000 HZ
		}
		
		// only if isPlaying and track is selected, otherwise all is done in the play function
		if (this.isTrackLoaded && this.isPlaying){
			// no equalization preset Node
			if(this.equalizationPresetType == 0){
				this.audioSource.disconnect();
				// no horn node
				if(this.hornType == 0){	
					// with equalizer node
					if(this.isEqualizerActive){
						this.audioSource.connect(this.equalizer[0]);
					}
					// no equalizer node
					else{
						this.audioSource.connect(this.volumeNode);
					}
				}
				// with horn node
				else{
					// with equalizer node
					if(this.isEqualizerActive){
						this.audioSource.connect(this.hornNode);
						this.hornNode.connect(this.equalizer[0]);
					}
					// no equalizer node
					else{
						this.audioSource.connect(this.hornNode);
						this.hornNode.connect(this.volumeNode);
					}	
				}
			}
			// with equalization preset node
			else{				
				this.equalizationPreset[31].disconnect();
				if(this.hornType == 0){	
					// with equalizer node
					if(this.isEqualizerActive){
						this.equalizationPreset[31].connect(this.equalizer[0]);
					}
					// no equalizer node
					else{
						this.equalizationPreset[31].connect(this.volumeNode);
					}
				}
				// with horn node
				else{
					// with equalizer node
					if(this.isEqualizerActive){
						this.equalizationPreset[31].connect(this.hornNode);
						this.hornNode.connect(this.equalizer[0]);
					}
					// no equalizer node
					else{
						this.equalizationPreset[31].connect(this.hornNode);
						this.hornNode.connect(this.volumeNode);
					}	
				}
			}
		}
	}
};

// <-----Albiswerk----->
Gramophone.prototype.createEqualizer = function(){
	// initialize equalizer biquad filters
	for (var i = 0; i < 24; i++ ){
		this.equalizer[i] = context.createBiquadFilter(); 
		this.equalizer[i].type = "peaking";
		this.equalizer[i].frequency.value = this.equalizerFrequency[i];
		this.equalizer[i].Q.value = this.QFACTORVALUE;
	}
	
	// connect the filters
	for(var j = 0; j < 23; j++){
		this.equalizer[j].connect(this.equalizer[j+1]);
	}
};

Gramophone.prototype.activeEqualizer = function(){
	var $eq = jQuery.noConflict();
	
	if (this.isTrackLoaded && this.isPlaying ){
		// disable
		if (this.isEqualizerActive){
			this.equalizer[23].disconnect();
			// no horn effect
			if(this.hornType == 0){
				// no equalization preset effect
				if(this.equalizationPresetType == 0){
					this.audioSource.disconnect();
					this.audioSource.connect(this.volumeNode);
				}
				// with equalization preset effect
				else{
					this.equalizationPreset[31].disconnect();
					this.equalizationPreset[31].connect(this.volumeNode);
				}
			}
			else{
				this.hornNode.disconnect();
				this.hornNode.connect(this.volumeNode);
			}	
		}
		// active the equalizer
		else{
			// no horn effect
			if(this.hornType == 0){
				// no equalization preset effect
				if(this.equalizationPresetType == 0){
					this.audioSource.disconnect();
					this.audioSource.connect(this.equalizer[0]);
				}
				else{
					this.equalizationPreset[31].disconnect();
					this.equalizationPreset[31].connect(this.equalizer[0]);
				}
			}
			else{
				this.hornNode.disconnect();
				this.hornNode.connect(this.equalizer[0]);
			}
			this.equalizer[23].connect(this.volumeNode);
		}
	}
	
	if (this.isEqualizerActive){
		$eq("#eqButton").css("border-color","red");
		this.isEqualizerActive = false;
	}
	else{
		$eq("#eqButton").css("border-color","green");
		this.isEqualizerActive = true;
	}
};

Gramophone.prototype.changeCh = function(element, ch, mode){
	
	if(mode == 0)
	{
		this.equalizer[ch].gain.value = -element.value;
	}
	else
	{
		this.equalizer[ch].gain.value = -element;
	}
	
};


// <-----Arm----->
Gramophone.prototype.moveArm = function(startAngle, finishAngle, animationTime, direction){
	var $s  = jQuery.noConflict();
	var $elem = $s("#arm");
	
	//foreward movement
	if(direction == 0){
		
			if(this.previousState == "PAUSE")
			{
				
				$s("#arm").css({"transform":"rotate("+this.armCurrentAngle+"deg)", "transition-duration": "500ms"});
			}
			setTimeout(function (){	
				var $a = jQuery.noConflict();
				$a("#arm").css({"transform":"rotate("+finishAngle+"deg)", "transition-duration": ""+Math.round(animationTime/1000)+"s", "transition-timing-function": "linear"});
			},500);
			
			$s("#temp").stop(true,false);
	
	}
	//backward movement
	else{
		$s({deg:startAngle}).animate({deg: (95 - finishAngle)}, {
	        duration: animationTime,
	        step: function(now) {
	            // in the step-callback (that is fired each step of the animation),
	            // you can use the `now` paramter which contains the current
	            // animation-position (`0` up to `angle`)
	        	var rotateString = "rotate(" + (95 - now) + "deg)";
	        	this.armCurrentAngle = 95 - now;
	        	$elem.css("transform", rotateString);
                $elem.css("-webkit-transform", rotateString);
                $elem.css("-ms-transform", rotateString );
                $elem.css("-webkit-animation-fill-mode", "backwards");
                $elem.css("-moz-animation-fill-mode","backwards");
                $elem.css("-o-animation-fill-mode","backwards");
                $elem.css("-ms-animation-fill-mode","backwards");
                $elem.css("animation-fill-mode","backwards"); 
                $elem.css("animation-timing-function","linear"); 
                $elem.css("-webkit-animation-timing-function","linear"); 
            }
	    });
    } 
};

Gramophone.prototype.moveArmOnMouseDown = function(event){
	var that = gram;
	if(that.isArmEnabled){
		$a = jQuery.noConflict();
		// disable all commands
		disableAllCommands();
		if(that.isPlaying){
			that.isPause = true;
			// stop the music
			that.audioSource.stop();
			// update offset
			that.startOffset += (that.context.currentTime - that.startTime) * that.playBackRate;
			// stop arm movement
			stopArmAnimation();
			// stop timeout
			window.clearTimeout(that.stopTimeout);
		}
		
		// initialize variable to tracks arm users movement
		var player = $a("#player");
		var playerOffset = player.offset();
		var rotationCenterLeftOffset = playerOffset.left + 750;
		var rotationCenterTopOffset = playerOffset.top + 150;
		var rotationAngle = 0;
		
		$a(document).mousemove(function(event) {
			// calculate new armCurrentAngle
	        var offset_x = event.pageX - rotationCenterLeftOffset;
	        var offset_y = event.pageY - rotationCenterTopOffset;
	    	var atan = Math.atan(offset_x/offset_y)*(180/Math.PI);
	        
	        if (atan > 0)
	        	rotationAngle = 180 - atan;
	        else
	        	rotationAngle = -atan;
	        
	        // the arm can move between STOPDISKANGLE and STARTANGLE
	        if(rotationAngle < that.STOPDISKANGLE)
	        	rotationAngle = that.STOPDISKANGLE;
	        else if (rotationAngle > that.STARTANGLE)
	        	rotationAngle = that.STARTANGLE;
	        
	        that.armCurrentAngle = rotationAngle;
	        var rotateString = "rotate(" + rotationAngle + "deg)";
	        // debug
	        var message = "X: " + offset_x + "\nY: " + offset_y + "\nrotationAngle: " + rotationAngle 
	        		+ "\nactualAngle: " + that.armCurrentAngle ;
	        debugTest(message);
	        
	    	$a("#arm").css("transform", rotateString);
	    	$a("#arm").css("-webkit-transform", rotateString);
	    	$a("#arm").css("-ms-transform", rotateString );
	        
	        return false;
	    });
		
		$a(document).one('mouseup', function() {
			$a(document).unbind();
			// calculate new offset
        	var startPoint = (that.STARTDISKANGLE - that.armCurrentAngle)/
        		(that.STARTDISKANGLE - that.STOPDISKANGLE) * 210;
        	// update the temp rotation at the current position
		    that.moveArm(that.armCurrentAngle,that.armCurrentAngle, 0, 0);
			
		    // song is not loaded
		    if(!that.isTrackLoaded){
		    	// disable arm
		    	that.isArmEnabled = false;
		    	// arm return to start position
		    	that.moveArm(that.armCurrentAngle,that.STARTANGLE, 1000, 0);
		    	setTimeout(function(){
		    		// invite to load song
			    	inviteToLoad();
					// enable commands
					enableAllCommands();
					// enable arm movement
					that.isArmEnabled = true;
					}, 1500);
		    }
		    // song loaded
		    else{
		    	var tempAudioSource  = that.context.createBufferSource();
		    	tempAudioSource.buffer = currentBuffer;
				// if arm position is outside of the disk or over the track duration
				if((that.armCurrentAngle > that.STARTDISKANGLE) || (startPoint > tempAudioSource.buffer.duration)){
					// disable arm
			    	that.isArmEnabled = false;
			    	// 4 -> 2
			    	if (that.isPlaying){
			    		stopVinylRotation();
			    		playToPause();
			    	}
			    	that.moveArm(that.armCurrentAngle,that.STARTANGLE, 1000, 0);
			    	setTimeout(function(){
			    		// update flags and offset
				    	that.isTrackLoaded = true;
				    	that.isInInitialPosition = true;
				    	that.isPlaying = false;
				    	that.isPause = false;
				    	that.startOffset = 0;
						// enable commands
						enableAllCommands();
						// enable arm movement
						that.isArmEnabled = true;
						}, 1500);  	
				}
				// arm position inside the disk and within the track duration
				else{
					that.startOffset = startPoint;
					that.isInInitialPosition = false;
	        		if(that.isPlaying){
	        			// return in 4 state
	        			that.isPause = false;
	        			that.play();
	        		}
	        		// enable all commands
	        		enableAllCommands();
	        		that.isArmEnabled = true;
	        		var message = "isTrackLoading = " + that.isTrackLoaded + "; isInitialPosition = " +
	        			that.isInInitialPosition + "; isPlaying = " + that.isPlaying + "; isPause = " + that.isPause;
	        		debugTest(message);
				}
		    }
		        return false;
		    });
		
	}
	return false;
	
};