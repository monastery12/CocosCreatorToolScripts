

var ParticleManager = {

    stopParticleByNode(particleNode){
        var myParticle = particleNode.getComponent(cc.ParticleSystem);
        if (myParticle.particleCount > 0) {                                 // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        }
    },

    playParticleByNode(){
        var myParticle = this.particle.getComponent(cc.ParticleSystem);
        if (myParticle.particleCount > 0) {                                 // check if particle has fully plaed

        } else {
            myParticle.resetSystem();                                       // restart particle system
        }
    },

    playParticleByParticle(particleSystem){
        if (particleSystem.particleCount > 0) {                             // check if particle has fully plaed

        } else {
            particleSystem.resetSystem();                                   // restart particle system
        }
    },

    stopParticleByParticle(particleSystem){
        if (particleSystem.particleCount > 0) {                             // check if particle has fully plaed
            particleSystem.stopSystem();                                    // stop particle system
        }
    },
};

module.exports = ParticleManager;