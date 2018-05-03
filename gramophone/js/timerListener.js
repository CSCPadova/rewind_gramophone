 $( document ).ready(function() {
	 
	 timer.addEventListener('secondsUpdated', function (e) {
		var $st = jQuery.noConflict();
		$st('#timer').html(timer.getTimeValues().toString());
		console.log(timer.getTimeValues().toString());
	});
	 
 });
