import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Person from './components/person';
import ChatMessageBubble from './components/chat-message';
import './App.css';

function App() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState({
    "Nathan Doe": [
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "Hey, how's it going?",
        "timestamp": "10:45 AM",
        "isOwnMessage": false
      },
      {
        "content": "im good, how are you?",
        "timestamp": "10:46 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "Great to hear! im just wrapping up some work.",
        "timestamp": "10:47 AM",
        "isOwnMessage": false
      },
      {
        "content": "Sounds good. What work are you doing?",
        "timestamp": "10:48 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "Just fixing up some bugs for a feature. its been a boring day!",
        "timestamp": "10:49 AM",
        "isOwnMessage": false
      },
      {
        "content": "I can imagine! Need any help with it?",
        "timestamp": "10:50 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "I appreciate the offer, but I think I’ve got it covered. Just looking forward to relaxing later.",
        "timestamp": "10:51 AM",
        "isOwnMessage": false
      },
      {
        "content": "Absolutely. Any plans for tonight?",
        "timestamp": "10:52 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "Yeah, I was thinking of catching the game. Are you watching it?",
        "timestamp": "10:53 AM",
        "isOwnMessage": false
      },
      {
        "content": "I might. What time is it on?",
        "timestamp": "10:54 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "It starts at 8 PM. We could watch it together if you’re up for it.",
        "timestamp": "10:55 AM",
        "isOwnMessage": false
      },
      {
        "content": "That sounds like a great idea! I’ll be free by then.",
        "timestamp": "10:56 AM",
        "isOwnMessage": true
      },
      {
        "profilePicture": getPfpFromName("Nathan Doe"),
        "content": "Awesome! Let’s plan on it. Looking forward to it!",
        "timestamp": "10:57 AM",
        "isOwnMessage": false
      },
      {
        "content": "Me too! I’ll text you when I’m ready.",
        "timestamp": "10:58 AM",
        "isOwnMessage": true
      }
    ],
    "Jane Doe": [
      { profilePicture: getPfpFromName("Jane Doe"), content: "Hello! There is a new intern named Rishaan, who wants to join, do you want to discuss the next steps?", timestamp: "11:00 AM", isOwnMessage: false },
    ],
    "Rajesh": [
      { profilePicture: getPfpFromName("Rajesh"), content: "Hey sir, I have finished the project you have assigned me", timestamp: "11:00 AM", isOwnMessage: false },
    ],
    "Aryan Kumar": [
      { profilePicture: getPfpFromName("Aryan Kumar"), content: "Hey, thanks for being a great employee and developer", timestamp: "11:00 AM", isOwnMessage: false },
    ]
    // Add messages for other people here
  });

  const [newMessage, setNewMessage] = useState("");
  function getPfpFromName(name){
    return `https://ui-avatars.com/api/?name=${name.split(' ').join("+")}&background=313338&color=dcdee1&rounded=false&bold=true&uppercase=true`
  }
  const handleSendMessage = () => {
    if (selectedPerson && newMessage.trim()) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedPerson]: [
          ...prevMessages[selectedPerson] || [],
          {
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwnMessage: true,
          },
        ],
      }));
      setNewMessage(""); // Clear the input field after sending the message
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedPerson]);

  const people = [
    { name: "Nathan Doe", isOnline: false, lastSeen: "7 mins ago" },
    { name: "Jane Doe", isOnline: true },
    { name: "Rajesh", isOnline: false, lastSeen: "2 mins ago" },
    { name: "Aryan Kumar", isOnline: true }
    // Add other people here
  ];

  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='main-chat-container'>
        <div className='sidebar'>
          <div className='search-bar'>
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <div className='list'>
            {filteredPeople.map(person => (
              <Person
                key={person.name}
                name={person.name}
                isOnline={person.isOnline}
                lastSeen={person.lastSeen}
                onClick={() => {
                  console.log(`Selecting ${person.name}`);
                  setSelectedPerson(person.name);
                }}
              />
            ))}
          </div>
        </div>
        <div className='main-content'>
          {selectedPerson ? (
            <>
              <div className='top-part'>
                <div className='main-chat-person'>
                  <div className='iconn'>
                    <img src={`https://ui-avatars.com/api/?name=${selectedPerson.split(' ').join('+')}&background=313338&color=dcdee1&rounded=false&bold=true&uppercase=true`} alt={selectedPerson}/>
                  </div>
                  <div className='text-part'>
                    <h1>{selectedPerson}</h1>
                    <h3>Last seen: 2 hours ago</h3>
                  </div>
                </div>
              </div>
              <hr />
              <div className='chat-messages'>
                {messages[selectedPerson]?.map((message, index) => (
                  <ChatMessageBubble
                    key={index}
                    profilePicture={message.profilePicture}
                    content={message.content}
                    timestamp={message.timestamp}
                    isOwnMessage={message.isOwnMessage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className='chat-bar'>
                <input
                  type='text'
                  className='chat-bar-input'
                  placeholder='Send a message...'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button onClick={handleSendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </>
          ) : (
            <div className='no-chat-selected'>
              <h2>Select a chat to start messaging</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
