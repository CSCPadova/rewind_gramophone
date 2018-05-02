<?php 

	if(class_exists( 'ConstantVDS') != true){
		include 'constantsContainer.php';
	}	
	include 'staticTools.php';
	include 'playlist.php';
	include 'player.php';
?>
<head>
<style>
   @import url(./css/gramophone.css);
   @import url(./css/gramophoneControls.css);
   @import url(./css/gramophoneEqualizer.css);
   /*@import url(./css/gramophoneSongDB2.css);*/
   @import url(./css/gramophoneSongDB.css); 
   @import url(./css/gramophoneClass.css);
</style>
  

<script type = "text/javascript" src = "./jquery/jquery-1.12.4.js"></script>
<script type = "text/javascript" src = "./jquery/jquery-ui.js"></script>
<script type = "text/javascript" src = "./jquery/jQueryRotateCompressed.js"></script>

<script src="./js/easytimer/easytimer.min.js"></script>

<link rel="stylesheet" href="./css/jquery-ui.css">
<script type = "text/javascript" src = "./js/jquery.arctext.js"></script>
<!-- <script type="text/javascript" src="http://tympanus.net/Development/Arctext/js/jquery.arctext.js"></script> -->
<script type = "text/javascript" src = "./js/gramophone.js"></script>
<script type = "text/javascript" src = "./js/gramophoneTools.js"></script>
<script type="text/javascript">
	var contextClass = (window.AudioContext || 
		window.webkitAudioContext || 
		window.mozAudioContext || 
		window.oAudioContext || 
		window.msAudioContext);
	if (contextClass) {
		// Web Audio API is available.
		var context = new contextClass();
		var gram = new Gramophone(context);
		gram.createPresetEqualization();
		gram.createEqualizer();
	}
	else{
		// Web Audio API is not available. Ask the user to use a supported browser.
		document.write("Il browser non supporta Web Audio Api.");
	}
	var gramTools = new GramophoneTools();
	var timer = new Timer();
	

 </script>
 <noscript>
		<h1> Il browser non supporta javascript!!!</h1>
</noscript>

<script type='text/javascript'>


  $( function() {
    var handle = $("#custom-handle");
	var handleCh1 = $("#handle-ch1");
	
	
	
	timer.addEventListener('secondsUpdated', function (e) {
		var $st = jQuery.noConflict();
		$st('#timer').html(timer.getTimeValues().toString());
		console.log(timer.getTimeValues().toString());
	});
	
	
	
	console.log("ciao");
    $("#slider").slider({
	  min: 70.0,
      max: 80.0,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        console.log( ui.value );
		gram.changeRotation(ui.value, 1);
      }
    });
	
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

	
	
  });
  </script>

</head>
<div>
<!-- debug -->
<div id = "debug" style = "display: none"> X: 0 <br> Y:0</div>


<div id = "info" onclick='gramTools.openInfo()'> </div>
<!-- gramophone -->

<div id = "player"> 	 
	<div  id = "disco"> 
		<div id= "vinylContainer">
			<div id = "playDiv">
				<!-- <input id = "pauseRange"  type = "range" onchange = "gram.playDisk()" value = "1" max = "1" min = "0" step = "1"> -->
				<img id='play' onclick='gramTools.play()' style='margin-top:50px;' src='./images/play.png'> 
			</div>
			<div id = "vinyl" class = "discoRotation" > 
				<p id = "label" ><p>
				<div id= "temp" ></div>
			</div>
			<!-- <div id = "vinylLight"></div> -->
			<div id = "arm"></div>
			
		</div>
	</div>
	
	

	
	<div id="changeRotation">
		<!--<input id = "changeRotationInput" type="range" onchange = "gram.changeRotation(this,0);" value="78" max="80" min="70">-->
		<div id="slider">
			<div id="custom-handle" class="ui-slider-handle"></div>
		</div>
	</div>
</div>

<!--  controls -->

<div id = "controlsTitle" class = "partTitle" onclick="gramTools.openTool(1)">
	<div class ="titleMenuDiv" >Controls</div>
	<div class = "pads" ></div>
	<div id = "openControls" class = "openPart" ></div>
</div>

<div id = "controlsMenu" class = "menuControlPart">
	
	<!-- 			Rotation Preset			 	-->
	<div class = "controlsSubTitle" onclick="gramTools.openTool(5)">
		<div class ="titleSubMenuDiv" >Rotation Preset</div>
		<div id = "openControl1" class = "openSubPart" ></div>
	</div>
	<div id = "rotationControl" class = "controlsSubMenu">
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation0" onclick="gram.changePresetRotation(0)" checked = "checked">  No preset </input>
		</div>
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation1" onclick="gram.changePresetRotation(1)">  Original Speed</input>
		</div>
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation2" onclick="gram.changePresetRotation(2)">  70,00 rpm - Columbia</input>
		</div>
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation3" onclick="gram.changePresetRotation(3)">  71,29 rpm  - Victor e Hmv</input>
		</div>
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation4" onclick="gram.changePresetRotation(4)">  76,59 rpm - Acoustic Victor</input>
		</div>
		<div class = "rotPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation5" onclick="gram.changePresetRotation(5)">  80,00 rpm - Acoustic Columbia and Vertical Recording</input>
		</div>
		<div class = "rotPreset , lastPreset">
			<input type = "radio" name = "radioRotation" id = "Rotation6" onclick="gram.changePresetRotation(6)">  78,26 rpm - Electric Record</input>
		</div>
	</div>
	
	<!-- 			Equalization Preset				 -->
	<div class = "controlsSubTitle" onclick="gramTools.openTool(6)">
		<div class ="titleSubMenuDiv" >Equalization Preset</div>
		<div id = "openControl2" class = "openSubPart" ></div>
	</div>
	<div id = "equalizationControl" class = "controlsSubMenu">
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq0" onclick="gram.changePresetEq(0)" checked = "checked">  No equalization</input>
		</div>
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq1" onclick="gram.changePresetEq(1)">  Riaa</input>
		</div>
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq2" onclick="gram.changePresetEq(2)">  Rca</input>
		</div>
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq3" onclick="gram.changePresetEq(3)">  Hmv</input>
		</div>
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq4" onclick="gram.changePresetEq(4)">  Ffrr</input>
		</div>
		<div class = "eqPreset">
			<input type = "radio" name = "radioEq" id = "radioEq5" onclick="gram.changePresetEq(5)">  Nab</input>
		</div>
		<div id = "changeEqualizationFilter">
			<div id = "customTitle">
				<input type = "radio" name = "radioEq" id = "radioEq6" onclick="gram.changePresetEq(6)">  Custom Equalization</input>
			</div>
			<div id = "bassTurnover" class = "customRangeContainer">
				<div>Bass Turnover Frequency</div>
				<div id = "bassTurnoverLabel" class = "LabelCustom">500 Hz</div>
				<div>
					<input id = "bassTurnoverRange" type="range" onchange = "gram.changePresetValue(this,0);" value="500" max="1000" min="200" disabled ="disabled">
				</div>
			</div>
			<div id = "rolloff" class = "customRangeContainer">
				<div>High Gain Rolloff</div>
				<div id = "rolloffLabel" class = "LabelCustom">-13.7 dB</div>
				<div>
					<input id = "rolloffRange" type="range" onchange = "gram.changePresetValue(this,1);" value="-13.7" max="0" min="-24" step = "0.1" disabled ="disabled">
				</div>
			</div>
			<div id = "shelving" class = "customRangeContainer">
				<div>LF Shelving Frequency</div>
				<div id = "shelvingLabel" class = "LabelCustom" >50 Hz</div>
				<div>
					<input id = "shelvingRange" type="range" onchange = "gram.changePresetValue(this,2);" value="50" max="100" min="10" disabled ="disabled">
					<input id = "shelvingEnable" type = "checkbox" disabled ="disabled" onchange = "gram.enableShelving();"></input>
				</div>	
			</div>
			<div id = "normalization"></div>
			<div id = "gain10"></div>
		</div>
	</div>
	
	<!-- 			Horn Preset				 -->
	<div class = "controlsSubTitle" onclick="gramTools.openTool(7)">
		<div class ="titleSubMenuDiv" >Horn Preset</div>
		<div id = "openControl3" class = "openSubPart" ></div>
	</div>
	<div id = "hornControl" class = "controlsSubMenu">
		<div class = "hornPreset">
			<input  type= "radio" name = "radioHorn" id = "Horn0" onclick="gram.changeHorn(0)" checked = "checked">  No Filter</input>
		</div>
		<div class = "hornPreset">
			<input type = "radio" name = "radioHorn" id = "Horn1" onclick="gram.changeHorn(1)">  Horn 1</input>
		</div>
		<div class = "hornPreset , lastPreset">	
			<input type = "radio" name = "radioHorn" id = "Horn2" onclick="gram.changeHorn(2)">  Horn 2</input>
		</div>
	</div>
	
	<!-- 			Volume				 -->
	<div class = "controlsSubTitle">
		<div class ="titleSubMenuDiv" >Volume</div> 
		<input id = "vol" type="range" onchange = "gram.changeVolume(this);" value="100" max="100" min="0"></div>
		
	<div class = "controlsSubTitle">
		<div class ="titleSubMenuDiv" >Timer</div> 	
	<!-- 			Timer				 -->
		<div id="timer">
			<div class="values timer">00:00:00</div>
		</div>
	</div>
</div>



<!-- equalizer -->

<div id = "equalizationTitle" class = "partTitle" onclick="gramTools.openTool(2)">
	<div class ="titleMenuDiv" >Albiswerk Web Equalizer</div>
	<div class = "pads" ></div>
	<div id = "openEq" class = "openPart" ></div>
</div>

<div id = "eqMenu" class = "menuPart">
	<div id = "equalizerDeck">
		
		<div id = "equalizer"> 

			<div id="slider-ch1">
				<div id="handle-ch1" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch2">
				<div id="handle-ch2" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch3">
				<div id="handle-ch3" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch4">
				<div id="handle-ch4" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch5">
				<div id="handle-ch5" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch6">
				<div id="handle-ch6" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch7">
				<div id="handle-ch7" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch8">
				<div id="handle-ch8" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch9">
				<div id="handle-ch9" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch10">
				<div id="handle-ch10" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch11">
				<div id="handle-ch11" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch12">
				<div id="handle-ch12" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch13">
				<div id="handle-ch13" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch14">
				<div id="handle-ch14" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch15">
				<div id="handle-ch15" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch16">
				<div id="handle-ch16" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch17">
				<div id="handle-ch17" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch18">
				<div id="handle-ch18" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch19">
				<div id="handle-ch19" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch20">
				<div id="handle-ch20" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch21">
				<div id="handle-ch21" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch22">
				<div id="handle-ch22" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch23">
				<div id="handle-ch23" class="slider-handle-ch1"></div>
			</div>
			<div id="slider-ch24">
				<div id="handle-ch24" class="slider-handle-ch1"></div>
			</div>
			<!-- <div id = "channel0" class = "eqChannelsEven">
				<input id = "ch0" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,0);" value="0" max="60" min="0">
			</div>
			<div id = "channel1" class = "eqChannelsOdd">
				<input id = "ch1" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,1);" value="0" max="60" min="0">
			</div>
			<div id = "channel2" class = "eqChannelsEven">
				<input id = "ch2" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,2);" value="0" max="60" min="0">
			</div>
			<div id = "channel3" class = "eqChannelsOdd">
				<input id = "ch3" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,3);" value="0" max="60" min="0">
			</div>
			<div id = "channel4" class = "eqChannelsEven">
				<input id = "ch4" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,4);" value="0" max="60" min="0">
			</div>
			<div id = "channel5" class = "eqChannelsOdd">
				<input id = "ch5" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,5);" value="0" max="60" min="0">
			</div>
			<div id = "channel6" class = "eqChannelsEven">
				<input id = "ch6" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,6);" value="0" max="60" min="0">
			</div>
			<div id = "channel7" class = "eqChannelsOdd">
				<input id = "ch7" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,7);" value="0" max="60" min="0">
			</div>
			<div id = "channel8" class = "eqChannelsEven">
				<input id = "ch8" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,8);" value="0" max="60" min="0">
			</div>
			<div id = "channel9" class = "eqChannelsOdd">
				<input id = "ch9" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,9);" value="0" max="60" min="0">
			</div>
			<div id = "channel10" class = "eqChannelsEven">
				<input id = "ch10" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,10);" value="0" max="60" min="0">
			</div>
			<div id = "channel11" class = "eqChannelsOdd">
				<input id = "ch11" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,11);" value="0" max="60" min="0">
			</div>
			<div id = "channel12" class = "eqChannelsEven">
				<input id = "ch12" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,12);" value="0" max="60" min="0">
			</div>
			<div id = "channel13" class = "eqChannelsOdd">
				<input id = "ch13" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,13);" value="0" max="60" min="0">
			</div>
			<div id = "channel14" class = "eqChannelsEven">
				<input id = "ch14" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,14);" value="0" max="60" min="0">
			</div>
			<div id = "channel15" class = "eqChannelsOdd">
				<input id = "ch15" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,15);" value="0" max="60" min="0">
			</div>
			<div id = "channel16" class = "eqChannelsEven">
				<input id = "ch16" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,16);" value="0" max="60" min="0">
			</div>
			<div id = "channel17" class = "eqChannelsOdd">
				<input id = "ch17" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,17);" value="0" max="60" min="0">
			</div>
			<div id = "channel18" class = "eqChannelsEven">
				<input id = "ch18" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,18);" value="0" max="60" min="0">
			</div>
			<div id = "channel19" class = "eqChannelsOdd">
				<input id = "ch19" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,19);" value="0" max="60" min="0">
			</div>
			<div id = "channel20" class = "eqChannelsEven">
				<input id = "ch20" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,20);" value="0" max="60" min="0">
			</div>
			<div id = "channel21" class = "eqChannelsOdd">
				<input id = "ch21" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,21);" value="0" max="60" min="0">
			</div>
			<div id = "channel22" class = "eqChannelsEven">
				<input id = "ch22" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,22);" value="0" max="60" min="0">
			</div>
			<div id = "channel23" class = "eqChannelsOdd">
				<input id = "ch23" class = "rangeChannels" type="range" onchange = "gram.changeCh(this,23);" value="0" max="60" min="0">
			</div>
		</div> -->
		<div id = "activeButton" style = "display: none">
			<button id = "eqButton" onclick="gram.activeEqualizer()" >ON</button>
		</div>
	</div>
</div>
</div>




	
<!-- DB song  -->
<div id = "songDBTitle" class = "partTitle" onclick="gramTools.openTool(3)">
	<div class ="titleMenuDiv" >Track Loader</div>
	<div class = "pads" ></div>
	<div id = "openDB" class = "openPart" ></div>
</div>

<div id = "dbMenu" class = "menuPart">

	<div id = "songdb">
	<?php 
	
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "im";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM phi_gram";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($r_results = $result->fetch_assoc()) {
		
		?>
			<div class = "trackLoaderContainer" >
				<div class = "firstRow">
					<div class = "firstR">
						<?php echo stripslashes($r_results['artista']);?> - <?php echo stripslashes($r_results['titolo']);?> (<?php echo stripslashes($r_results['data']);?>)</td>
					</div>
					<div class = "trackLoaderButton"  onclick="gram.loadDisk('<?php echo $r_results['path_vinyl']?>','<?php echo $r_results['titolo']?>','<?php echo $r_results['velocita']?>')">Load Disk
					</div>
				</div>
				
				<table class = "dbTable">	
					<tr class = "secondRow">
						<td>Grammofono</td>
						<td>Velocita'(rpm)</td>
						<td>Dim. e Peso Puntina</td>
						<td>Tipo Puntina</td>
						<td>Equalizzazione</td>
					</tr>
					<tr class = "thirdRow">
						<td><?php echo $r_results['grammofono'];?></td>
						<td><?php echo $r_results['velocita'];?></td>
						<td><?php echo $r_results['dim_peso'];?></td>
						<td><?php echo $r_results['puntina'];?></td>
						<td><?php echo $r_results['equalizzazione'];?></td>
					</tr>
				</table>
			</div>
			
	<?php 
			
		}
	}
		
	?>
	</div>
</div>

