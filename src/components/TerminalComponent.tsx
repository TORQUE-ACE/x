import { useState, useEffect } from "react";
import "../styles/terminal.css";

const TerminalComponent = () => {
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState("");

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("terminalLogs");
    if (savedLogs) {
      setCommands(JSON.parse(savedLogs));
    }
  }, []);

  // Scroll terminal output automatically
  useEffect(() => {
    const terminalOutput = document.querySelector(".terminal-output");
    if (terminalOutput) {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }, [commands]);

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

    // Save command history
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

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {commands.map((cmd, index) => (
          <div key={index}>
            <span className="prompt">user@drone-control:~$</span> {cmd.command}
            <div className="output">{cmd.output}</div>
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
  );
};

export default TerminalComponent;
