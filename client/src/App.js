import React, { useState } from "react";
import "./App.css";

async function login() {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "josy",
        password: "12345",
      }),
    });
    const result = await response.text();
    alert(result);
  } catch (error) {
    alert(error.message);
  }
}

function App() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordValue, setPasswordValue] = useState(null);

  async function fetchPassword(name) {
    try {
      const response = await fetch(`/api/passwords/${name}`);
      const result = await response.text();
      setPasswordValue(result);
    } catch (error) {
      setPasswordValue(error.message);
    }
  }
  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <label>
        Password-Name
        <input
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
        />
      </label>
      <button onClick={() => fetchPassword(passwordName)}>Get password</button>
      <span>{passwordValue}</span>
    </div>
  );
}

export default App;
