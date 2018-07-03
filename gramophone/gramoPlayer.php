<?php 

// This section must be removed since we change Mysql DB with SQLite once

	if(class_exists( 'ConstantVDS') != true){
		include 'constantsContainer.php';
	}	
	include 'staticTools.php';
	include 'playlist.php';
	include 'player.php';
	
// End section to remove
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

<script src="./js/timerlistener.js"></script>

<link rel="stylesheet" href="./css/jquery-ui.css">
<script type = "text/javascript" src = "./js/jquery.arctext.js"></script>
<!-- <script type="text/javascript" src="http://tympanus.net/Development/Arctext/js/jquery.arctext.js"></script> -->
<script type = "text/javascript" src = "./js/gramophone.js"></script>
<script type = "text/javascript" src = "./js/gramophoneControl.js"></script>
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
	

 </script>
 
 
 <noscript>
		<h1> Il browser non supporta javascript!!!</h1>
</noscript>

</head>
<body>
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
		<div class ="titleSubMenuDiv" >Timer / Speed (RPM)</div> 	
	<!-- 			Timer				 -->
		<div id="timer">
			<div class="values timer">00:00:00</div>
		</div>
		<div id="rpm_speed">
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
			try{
				//echo "before";
				$db = new SQLite3('im.db');
				//echo "after open";
				$results = $db->query('select * from phi_gram');
				while ($r_results = $results->fetchArray()) {
				//	print_r($r_results);
				if (file_exists('./'.$r_results['path_vinyl'])){
			?>
			<div class = "trackLoaderContainer" >
				<div class = "firstRow">
					<div class = "firstR" id="title<?php echo $r_results['id_vinyl']?>">
						<?php echo stripslashes($r_results['artista']);?> - <?php echo stripslashes($r_results['titolo']);?> (<?php echo stripslashes($r_results['data']);?>)
					</div>
					<div class = "delrow" id="dr<?php echo $r_results['id_vinyl']?>" onclick="deleterow('<?php echo $r_results['id_vinyl']?>','<?php echo basename($r_results['path_vinyl'])?>')">Delete All
					</div>
					<div class = "delfile" id="df<?php echo $r_results['id_vinyl']?>" onclick="deletefile('<?php echo $r_results['id_vinyl']?>','<?php echo basename($r_results['path_vinyl'])?>')">Delete File
					</div>
					<div class = "trackLoaderButton" id="<?php echo $r_results['id_vinyl']?>" onclick="gram.loadDisk('<?php echo $r_results['path_vinyl']?>','<?php echo stripslashes($r_results['titolo'])?>','<?php echo $r_results['velocita']?>')">Load Disk
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
					<tr class = "thirdRow" id="data<?php echo $r_results['id_vinyl']?>">
						<td><?php echo $r_results['grammofono'];?></td>
						<td><?php echo $r_results['velocita'];?></td>
						<td><?php echo $r_results['dim_peso'];?></td>
						<td><?php echo $r_results['puntina'];?></td>
						<td><?php echo $r_results['equalizzazione'];?></td>
					</tr>
				</table>
			</div>
			
			<?php 	}
						else {
							?>
							<div class = "trackUploadContainer" >
								<div class = "firstRow">
									<div class = "firstRUp" id="title<?php echo $r_results['id_vinyl']?>">
										<?php echo stripslashes($r_results['artista']);?> - <?php echo stripslashes($r_results['titolo']);?> (<?php echo stripslashes($r_results['data']);?>)
									</div>
									<div class = "delrow" id="dr<?php echo $r_results['id_vinyl']?>" onclick="deleterow('<?php echo $r_results['id_vinyl']?>','<?php echo basename($r_results['path_vinyl'])?>')">Delete All
									</div>
									<div class = "errorLoader" id="<?php echo $r_results['id_vinyl']?>" missing="<?php echo $r_results['path_vinyl']?>"> <?php echo basename($r_results['path_vinyl'])?> not found 
									</div>
									
								</div>
								<div class = "uploadRow">
									<form action="upload.php" class="form-file" id="fr<?php echo $r_results['id_vinyl']?>" method="post" enctype="multipart/form-data">
										Select file to upload (mp3,flac,wav):
										<input type="file" class="input-file" name="newTrack" id="in<?php echo $r_results['id_vinyl']?>">
										<input type="submit" class="button-file" id="bt<?php echo $r_results['id_vinyl']?>" value="Upload Track" name="submit">
									</form>

								</div>
								<table class = "dbTable">	
									<tr class = "secondRow">
										<td>Grammofono</td>
										<td>Velocita'(rpm)</td>
										<td>Dim. e Peso Puntina</td>
										<td>Tipo Puntina</td>
										<td>Equalizzazione</td>
									</tr>
									<tr class = "thirdRow" id="data<?php echo $r_results['id_vinyl']?>">
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
				} 
				catch(PDOException $e) {
					echo $e->getMessage();
					}
			?>
	</div>
</div>
<div id = "songDB2Title" class = "partTitle" onclick="gramTools.openTool(4)">
	<div class ="titleMenuDiv" >Import files</div>
	<div class = "pads" ></div>
	<div id = "openDB2" class = "openPart" ></div>
</div>

<div id = "db2Menu" class = "menuControlPart">
	<div class = "importSubTitle" onclick="gramTools.openTool(8)">
		<div class ="titleSubMenuDiv" >Import single track</div>
		<div id = "singleTrackTitle" class = "openSubPart" ></div>
	</div>
	<div id = "singleTrack" class = "importSubMenu">
		<form action="upload.php" id="singleform">
			<table class="formTable" id="singleTable">
				<tr><th>Title:<td><input id="singletitle" type="text" name="title" class="td100" required></tr>
				<tr><th>Author:<td><input id="singleauthor" type="text" name="author" class="td100" required></tr>
				<tr><th>Year:<td><input id="singleyear" type="number" name="author" class="td100" required></tr>
				<tr><th>Speed:<td>
				<select id="singlespeed" name="speedselect" class="td100">
				  <option value="70">70.00 Columbia</option>
				  <option value="71.29">71.29 Victor e Hmv</option>
				  <option value="76.59">76.59 Acoustic Victor</option>
				  <option value="78.26">78.26 Electric Record</option>
				  <option value="80">80.00 Acoustic Columbia and Vertical Recording</option>
				</select> </tr>
				<tr><th>Gramophone<td>
				<select id="singlegramophone" name="grammofonoselect" class="td100">
				  <option value="grammofono">Grammofono</option>
				  <option value="giradischi">Giradischi</option>
				</select> </tr>
				<tr><th>Puntina<td>
				<select id="singlepuntina" name="puntinaselect" class="td100">
				  <option value="Tronco-ellittica">Tronco-ellittica</option>
				  <option value="Soft Tone">Soft Tone</option>
				</select> </tr>
				<tr><th>Dim. e peso Puntina<td>
				<select id="singledim" name="dimselect" class="td100">
				  <option value="3.5 mil - 4 g">3.5 mil - 4 g</option>
				  <option value="-">-</option>
				</select> </tr>
				<tr><th>Equalization<td>
				<select id="singleeq" name="eqselect" class="td100">
				  <option value="flat">Flat</option>
				  <option value="-">-</option>
				</select></tr>
				<tr><th>Copy Type<td>
				<select id="singletype" name="typeselect" class="td100">
				  <option value="Copia conservativa">Copia conservativa</option>
				  <option value="Lettura">Lettura</option>
				</select></tr>
				<tr><th>Select file (mp3,flac,wav):<td><input type="file" class="input-file" name="singleimport" id="singleimport" required></tr>
				<tr><td colspan=2 ><input id="singlesubmit" type="submit" class="td100" value="Upload Track"></tr>
			</table>
		</form>
	
	</div>
	
	<div class = "importSubTitle" onclick="gramTools.openTool(9)">
		<div class ="titleSubMenuDiv" >Import/Export Tracklist</div>
		<div id = "jsonTitle" class = "openSubPart" ></div>
	</div>
	<div id = "json" class = "importSubMenu">
	<form method="post" action="upload.php">
		<input type="hidden" name="request" value="downloadjson">
		<input id="exportjson" type="submit" class="td100" value="Download Tracklist (.json)">
	</form>
	<form method="post" action="downloadzip.php">
		<input type="hidden" name="request" value="downloadfiles">
		<input id="exportfiles" type="submit" class="td100" value="Download Tracks (.zip)">
	</form>
	<input id="resetdb" type="submit" class="td100" value="Reset database">
	<form action="uploadlist.php" target="_blank" id="jsonform" method="post" enctype="multipart/form-data" >
		Select .json file to upload: 
		<input type="hidden" name="request" value="loadjson">
		<input type="file" name="jsonimport" id="jsonimport" required>
		<input type="submit" id="jsonbutton" value="Upload Tracks" name="jsonbutton">
	</form>
	</div>
	
</div>
<script type = "text/javascript" src = "./js/uploader.js"></script>
</body>

