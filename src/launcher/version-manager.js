// Version management system for Minecraft
class VersionManager {
    constructor() {
        this.versions = [];
    }

    addVersion(version) {
        this.versions.push(version);
    }

    getAllVersions() {
        return this.versions;
    }
}

module.exports = VersionManager;