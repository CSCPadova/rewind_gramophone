<script type = "text/javascript" src = "./jquery/jquery-1.12.4.js"></script>
<script type = "text/javascript" src = "./jquery/jquery-ui.js"></script>
<script type = "text/javascript" src = "./jquery/jQueryRotateCompressed.js"></script>

<script src="./js/easytimer/easytimer.js"></script>

<script type="text/javascript">

 $( document ).ready(function() {
	 var time = 0;
	 
	 setInterval(function (){
		var $st = jQuery.noConflict();
		
		time += 100;
		
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
		console.log(hours+":"+minutes+":"+seconds);
	},100);
	

	
	
	 $('.2x').click(function () {
    timer.changeSpeed(2);
});

	 $('.3x').click(function () {
    timer.changeSpeed(3);
});

 
 $('.startButton').click(function () {
    timer.start();
});
$('.pauseButton').click(function () {
    timer.pause();
});
$('.stopButton').click(function () {
    timer.stop();
});
$('.resetButton').click(function () {
    timer.reset();
});

 });

</script>

<!-- 			Timer				 -->
		<div id="timer">
			<div class="values timer">00:00:00</div>
		</div>
		
		<div>
        <button class="startButton">Start</button>
        <button class="pauseButton" >Pause</button>
        <button class="stopButton">Stop</button>
        <button class="resetButton">Reset</button>
		
		<button class="2x">2x</button>
		
		<button class="3x">3x</button>
		
		<button class="4x">4x</button>
    </div>