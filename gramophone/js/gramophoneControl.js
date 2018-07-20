  $(document).ready( function() {
    var handle = $("#custom-handle");
	var handleCh1 = $("#handle-ch1");
	var rpm_speed_handle = $("#rpm_speed");
	
	// ARM center ratios
	var center_ratio_x = 0.726464047;
	var center_ratio_y = 0.161616162;
	
	// Speed Rotation Slider 
    $("#slider").slider({
	  min: 70.0,
      max: 80.0,
	  step: 0.1,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        console.log("speed:"+ ui.value );
		gram.changeRotation(ui.value, 1);
		rpm_speed_handle.html("/ "+ui.value.toFixed(2)+" RPM");
		
      }
    });
	
	
	// Equalizer Albiswerk channel 1
	$("#slider-ch1").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch1").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch1").css({"left": "100px"}); 
      },
      slide: function( event, ui ) {
        console.log( "ch1:"+ui.value );
		gram.changeCh(100-ui.value, 0, 1);
      }
    });
	
	// Equalizer Albiswerk channel 2
	$("#slider-ch2").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch2").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch2").css({"top":"-190px", "left": "130px" });
      },
      slide: function( event, ui ) {
        console.log( "ch2:"+ui.value );
		gram.changeCh(100-ui.value, 1, 1);
      }
    });
	
	// Equalizer Albiswerk channel 3
	$("#slider-ch3").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch3").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch3").css({"top":"-504px", "left": "160px"});
      },
      slide: function( event, ui ) {
        console.log( "ch3:"+ui.value );
		gram.changeCh(100-ui.value, 2, 1);
      }
    });
	
	// Equalizer Albiswerk channel 4
	$("#slider-ch4").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch4").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch4").css({"top":"-818px", "left": "190px"});
      },
      slide: function( event, ui ) {
        console.log( "ch4:"+ui.value );
		gram.changeCh(100-ui.value, 3, 1);
      }
    });
	
	// Equalizer Albiswerk channel 5
	$("#slider-ch5").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch5").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch5").css({"top":"-1132px", "left": "218px"});
      },
      slide: function( event, ui ) {
        console.log( "ch5:"+ui.value );
		gram.changeCh(100-ui.value, 4, 1);
      }
    });
  
	// Equalizer Albiswerk channel 6
	$("#slider-ch6").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch6").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch6").css({"top":"-1446px", "left": "245px"});
      },
      slide: function( event, ui ) {
        console.log( "ch6:"+ui.value );
		gram.changeCh(100-ui.value, 5, 1);
      }
    });
	
	// Equalizer Albiswerk channel 7
	$("#slider-ch7").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch7").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch7").css({"top":"-1760px", "left": "275px"});
      },
      slide: function( event, ui ) {
        console.log( "ch7:"+ui.value );
		gram.changeCh(100-ui.value, 6, 1);
      }
    });
	
	// Equalizer Albiswerk channel 8
	$("#slider-ch8").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch8").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch8").css({"top":"-2074px", "left": "303px"});
      },
      slide: function( event, ui ) {
        console.log( "ch8:"+ui.value );
		gram.changeCh(100-ui.value, 7, 1);
      }
    });
	
	// Equalizer Albiswerk channel 9
	$("#slider-ch9").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch9").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch9").css({"top":"-2388px", "left": "333px"});
      },
      slide: function( event, ui ) {
        console.log( "ch9:"+ui.value );
		gram.changeCh(100-ui.value, 8, 1);
      }
    });
	
	// Equalizer Albiswerk channel 10
	$("#slider-ch10").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch10").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch10").css({"top":"-2702px", "left": "361px"});
      },
      slide: function( event, ui ) {
        console.log( "ch10:"+ui.value );
		gram.changeCh(100-ui.value, 9, 1);
      }
    });
	
	// Equalizer Albiswerk channel 11
	$("#slider-ch11").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch11").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch11").css({"top":"-3016px", "left": "391px"});
      },
      slide: function( event, ui ) {
        console.log( "ch11:"+ui.value );
		gram.changeCh(100-ui.value, 10, 1);
      }
    });
	
	// Equalizer Albiswerk channel 12
	$("#slider-ch12").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch12").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch12").css({"top":"-3330px", "left": "419px"});
      },
      slide: function( event, ui ) {
        console.log( "ch12:"+ui.value );
		gram.changeCh(100-ui.value, 11, 1);
      }
    });
	
	// Equalizer Albiswerk channel 13
	$("#slider-ch13").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch13").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)"});
		$("#slider-ch13").css({"top":"-3644px", "left": "448px"});
      },
      slide: function( event, ui ) {
        console.log( "ch13:"+ui.value );
		gram.changeCh(100-ui.value, 12, 1);
      }
    });
	
	// Equalizer Albiswerk channel 14
	$("#slider-ch14").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch14").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch14").css({"top":"-3958px", "left": "478px"});
      },
      slide: function( event, ui ) {
        console.log( "ch14:"+ui.value );
		gram.changeCh(100-ui.value, 13, 1);
      }
    });
	
	// Equalizer Albiswerk channel 15
	$("#slider-ch15").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch15").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch15").css({"top":"-4272px", "left": "507px"});
      },
      slide: function( event, ui ) {
        console.log( "ch15:"+ui.value );
		gram.changeCh(100-ui.value, 14, 1);
      }
    });
	
	// Equalizer Albiswerk channel 16
	$("#slider-ch16").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch16").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch16").css({"top":"-4586px", "left": "536px"});
      },
      slide: function( event, ui ) {
        console.log( "ch16:"+ui.value );
		gram.changeCh(100-ui.value, 15, 1);
      }
    });
	
	// Equalizer Albiswerk channel 17
	$("#slider-ch17").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch17").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch17").css({"top":"-4900px", "left": "565px"});
      },
      slide: function( event, ui ) {
        console.log( "ch17:"+ui.value );
		gram.changeCh(100-ui.value, 16, 1);
      }
    });
	
	// Equalizer Albiswerk channel 18
	$("#slider-ch18").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch18").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch18").css({"top":"-5214px", "left": "593px"});
      },
      slide: function( event, ui ) {
        console.log( "ch18:"+ui.value );
		gram.changeCh(100-ui.value, 17, 1);
      }
    });
	
	// Equalizer Albiswerk channel 19
	$("#slider-ch19").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch19").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch19").css({"top":"-5528px", "left": "622px"});
      },
      slide: function( event, ui ) {
        console.log( "ch19:"+ui.value );
		gram.changeCh(100-ui.value, 18, 1);
      }
    });
	
	// Equalizer Albiswerk channel 20
	$("#slider-ch20").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch20").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch20").css({"top":"-5842px", "left": "651px"});
      },
      slide: function( event, ui ) {
        console.log( "ch20:"+ui.value );
		gram.changeCh(100-ui.value, 19, 1);
      }
    });
	
	// Equalizer Albiswerk channel 21
	$("#slider-ch21").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch21").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch21").css({"top":"-6156px", "left": "681px"});
      },
      slide: function( event, ui ) {
        console.log( "ch21:"+ui.value );
		gram.changeCh(100-ui.value, 20, 1);
      }
    });
	
	// Equalizer Albiswerk channel 22
	$("#slider-ch22").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch22").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch22").css({"top":"-6470px", "left": "710px"});
      },
      slide: function( event, ui ) {
        console.log( "ch22:"+ui.value );
		gram.changeCh(100-ui.value, 21, 1);
      }
    });
	
	// Equalizer Albiswerk channel 23
	$("#slider-ch23").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch23").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch23").css({"top":"-6784px", "left": "738px"});
      },
      slide: function( event, ui ) {
        console.log( "ch23:"+ui.value );
		gram.changeCh(100-ui.value, 22, 1);
      }
    });
	
	// Equalizer Albiswerk channel 24
	$("#slider-ch24").slider({
	  orientation: "vertical",
	  min: 1,
      max: 100,
	  value: 100,
      create: function() {
        handleCh1.text( $( this ).slider( "value" ) );
		var imageUrl='./images/handleAlb.png';
		$("#slider-ch24").children("span").css({"background-image": 'url(' + imageUrl + ')',"background-repeat": "no-repeat", "height":"25px", "width": "60px", "transform": "rotate(90deg)" });
		$("#slider-ch24").css({"top":"-7098px", "left": "767px"});
      },
      slide: function( event, ui ) {
        console.log( "ch24:"+ui.value );
		gram.changeCh(100-ui.value, 23, 1);
      }
    });
	
	
/* ARM drag movement 07.06.2018*/
	
var box=$("#arm");

var boxPos = box.position();

var boxCenter = [$( window ).width()*center_ratio_x, $( window ).height()*center_ratio_y];



box.mousedown(function(){

		// flag that remember the click event (mousedown) on the arm
		gram.armClick = true;
	
		var $a = jQuery.noConflict();
		
		console.log("mousedown on arm: "+gram.armClick);
		// disable all commands
		disableAllCommands();
		// disable arm movement
		gram.isArmEnabled = false;
	
		
		gram.elapsedTime = 0;
		
		// stop vinyl rotation
		stopVinylRotation();
		// update flag  and offset
		gram.isPlaying = false;	
		gram.startOffset = 0;
		gram.previousState = gram.state;
		gram.state = "PAUSE"; 
		
		//stop audio
		if(gram.audioSource != null)
		{
			gram.audioSource.stop();
			console.log("stopped by arm control");
			gram.audioSource.disconnect();
		}

});

$(document).mousemove(function(e){    
    
      if(gram.armClick){
	  
	var angle = Math.atan2(Math.abs(e.pageX- boxCenter[0]), (e.pageY- boxCenter[1]) )*(180/Math.PI);

	if(angle<=gram.STARTDISKANGLE && angle >= gram.STOPDISKANGLE)
	{
		box.css({ 'transition': '0.1s'});
		box.css({ "-webkit-transform": 'rotate(' + angle + 'deg)'});    
		box.css({ '-moz-transform': 'rotate(' + angle + 'deg)'});
		box.css({ 'transform': 'rotate(' + angle + 'deg)'});
		gram.armCurrentAngle = angle;
		
		
	}		
    
   
    
    }
    
});

 $(document).mouseup(function(){
	if(gram.armClick)
	{
	console.log('start audio');
	if(gram.audioSource != null)
	{
		
		
		
		var ratio = Math.abs(gram.armCurrentAngle - gram.STARTDISKANGLE)/(gram.STARTDISKANGLE - gram.STOPDISKANGLE);
		
		//calculate the offset (in seconds) from which the track starts
		gram.startOffset = ratio*gram.audioSource.buffer.duration;
		
		disableAllCommands();
		
		//start gramophone to play
		gram.play();
		
		// start the disk rotation
		startVinylRotation();
		
		// start play animation leverage
		pauseToPlay();
		
		enableAllCommands();
		
	}
	else if (gram.isTrackLoaded)
	{
		gram.audioSource = context.createBufferSource();
		gram.audioSource.buffer = currentBuffer;
		
		var ratio = Math.abs(gram.armCurrentAngle - gram.STARTDISKANGLE)/(gram.STARTDISKANGLE - gram.STOPDISKANGLE);
		
		//calculate the offset (in seconds) from which the track starts
		gram.startOffset = ratio*gram.audioSource.buffer.duration;
		
		//start gramophone to play
		gram.playDisk();
	}
	else
	{
		console.log(gram.armCurrentAngle);
		gram.moveArm(gram.armCurrentAngle, gram.STARTANGLE, 1000,0);
		gram.armCurrentAngle = gram.STARTDISKANGLE;
	}
	}
	
	
	gram.armClick = false;
}); 


});
	