$( document ).ready(function() {
	 var time = 0;
	 
	 
	 
 setInterval(function (){
		var $st = jQuery.noConflict();
		
		if(gram.state == "PLAY"){
		
				// If gramophone state is "PLAY", then start timer with format: hh:mm:ss				
				if(gram.startOffset > 0 && gram.elapsedTime == 0)
				{
					gram.elapsedTime = gram.startOffset*1000;
				}
				time = (gram.elapsedTime + 100*gram.playBackRate);
				
				var hours = Math.floor(((time / 1000) / 60) / 60);
				var minutes = Math.floor(((time - (hours*60*60*1000)) / 1000) / 60);
				var seconds = Math.floor((time - (hours*60*60*1000) - (minutes*60*1000)) / 1000) ;
				
				var hoursFormatted = "";
				var minutesFormatted = "";
				var secondsFormatted = "";
				
				if(hours < 10)
				{
					hoursFormatted = "0"+hours;
				}
				else
				{
					hoursFormatted = hours;
				}
				
				if(minutes < 10)
				{
					minutesFormatted = "0"+minutes;
				}
				else
				{
					minutesFormatted = minutes;
				}
				
				if(seconds < 10)
				{
					secondsFormatted = "0"+seconds;
				}
				else
				{
					secondsFormatted = seconds;
				}
				
				$st('#timer').html(hoursFormatted+":"+minutesFormatted+":"+secondsFormatted);
				
				gram.elapsedTime = time;
		}
		else if(gram.state == "STOP")
		{
			
			time = 0;
			gram.elapsedTime = time;
			$st('#timer').html("00:00:00");
			var rpm_speed_handle = $st("#rpm_speed");
			var rpm_speed = $st("#slider").slider( "value" );
			rpm_speed_handle.html("/ "+rpm_speed.toFixed(2)+" RPM");
			
		}
		else
		{
			// "PAUSE" STATE DO NOTHING
		}
	},100);
	
 });