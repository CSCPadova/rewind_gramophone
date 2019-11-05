/**
 * Basic waveform visualizzation for gramophone
 * 
 * Date: September 2019 - October 2019
 * Author: daohong li, daohong.li@studenti.unipd.it
 */

(function (Peaks, gramophone) {
    /**
     * Append Container
     */
    const container = document.createElement("div");
    container.id = "waveform-container";
    container.style = "margin-left: 30px; pointer-events:none;";
    const overview = document.createElement("div");
    overview.id = "overview-container";
    container.appendChild(overview);

    const controls = document.getElementById("controlsTitle");
    controls.parentElement.insertBefore(container, controls);

    /**
     * Append dummy audio
     * 
     * dummy <audio> required by the peaks.js
     */
    const audioTag = document.createElement("audio");
    audioTag.id = "audio";
    audioTag.innerText = "Your browser does not support the audio element."
    document.body.appendChild(audioTag);

    /**
     * Create a dummy buffer for display
     */
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var frameCount = audioCtx.sampleRate * 200.0;
    var dummyBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
    audioCtx.close();

    const options = {
        containers: {
            overview: document.getElementById('overview-container')
        },
        mediaElement: document.getElementById('audio'),
        webAudio: {
            audioBuffer: dummyBuffer,
        },
        keyboard: false,
        pointMarkerColor: '#006eb0',
        overviewWaveformColor: '#cccccc',
        showPlayheadTime: true
    };
    Peaks.init(options, function (err, peaksInstance) {
        console.log('Peaks instance ready');
        gramophone.initWaveFormView(peaksInstance);
    });
})(peaks, gram);

/**
 * Initializes the waveform view context
 * 
 * @param waveform Peaks instance
 */
Gramophone.prototype.initWaveFormView = function (waveform) {
    if (!waveform) {
        throw new Error('WaveForm null @ waveform.js, initWaveForm()');
    }
    this.waveform = waveform;
    this.waveLoaded = false;
    this.waveInterval = null;
    this.waveHead = 0;
    console.log("WaveForm initialized!");
}

/**
 * Feed the audioBuffer to the waveform view
 * 
 * @param audioBuffer audioBuffer to be visualized
 */
Gramophone.prototype.setWaveFormBuffer = function (audioBuffer) {
    if (!this.waveform) {
        throw new Error('WaveForm not initialized @ waveform.js, setWaveFormBuffer()');
    }

    const options = {
        webAudio: {
            audioBuffer: audioBuffer,
            multiChannel: false
        }
    };

    const self = this;
    const self_waveform = this.waveform;
    function reset() {
        self_waveform.removeAllListeners('player_canplay');
        self_waveform.removeAllListeners('player_error');
    }

    function updateWaveForm() {
        reset();
        if (!options.zoomLevels) {
            options.zoomLevels = self_waveform.options.zoomLevels;
        }

        var webAudioOptions = options.webAudio;

        if (webAudioOptions.scale !== options.zoomLevels[0]) {
            webAudioOptions.scale = options.zoomLevels[0];
        }

        var webAudioBuilderOptions = {
            audio_buffer: webAudioOptions.audioBuffer,
            split_channels: webAudioOptions.multiChannel,
            scale: webAudioOptions.scale
        };

        // Generate waveform data by using WebAudioAPI, this method is async
        WaveformData.createFromAudio(webAudioBuilderOptions, function (err, waveformData) {
            if (err) {
                alert("An error has occurred during waveform generation, see console.");
                console.log(err);
                return;
            }
            self_waveform._waveformData = waveformData;
            [
                'overview',
                'zoomview'
            ].forEach(function (viewName) {
                var view = self_waveform.views.getView(viewName);
                if (view) {
                    view.setWaveformData(waveformData);
                }
            });
            self_waveform.zoom.setZoomLevels(options.zoomLevels);
            console.log("waveform updated");
            self.waveLoaded = true;
        });
    }
    updateWaveForm();
}

/**
 * Set the current head position of the waveform view
 * 
 * @param time offset in seconds
 */
Gramophone.prototype.setWaveFormHead = function (time) {
    if (!this.waveform) {
        throw new Error('WaveForm not initialized @ waveform.js, setWaveFormBuffer()');
    }
    this.waveform.views._overview._playheadLayer._syncPlayhead(time);
}

/**
 * Start the waveform at the selected offset
 * 
 * @param time offset in seconds
 */
Gramophone.prototype.startWaveForm = function (time) {
    if (!this.waveform) {
        throw new Error('WaveForm not initialized @ waveform.js, setWaveFormBuffer()');
    }
    console.log("enter start wave form " + this.waveLoaded);
    if (this.waveLoaded) {
        if (this.waveInterval != null) {
            this.stopWaveForm();
        }
        console.log("starting waveform");
        this.waveTime = time;

        this.setWaveFormHead(time);
        const self = this;
        this.waveInterval = setInterval(function () {
            // console.log("update time: " + self.waveTime);
            self.waveTime += 0.1 * self.playBackRate;
            if (self.playFinish) {
                self.stopWaveForm();
                return;
            }
            self.setWaveFormHead(self.waveTime);
        }, 100);
    }
}

Gramophone.prototype.stopWaveForm = function () {
    if (!this.waveform) {
        throw new Error('WaveForm not initialized @ waveform.js, setWaveFormBuffer()');
    }
    if (this.waveInterval != null) {
        console.log("stopping waveform");
        clearInterval(this.waveInterval);
        this.waveInterval = null;
    }
}
