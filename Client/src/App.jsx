import React from "react";
import io from "socket.io-client"

const socket = io("http://localhost:5000")
const App = () => {
  return (
    <div className=" font-bold flex justify-center p-5 border border-l-2 border-separate ">
      App
    </div>
  );
};

export default App;
