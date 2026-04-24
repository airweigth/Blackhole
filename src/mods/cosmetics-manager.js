// Cosmetics system managing skins and capes
class CosmeticsManager {
    constructor() {
        this.cosmetics = {};
    }

    addCosmetic(type, data) {
        this.cosmetics[type] = data;
    }
}

module.exports = CosmeticsManager;