import Master from "./Master.js";

export default class Track {
    constructor(channel=0) {
        this.master = Master.getMaster();
        // instrument
        this.ins = new OscillatorNode(this.master.ctx, {
            type: "square",
            frequency: 440,
        });
        // enveloppe
        this.env = new GainNode(this.master.ctx, { gain: 0 });
        // panner
        this.pan = new PannerNode(this.master.ctx);
        // volume
        this.vol = new GainNode(this.master.ctx);
        
        this.ins.connect(this.env)
            .connect(this.pan)
            .connect(this.vol);
        this.master.receive(this.vol, channel);

        this.ins.start();
    }

    playSound(time=1) {
        const attackTime = 0;
        const releaseTime = 1.5;
        const soundStartTime = this.master.ctx.currentTime + time;
        
        // time is in seconds
        this.env.gain.cancelScheduledValues(soundStartTime);
        this.env.gain.setValueAtTime(0, soundStartTime);
        this.env.gain.linearRampToValueAtTime(1, soundStartTime + attackTime);
        this.env.gain.linearRampToValueAtTime(0, soundStartTime + releaseTime);
    }
}