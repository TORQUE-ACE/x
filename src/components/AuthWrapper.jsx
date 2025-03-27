import React, { useState } from "react";
import "../styles/global.css"; // Assuming this is your custom CSS file

export default function AuthWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [droneId, setDroneId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState("");

  const handleLogin = () => setIsAuthenticated(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the provided credentials match the expected ones
    if (droneId === "DX-100" && userId === "ADMIN" && password === "ADMIN") {
      setIsAuthenticated(true);
      console.log("Login successful.");
      handleLogin(); // Notify to change to authenticated state
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const executeCommand = () => {
    if (input.trim() === "") return;

    let newOutput = "";

    if (input.trim() === "drone-1") {
      newOutput = "🛸 Drone-1: Activated and Ready for Commands!";
    } else if (input.trim() === "clear") {
      setCommands([]);
      localStorage.removeItem("terminalLogs");
      setInput("");
      return;
    } else {
      newOutput = `Command not found: ${input}`;
    }

    const newCommand = { command: input, output: newOutput };
    const updatedCommands = [newCommand, ...commands];
    setCommands(updatedCommands);
    localStorage.setItem("terminalLogs", JSON.stringify(updatedCommands));
    setInput("");
  };

  const handleCommand = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand();
    }
  };

  return isAuthenticated ? (
    <div className="auth-wrapper">
      <div className="sidebar">
        <h1>DRONE CONTROL</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="map-container">
          <div id="map" style={{ height: "100%" }}></div>
        </div>

        <div className="terminal-container">
          <div className="terminal-output">
            {commands.map((cmd, index) => (
              <div key={index}>
                <span className="prompt">user@drone-control:~$</span> {cmd.command}
                <div>{cmd.output}</div>
              </div>
            ))}
          </div>

          <div className="terminal-input-container">
            <span className="prompt">user@drone-control:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="terminal-input"
              autoFocus
            />
            <button className="go-button" onClick={executeCommand}>GO</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Drone ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Drone ID"
              value={droneId}
              onChange={(e) => setDroneId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
