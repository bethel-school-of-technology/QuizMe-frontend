import React from 'react';
import MusicOn from './audiotrack.svg'

export default class MusicButton extends React.Component {
    url = 'http://www/8-Bit-Surf.mp3';
    
    ctx = new window.AudioContext();
    buffer;
    sourceNode;
    
    startedAt;
    pausedAt;
    paused;
    
    load(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.ctx.decodeAudioData(request.response, this.onBufferLoad, this.onBufferError);
        };
        request.send();
    };
    
    play() {
        this.sourceNode = this.ctx.createBufferSource();
        this.sourceNode.connect(this.ctx.destination);
        this.sourceNode.buffer = this.buffer;
        this.paused = false;
    
        if (this.pausedAt) {
            this.startedAt = Date.now() - this.pausedAt;
            this.sourceNode.start(0, this.pausedAt / 1000);
        }
        else {
            this.startedAt = Date.now();
            this.sourceNode.start(0);
        }
    };
    
    stop() {
        this.sourceNode.stop(0);
        this.pausedAt = Date.now() - this.startedAt;
        this.paused = true;
    };
    
    onBufferLoad(b) {
        this.buffer = b;
        this.play();
    };
    
    onBufferError(e) {
        console.log('onBufferError', e);
    };
    
    toggle () {
        if (this.paused) this.play();
        else this.stop();
    };

    onClick() {
        if(this.buffer) {
            this.toggle();
        } else {
            this.load(this.url)
        }
    }

    render() {
        return (
            <div id="toggle" onClick={() => this.onClick()} style={{width: "20px", height: "20px", position: "absolute", top: 40}} className="is-primary">
                <img src={MusicOn}/>
            </div>)
    }

    constructor() {
        super();
        this.load = this.load.bind(this);
        this.onBufferError = this.onBufferError.bind(this);
        this.onBufferLoad = this.onBufferLoad.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.toggle = this.toggle.bind(this);
        
    }

    componentDidMount() {
    }
    

}

