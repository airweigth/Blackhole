// Multi-version Minecraft launcher engine
const { exec } = require('child_process');

class MinecraftLauncher {
    constructor() {
        this.versions = [];
    }

    addVersion(version) {
        this.versions.push(version);
    }

    launch(version) {
        exec(`java -jar Minecraft_${version}.jar`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error launching Minecraft ${version}: ${stderr}`);
                return;
            }
            console.log(`Minecraft ${version} is running`);
        });
    }
}

module.exports = MinecraftLauncher;