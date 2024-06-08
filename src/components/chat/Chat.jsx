

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import './Chat.css'; // تأكد من أنك تنشئ وتستورد ملف CSS الخاص بك

// const SOCKET_SERVER_URL = "https://gp.softwave-dev.com";
// const API_URL = "https://gp.softwave-dev.com/api/v1/chats/myChats";
// const MESSAGES_URL = "https://gp.softwave-dev.com/api/v1/messages";

// const Chat = () => {
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const socketRef = useRef();
//   const token = localStorage.getItem("token"); // استبدل هذا برمز التحقق من الهوية الفعلي الخاص بك

//   useEffect(() => {
//     // جلب المحادثات من API مع رمز التحقق من الهوية
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setChats(response.data.data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       }
//     };

//     fetchChats();

//     // الاتصال بخادم Socket.io
//     socketRef.current = io(SOCKET_SERVER_URL, {
//       query: { token },
//     });

//     // الاستماع للرسائل الجديدة
//     socketRef.current.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [token]);

//   const fetchMessages = async (chatId) => {
//     try {
//       const response = await axios.get(`${MESSAGES_URL}/${chatId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log(response)
//       setMessages(response.data.data);
//       setSelectedChat(chatId);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const handleSendMessage = () => {
//     // إرسال رسالة جديدة إلى الخادم
//     if (selectedChat) {
//       socketRef.current.emit('message', { chatId: selectedChat, text: newMessage });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <h2>Chats</h2>
//         <div className="chat-list">
//           {chats.map((chat) => (
//             <div 
//               key={chat._id} 
//               className={`chat-item ${selectedChat === chat._id ? 'selected' : ''}`}
//               onClick={() => fetchMessages(chat._id)}
//             >
//               <h3>{chat.groupName}</h3>
//               <p>{chat.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="chat-main">
//         {selectedChat ? (
//           <>
//             <div className="chat-header">
//               <h2>Chat with {chats.find(chat => chat._id === selectedChat)?.groupName}</h2>
//             </div>
//             <div className="chat-messages">
//               {messages.map((msg, index) => (
//                 <div key={index} className="message">
//                   <p>{msg.text}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="message-input-container">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="message-input"
//                 placeholder="Type your message..."
//               />
//               <button onClick={handleSendMessage} className="send-button">Send</button>
//             </div>
//           </>
//         ) : (
//           <div className="no-chat-selected">Select a chat to start messaging</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './Chat.css'; // تأكد من أنك تنشئ وتستورد ملف CSS الخاص بك

const SOCKET_SERVER_URL = "https://gp.softwave-dev.com";
const API_URL = "https://gp.softwave-dev.com/api/v1/chats/myChats";
const MESSAGES_URL = "https://gp.softwave-dev.com/api/v1/messages";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();
  const token = localStorage.getItem("token"); // استبدل هذا برمز التحقق من الهوية الفعلي الخاص بك

  useEffect(() => {
    // جلب المحادثات من API مع رمز التحقق من الهوية
    const fetchChats = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    // الاتصال بخادم Socket.io
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { token },
    });

    // الاستماع للرسائل الجديدة
    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`${MESSAGES_URL}/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.data);
      setSelectedChat(chatId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedChat && newMessage.trim()) {
      try {
        // إرسال الرسالة الجديدة إلى API
        const response = await axios.post(`${MESSAGES_URL}/${selectedChat}`, {
          text: newMessage,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchMessages (selectedChat)
        // تحديث الرسائل بعد إرسال الرسالة الجديدة
        setMessages((prevMessages) => [...prevMessages, response.data.text]);
        setNewMessage('');
console.log(response.data.text)
        // إرسال الرسالة عبر Socket.io
        socketRef.current.emit('message', response.data.text);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Chats</h2>
        <div className="chat-list">
          {chats.map((chat) => (
            <div 
              key={chat._id} 
              className={`chat-item ${selectedChat === chat._id ? 'selected' : ''}`}
              onClick={() => fetchMessages(chat._id)}
            >
              <h3>{chat.groupName}</h3>
              <p>{chat.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h2>Chat with {chats.find(chat => chat._id === selectedChat)?.groupName}</h2>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage} className="send-button">Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
