"use client"

import { useState } from "react";

      export default function Home() {
        const [moods, setMoods] = useState([]);
        const [selectedMood, setSelectedMood] = useState("");

        const handleAddMood = () => {
          const newMood = {
            mood: selectedMood,
            time: new Date().toLocaleTimeString(),
          };
          setMoods([...moods, newMood].sort((a, b) => new Date(a.time) - new Date(b.time)));
        };

        const getMoodColorClass = (mood) => {
          switch (mood) {
            case "Happy":
              return "text-yellow-500";
            case "Sad":
              return "text-blue-500";
            case "Angry":
              return "text-red-500";
            case "Neutral":
              return "text-gray-500";
            default:
              return "text-black";
          }
        };

        return (
          <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-purple-100 p-5 rounded-lg shadow-lg">
              <h1 className="text-black text-2xl mb-4">Mood Tracker</h1>

              <select
          className="text-black mb-4 p-2 border border-gray-300 rounded"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
              >
          <option className="text-black" value="">
            Select your mood
          </option>
          <option className="text-black" value="Happy">
            Happy
          </option>
          <option className="text-black" value="Sad">
            Sad
          </option>
          <option className="text-black" value="Angry">
            Angry
          </option>
          <option className="text-black" value="Neutral">
            Neutral
          </option>
              </select>

              <button
          className={`text-black bg-gray-200 p-2 rounded hover:bg-gray-300 ${getMoodColorClass(selectedMood)}`}
          onClick={handleAddMood}
              >
          Log Mood
              </button>

              <h2 className="text-black text-lg mt-4">Mood History</h2>

              {moods.map((mood, index) => (
          <div key={index} className="relative flex items-center">
            <li
              className={`p-2 mb-2 rounded-lg shadow-md ${getMoodColorClass(mood.mood)} hover:bg-opacity-75 flex-grow`}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => {
                const updatedMoods = [...moods];
                updatedMoods[index].showDescription = !updatedMoods[index].showDescription;
                setMoods(updatedMoods);
              }}
            >
              {mood.time} - {mood.mood}
            </li>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => {
                const updatedMoods = moods.filter((_, i) => i !== index);
                setMoods(updatedMoods);
              }}
            >
              Remove
            </button>
            {mood.showDescription && (
              <div className="absolute bg-white p-2 rounded shadow-lg mt-2">
                <textarea
            className="w-full p-2 border border-black-300 rounded text-black"
            placeholder="Write more about your emotions..."
            rows="3"
            onBlur={() => {
              const updatedMoods = [...moods];
              updatedMoods[index].showDescription = false;
              setMoods(updatedMoods);
            }}
            onChange={(e) => {
              const updatedMoods = [...moods];
              updatedMoods[index].description = e.target.value;
              setMoods(updatedMoods);
            }}
            value={mood.description || ""}
                />
              </div>
            )}
          </div>
              ))}

            </div>   
          </div>
        );
      }