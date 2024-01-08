export default class Master {
    
    static master = null;

    static getMaster() {
        if (!this.master) this.master = new Master();
        return this.master;
    }

    constructor() {
        this.ctx = new AudioContext();
        this.vol = new GainNode(this.ctx, { gain: 0.2 });
        this.filters = {
            // The lowshelf filter allows all frequencies through, 
            // but adds a boost (or attenuation) to the lower frequencies.
            lsf: new BiquadFilterNode(this.ctx, {
                type: "lowshelf",
                frequency: 440,
                gain: 0
            }),
            // highshelf does the same but boosts/attenuates the higher frequencies instead
            hsf: new BiquadFilterNode(this.ctx, {
                type: "highshelf",
                frequency: 440,
                gain: 0
            })
        };
        // Mixer with 4 inputs
        this.mix = new GainNode(this.ctx);

        this.mix.connect(this.filters.hsf)
            .connect(this.filters.lsf)
            .connect(this.vol)
            .connect(this.ctx.destination);
    }

    receive(audioNode, channel=0) {
        // Connects the audio node to the Master's mix
        audioNode.connect(this.mix);
    }
}