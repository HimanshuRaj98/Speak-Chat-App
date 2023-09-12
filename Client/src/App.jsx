import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [userName, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  useEffect(() => {
    socket.on("group-message", (message) => {
      console.log(message);

      setMessages([...messages, message]);
    });
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      message: newMessages,
      user: userName,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    !newMessages == ""
      ? socket.emit("send-message", messageData)
      : alert("Message Can`t Be Empty");

    setNewMessages("");
  };
  return (
    <>
      <div className=" w-screen h-screen bg-slate-300 flex justify-center items-center">
        {chatActive ? (
          <div className=" rounded-md p-2 w-full md:w-[80vw] lg:w-[40vw] mx-auto">
            <h1 className=" text-2xl font-bold text-center uppercase">
              Speak-Chat-App
            </h1>
            <div>
              <div className="sm:overflow-y-scroll lg:overflow-y-scroll h-[80vh] lg:h-[60vh]">
                {messages.length > 0 ? (
                  messages.map((message, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex rounded-md shadow-md my-5 w-fit ${
                          userName === message.user && "ml-auto"
                        }`}
                      >
                        <div className="bg-green-500">
                          <h3 className="font-bold text-lg px-2">
                            {message.user.charAt(0).toUpperCase()}
                          </h3>
                          <div className="px-2 bg-white rounded-md">
                            <span className="text-sm">{message.user}</span>
                            <h3 className="font-bold">{message.message}</h3>
                            <h3 className="text-xs text-right">
                              {message.time}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No messages to display.</p>
                )}
              </div>

              <form
                className=" justify-between flex md:gap-4 "
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name=""
                  placeholder="Type Your Message"
                  id=""
                  value={newMessages}
                  className=" rounded-md border-2 outline-none px-3 py-2"
                  onChange={(e) => setNewMessages(e.target.value)}
                />
                <button
                  type="submit"
                  className=" bg-green-600 text-white px-3 py-2 rounded-md font-bold "
                  onClick={() => !userName == "" && setChatActive(true)}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="">
            {" "}
            Enter Username :
            <input
              type="text"
              name=""
              id=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className=" py-2 px-3 outline-1 rounded-md text-center border-2 "
            />
            <button
              type="submit"
              className=" bg-green-600 text-white px-3 py-2 rounded-md font-bold "
              onClick={() => !userName == "" && setChatActive(true)}
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

// return (
//   <div
//     key={index}
//     className=" flex rounded-md shadow-md my-5 w-fit"
//   >
//     <div className=" bg-green-500">
//       <h3 className=" font-bold text-lg px-2">
//         {message.user.charAt(0).toUpperCase()}
//       </h3>
//       <div className=" px-2 bg-white rounded-md">
//         <span className=" text-sm">{message.user}</span>
//         <h3 className=" font-bold">{message.message}</h3>
//         <h3 className=" text-xs text-right">
//           {message.time}
//         </h3>
//       </div>
//     </div>
//   </div>
// );
