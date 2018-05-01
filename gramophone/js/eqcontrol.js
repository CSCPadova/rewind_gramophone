

// Function for the playback timer update
audio.ontimeupdate = function() {
    var currentSeconds = (Math.floor(this.currentTime % 60) < 10 ? '0' : '') + Math.floor(this.currentTime % 60);
    var currentMinutes = (Math.floor(this.currentTime / 60) < 10 ? '0' : '') + Math.floor(this.currentTime / 60);
    // As a side note, native getElementById is faster than jQuery's $ selector
    document.getElementById('timer').innerHTML = currentMinutes + " : " + currentSeconds;
};



// Wait for window.onload to fire
window.addEventListener('load', function(e) {
    // Our <audio> element will be the audio source.
    source = context.createMediaElementSource(audio); 
    
    // Gain to compensate for volume loss after convolution
    gain = context.createGain();
    // It seems to be a problem only in webkit browsers
    if (typeof webkitAudioContext !== 'undefined') {
        gain.gain.value = 25;
    }

    // A convolver for each supported standard
    IEC1_15 = context.createConvolver();
    IEC1_7 = context.createConvolver();
    IEC2_15 = context.createConvolver();
    IEC2_7 = context.createConvolver();
    NAB_15 = context.createConvolver();
    NAB_7 = context.createConvolver();
    NAB_3 = context.createConvolver();

    // Setting the ID for each convolver
    IEC1_15.id = "IEC1_15";
    IEC1_7.id = "IEC1_7";
    IEC2_15.id = "IEC2_15";
    IEC2_7.id = "IEC2_7";
    NAB_15.id = "NAB_15";
    NAB_7.id = "NAB_7";
    NAB_3.id = "NAB_3";

    // Setting the impulse response for each convolver
    // (some are shared)
    IEC1_15.imp = "IEC1_15";
    IEC1_7.imp = "IEC1_7";
    IEC2_15.imp = "IEC2_15";
    IEC2_7.imp = "IEC2_15";
    NAB_15.imp = "IEC2_15";
    NAB_7.imp = "IEC2_15";
    NAB_3.imp = "NAB_3";

    // Chaining the convolver in a round-robin fashion
    IEC1_7.next = IEC1_15;
    IEC1_15.next = IEC2_7;
    IEC2_7.next = IEC2_15;
    IEC2_15.next = NAB_15;
    NAB_15.next = NAB_7;
    NAB_7.next = NAB_3;
    NAB_3.next = IEC1_7;

    IEC1_7.prev = NAB_3;
    IEC1_15.prev = IEC1_7;
    IEC2_7.prev = IEC1_15;
    IEC2_15.prev = IEC1_7;
    NAB_15.prev = IEC2_15;
    NAB_7.prev = NAB_15;
    NAB_3.prev = NAB_7;

    // Setting the (extimated) reel rotation speeds
    IEC1_15.speed = IEC2_15.speed = NAB_15.speed = - 360 * 1.5;
    IEC1_7.speed = IEC2_7.speed = NAB_7.speed = - 360 * 0.75;
    NAB_3.speed = - 360 * 0.375;

    // Function to request impulse responses .wav files
    function setImpResp(convolver) {
        var request = new XMLHttpRequest();
        request.open("GET", "/" + convolver.imp + ".wav", true);
        request.responseType = "arraybuffer";
        request.onload = function() {
        convolver.buffer = context.createBuffer(request.response, false);   
        console.log("Impulse response for convolver " + convolver.id + " loaded successfully.");   //Original */
        
        
        /*context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					  alert('error decoding file data: ' + 'http://localhost/phi/' + path);
					  return;
				  }
				convolver.buffer = buffer; 
				 

			},
			  function(error) {
				  console.error('decodeAudioData error', error);
			  });
*/

           
        };
        request.send();
    }

    // Loading impulse responses - TBCompleted
    setImpResp(IEC2_15);
    setImpResp(IEC2_7);
    setImpResp(IEC1_15);
    setImpResp(IEC1_7);
    setImpResp(NAB_15);
    setImpResp(NAB_7);
    setImpResp(NAB_3);

    gain.connect(context.destination);
    
    // List playable files
    $.getJSON('/list', function(result) {
        $.each(result, function(key, track) {
            $('#selector').append('<option value="'+track.filename+'">['+track.ips+'] '+track.title+'</option>');
        });
        audio.src = '/play/'+result[0].filename;
    });

}, false);

// Play - Stop - Prev - Next functions for the buttons
function play(element) {
    element.play();  // original
    anim.start();
}

function pause(element) {
    element.pause();
    anim.stop();
}

// 'next' and 'prev' buttons have been replaced by 'rewind' and 'fast forward'
// We're keeping the code for future reference
function next() {
    var s = document.getElementById('selector');
    s.selectedIndex = (document.getElementById('selector').selectedIndex + 1) % s.length;
    if (s.selectedIndex === 0)
        s.selectedIndex = (document.getElementById('selector').selectedIndex + 1) % s.length;
    switchSong(s.value);
}

function prev() {
    var s = document.getElementById('selector');
    s.selectedIndex = ((s.selectedIndex - 1) % s.length + s.length) % s.length;
    if (s.selectedIndex === 0)
        s.selectedIndex = ((s.selectedIndex - 1) % s.length + s.length) % s.length;
    switchSong(s.value);
}

// Fast Forward and Rewind functionalities
var intervalRewind;

function fastForward() {
    audio.playbackRate = 4.0;
    changeSpeed(currentEQ.speed * 3);
}

function rewind() {
    changeSpeed(currentSpeed * (-3));
    intervalRewind = setInterval(function() {
       audio.playbackRate = 1.0;
       if (audio.currentTime === 0) {
           clearInterval(intervalRewind);
           pause(audio);
           anim.stop();
       } else {
           audio.currentTime += -0.1;
       }
    },30);
}

function resume() {
    audio.playbackRate = 1.0;
    changeSpeed(currentEQ.speed);
    clearInterval(intervalRewind);
    changeEQ(currentEQ);
}

// Adding event listeners

var wasPlaying = true;

$('#play').click( function() {
    play(audio);
    wasPlaying = true;
});

$('#pause').click( function() {
    pause(audio);
    wasPlaying = false;
});

$('#rewind').mousedown( function() {
    if (audio.paused) {
        play(audio);
    }
    rewind();
});

$('#rewind').mouseup( function() {
    resume();
    if (!wasPlaying)
        pause(audio);
});

$('#ffward').mousedown( function() {
    if (audio.paused)
        play(audio);
    fastForward();
});

$('#ffward').mouseup( function() {
    resume();
    if (!wasPlaying)
        pause(audio);
});

var currentEQ;
var currentSpeed;
var originalSpeed;
var newConv;

// Functions to switch EQ and load new tracks

function changeEQ(newEQ) {
    if (newEQ != currentEQ) {
        source.disconnect(currentEQ);
        source.connect(newEQ);
        newEQ.connect(gain);
        changeSpeed(newEQ.speed);
        currentSpeed = newEQ.speed;
        currentEQ = newEQ;
    }
}

function changeSpeed(newSpeed) {
    angularSpeed = newSpeed;
}

// Change the EQ and the playback rate with the IPS knob
function nextEQ(inEQ) {
    if (originalSpeed / inEQ.next.speed == 2) {
        audio.playbackRate = 0.5; //.value
    }
    else if (originalSpeed / inEQ.next.speed == 0.5) {
        audio.playbackRate = 2.0; //.value
    }
    else {
        audio.playbackRate = 1.0; //.value
    }
    $('#kn').attr('class', inEQ.next.id);
    changeEQ(inEQ.next);
}

// Revert to the original EQ
function revertEQ() {
    nextEQ(newConv.prev);
}

function switchSong(newSong) {
    var newEQ = newSong.split('.');
    anim.stop();
    audio.src = '/play/'+newSong;
    audio.addEventListener('canplaythrough', function() {
    if (newEQ[0] == 'IEC1_15')
        newConv = IEC1_15;
    else if (newEQ[0] == 'IEC1_7')
        newConv = IEC1_7;
    else if (newEQ[0] == 'IEC2_15')
        newConv = IEC2_15;
    else if (newEQ[0] == 'IEC2_7')
        newConv = IEC2_7;
    else if (newEQ[0] == 'NAB_15')
        newConv = NAB_15;
    else if (newEQ[0] == 'NAB_7')
        newConv = NAB_7;
    else if (newEQ[0] == 'NAB_3')
        newConv = NAB_3;
    changeEQ(newConv);
    originalSpeed = newConv.speed;
    if ($('kn').attr('class') != newConv.id)
        $('#kn').attr('class', newConv.id);
    audio.playbackRate.value = 0.5; //1.0
        play(audio);
    });
    wasPlaying = true;
}
