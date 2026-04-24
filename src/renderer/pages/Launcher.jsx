import React, { useState } from 'react';
import '../styles/Launcher.css';

function Launcher({ versions, selectedVersion, onVersionChange, onLaunch, onRefresh }) {
  const [username, setUsername] = useState('Player');
  const [offlineMode, setOfflineMode] = useState(true);
  const [server, setServer] = useState('');
  const [ram, setRam] = useState(2048);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = async () => {
    if (!selectedVersion) {
      alert('Please select a version');
      return;
    }

    setIsLaunching(true);
    try {
      await onLaunch({
        username,
        offlineMode,
        server,
        ram
      });
    } catch (error) {
      console.error('Launch error:', error);
    } finally {
      setIsLaunching(false);
    }
  };

  const handleInstallVersion = async () => {
    try {
      const result = await window.electron.ipcRenderer.invoke('install-version', selectedVersion);
      if (result.success) {
        alert(`${result.message}`);
        onRefresh();
      } else {
        alert(`Installation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Installation error:', error);
      alert('Failed to install version');
    }
  };

  return (
    <div className="launcher-page">
      <div className="launcher-container">
        <div className="launcher-panel">
          <h2>Game Launch</h2>

          {/* Version Selection */}
          <div className="form-group">
            <label htmlFor="version">Minecraft Version</label>
            <select
              id="version"
              value={selectedVersion || ''}
              onChange={(e) => onVersionChange(e.target.value)}
              className="form-input"
            >
              <option value="">Select version...</option>
              {versions.map(v => (
                <option key={v.id} value={v.id}>
                  {v.id} {v.installed ? '✓' : '(Download)'}
                </option>
              ))}
            </select>
            <button onClick={handleInstallVersion} className="btn-install">
              Install Version
            </button>
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="form-input"
            />
          </div>

          {/* Mode Selection */}
          <div className="form-group">
            <label>Game Mode</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={offlineMode}
                  onChange={() => setOfflineMode(true)}
                />
                Offline (Cracked)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  checked={!offlineMode}
                  onChange={() => setOfflineMode(false)}
                />
                Online (Microsoft)
              </label>
            </div>
          </div>

          {/* Server */}
          <div className="form-group">
            <label htmlFor="server">Server Address (Optional)</label>
            <input
              id="server"
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              placeholder="e.g., mc.example.com"
              className="form-input"
            />
          </div>

          {/* RAM */}
          <div className="form-group">
            <label htmlFor="ram">RAM Allocation: {ram}MB</label>
            <input
              id="ram"
              type="range"
              min="512"
              max="8192"
              step="256"
              value={ram}
              onChange={(e) => setRam(parseInt(e.target.value))}
              className="form-slider"
            />
          </div>

          {/* Launch Button */}
          <button
            onClick={handleLaunch}
            disabled={isLaunching || !selectedVersion}
            className="btn-launch"
          >
            {isLaunching ? 'Launching...' : '▶ Launch Game'}
          </button>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <h2>Features</h2>
          <ul className="feature-list">
            <li>🎮 Multi-version support (1.8.9 - 1.21.x)</li>
            <li>🚀 Stalemate-FPS optimization</li>
            <li>🛡️ Offline/Online modes</li>
            <li>🎨 Custom skins & capes</li>
            <li>🎭 Emote system</li>
            <li>📦 Built-in mods</li>
          </ul>

          <h3>Quick Start</h3>
          <ol className="quick-start">
            <li>Select Minecraft version</li>
            <li>Enter your username</li>
            <li>Choose offline or online mode</li>
            <li>Adjust RAM if needed</li>
            <li>Click Launch Game</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Launcher;