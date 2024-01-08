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

    playSound(time=0) {
        const enveloppe = {
            aTime: 0,
            dTime: 0.1,
            sTime: 0.1,
            rTime: 0.4,
        }
        
        const soundStartTime = this.master.ctx.currentTime + time;
        
        // time is in seconds
        this.env.gain.cancelScheduledValues(soundStartTime);
        this.env.gain.setValueAtTime(0, soundStartTime);
        // attack
        this.env.gain.linearRampToValueAtTime(1, soundStartTime + enveloppe.aTime);
        // decay
        this.env.gain.linearRampToValueAtTime(0.6, soundStartTime + enveloppe.aTime + enveloppe.dTime);
        // sustain
        this.env.gain.linearRampToValueAtTime(0.5, soundStartTime + enveloppe.aTime + enveloppe.dTime + enveloppe.sTime);
        // release 
        this.env.gain.linearRampToValueAtTime(0, soundStartTime + enveloppe.aTime + enveloppe.dTime + enveloppe.sTime + enveloppe.rTime);
    }
}
