'use client'
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './app.css';

function App() {
    const [memoryCards, setMemoryCards] = useState(SAMPLE_MEMORY_CARDS);
    const [newMemory, setNewMemory] = useState({ photo: '', message: '', audio: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMemory({ ...newMemory, [name]: value });
    };

    const handleAddMemory = () => {
        setMemoryCards([...memoryCards, { ...newMemory, id: memoryCards.length + 1 }]);
        setNewMemory({ photo: '', message: '', audio: '' });
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => console.log('Swiped left'),
        onSwipedRight: () => console.log('Swiped right'),
    });

    return (
        <div className="container">
            <div className="form">
                <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={newMemory.photo}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={newMemory.message}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="audio"
                    placeholder="Audio URL"
                    value={newMemory.audio}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddMemory}>Add Memory</button>
            </div>
            <div className="memory-cards" {...handlers}>
                {memoryCards.map((card) => (
                    <div key={card.id} className="memory-card">
                        {card.photo && <img src={card.photo} alt="Memory" />}
                        {card.message && <p>{card.message}</p>}
                        {card.audio && <audio controls src={card.audio}></audio>}
                    </div>
                ))}
            </div>
        </div>
    );
}

const SAMPLE_MEMORY_CARDS = [
    {
        id: 1,
        photo: 'https://via.placeholder.com/150',
        message: 'This is a cherished memory.',
        audio: '',
    },
    {
        id: 2,
        photo: '',
        message: 'Another cherished memory.',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
];

export default App;