import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import chat from "../images/chat-bubble-user-svgrepo-com.svg"
import axios from 'axios';


const Layout = () => {

  const [showChatbox, setShowChatbox] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChatbox = () => {
    setShowChatbox(prevState => !prevState);
  };

  const sendMessage = (message) => {
    axios.post('http://localhost:5001/predict/chat', {
        message
      })
      .then(res => {
        const response = res.data.answer;
        setMessages([...messages, {
          message,
          response
        }]);
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const message = formData.get('message');
    sendMessage(message);
    form.reset();
  };
  return (
    <div className='snow-bg'>
      <Header/>
      <button className='chatbot-toggle' onClick={toggleChatbox} style={{zIndex:'1000'}}>
        <img src={chat} />
      </button>
      { showChatbox && (
        <div className='chatbox' style={{zIndex:'1000'}}>
        <div className='header-chatbox' style={{ backgroundColor: '#724ae8', padding:'16px 0px', textAlign:'center', color:'#fff'}}>
          <h6>CHAT BOT</h6>
        </div>
        <ul className='chatbox2' style={{
          height: '510px',
          overflowY: 'auto',
          padding: '15px 20px 70px',
          backgroundColor:'#fff'
        }}>
        {
          messages.map((msg, index)=>(
            <>
              <li className = 'chat outgoing' >
                <p>{msg.message}</p>
              </li>
              <li className = 'chat incoming' >
                <div dangerouslySetInnerHTML={{ __html: msg.response }}></div>
              </li>
            </>
          ))
        }
        </ul>
        <form onSubmit={handleSubmit} className='chat-input'>
          <textarea placeholder='Enter a message ...' name='message' required/>
          <button type='submit'>Send</button>
        </form>
      </div>
      )}
      
      <Outlet />
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose = {5000}
        hideProgressBar = {false}
        newestOnTop = {false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default Layout;
