<!DOCTYPE html>
	<script type = "text/javascript" src = "./js/bufferLoader.js"></script>
	<script type = "text/javascript">
	<!--
		var contextClass = (window.AudioContext || 
			  window.webkitAudioContext || 
			  window.mozAudioContext || 
			  window.oAudioContext || 
			  window.msAudioContext);
		if (contextClass) {
			// Web Audio API is available.
			var context = new contextClass();
			document.write("Il browser supporta Web Audio Api.");

			
			
			// load a song
			bufferLoader = new BufferLoader(
					    context,
					    [
					      '/db/audio/mp3/1965-NPS-Ricerca4.mp3',
					    ],
					    finishedLoading
					    );

			bufferLoader.load();

		} 
		else {
			// Web Audio API is not available. Ask the user to use a supported browser.
			document.write("Il browser non supporta Web Audio Api.");

		}
		//-->
	</script>
	<noscript>
		<h1> Il browser non supporta javascript!!!</h1>
	</noscript>

<?php 
	// browsers control
	
	
	// play button
	
	// create web audio graph
	
	// create the buffer
	
	// play function 
	

?>
