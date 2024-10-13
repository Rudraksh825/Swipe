'use client'

import { useState } from 'react';
import Image from "next/image";
import TinderCard from 'react-tinder-card';

// Example database of researchers
const db = [
  {
    name: 'Dr. Alice Johnson',
    age: 35,
    bio: 'Quantum Physics Researcher'
  },
  {
    name: 'Prof. Bob Smith',
    age: 42,
    bio: 'Marine Biology Expert'
  },
  {
    name: 'Dr. Carol Williams',
    age: 38,
    bio: 'AI and Machine Learning Specialist'
  },
  {
    name: 'Dr. David Brown',
    age: 45,
    bio: 'Climate Change Researcher'
  },
  {
    name: 'Prof. Emily Davis',
    age: 40,
    bio: 'Neuroscience Pioneer'
  }
]

// Info Form Page Component
function InfoFormPage({ onSubmit }: { onSubmit: (userData: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    github: '',
    age: '',
    bio: '' // Add the bio field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData); // Debugging to ensure form submission
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">Enter Your Information</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Education:</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub Profile:</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Short Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Write a short bio about yourself..."
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Submit</button>
      </form>
    </div>
  );
}

// Swipe Page Component
function SwipePage() {
  const [lastDirection, setLastDirection] = useState<string | undefined>();

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">Research Match</h1>
      
      <div className="relative w-full max-w-sm h-[70vh] max-h-[600px]">
        {db.map((character, index) =>
          <TinderCard 
            className="absolute left-0 right-0 mx-auto" 
            key={character.name}
            onSwipe={(dir: string) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-full" style={{zIndex: db.length - index}}>
              <div className="relative w-full h-4/5">
                <Image
                  src="/logom.png"
                  alt={character.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="p-4 h-1/5">
                <h2 className="text-xl font-semibold">{character.name}, {character.age}</h2>
                <p className="text-gray-600 text-sm">{character.bio}</p>
              </div>
            </div>
          </TinderCard>
        )}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-white rounded-full p-4 shadow-lg" onClick={() => swiped('left', 'manual swipe')}>
          <Image
            src="/icons/close.svg"
            alt="Pass"
            width={30}
            height={30}
            className="text-red-500"
          />
        </button>
        <button className="bg-white rounded-full p-4 shadow-lg" onClick={() => swiped('right', 'manual swipe')}>
          <Image
            src="/icons/heart.svg"
            alt="Connect"
            width={30}
            height={30}
            className="text-green-500"
          />
        </button>
      </div>
      
      {lastDirection && (
        <div className="mt-8 text-white text-xl">
          You {lastDirection === 'right' ? 'connected with' : 'passed on'} the last profile
        </div>
      )}
    </div>
  );
}

// Main Component to switch between the two pages
export default function MainApp() {
  const [userData, setUserData] = useState<any | null>(null);

  const handleFormSubmit = (data: any) => {
    setUserData(data); // Save user data and move to the swipe page
    console.log("User Data Saved: ", data); // Debugging user data save
  };

  return (
    <>
      {!userData ? (
        <InfoFormPage onSubmit={handleFormSubmit} />
      ) : (
        <SwipePage />
      )}
    </>
  );
}
