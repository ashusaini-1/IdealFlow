import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./taskCompo/login/Login";
import Signup from "./taskCompo/Signup/Signup";

import { auth } from "./taskCompo/firerbase";

import "./App.css";
import Task from "./taskCompo/task";
import Name from "./taskCompo/Name"

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
      <Name/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
          <Route path="/" element={<Signup />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
