'use client'

import { useState, useRef, createRef } from 'react';
import Image from "next/image";
import TinderCard from 'react-tinder-card';
import researchMatchLogo from "/Users/manit/Manit Document/Programming/Swipe/swipe1.png";
import placeholderImage from "/Users/manit/Manit Document/Programming/Swipe/website/logom.png";
import connectIcon from "/Users/manit/Manit Document/Programming/Swipe/Green Tick Icon.png";
import passIcon from "/Users/manit/Manit Document/Programming/Swipe/Red Cross Image.webp";

// Function to generate random data
const generateRandomPerson = () => {
  const names = ['Alice', 'Bob', 'Carol', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabel', 'Jack'];
  const surnames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const educations = ['Ph.D.', 'M.Sc.', 'B.Sc.', 'M.A.', 'B.A.'];
  const professions = ['Researcher', 'Professor', 'Scientist', 'Engineer', 'Analyst'];
  const fields = ['Computer Science', 'Physics', 'Biology', 'Chemistry', 'Mathematics', 'Environmental Science', 'Psychology', 'Neuroscience', 'Astronomy', 'Geology'];
  const researchTopics = ['Artificial Intelligence', 'Quantum Computing', 'Climate Change', 'Gene Editing', 'Renewable Energy', 'Dark Matter', 'Neurodegenerative Diseases', 'Machine Learning', 'Sustainable Agriculture', 'Nanotechnology'];
  
  const randomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  return {
    name: `${randomElement(names)} ${randomElement(surnames)}`,
    age: Math.floor(Math.random() * (65 - 25) + 25),
    education: `${randomElement(educations)} in ${randomElement(fields)}`,
    profession: randomElement(professions),
    field: randomElement(fields),
    projects: Math.floor(Math.random() * 5) + 1,
    research: randomElement(researchTopics),
    bio: `Passionate about ${randomElement(fields)} with a focus on ${randomElement(researchTopics)}. Committed to advancing scientific knowledge and solving real-world problems.`
  };
};

const db = Array(10).fill(null).map(generateRandomPerson);

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
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useRef<any[]>([]);
  if (childRefs.current.length !== db.length) {
    childRefs.current = Array(db.length).fill(0).map((i) => childRefs.current[i] || createRef());
  }

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs.current[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs.current[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="mb-12 mt-8">
        <Image
          src={researchMatchLogo}
          alt="Research Match Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      
      <div className="relative w-80 h-[600px]">
        {db.map((character, index) =>
          <TinderCard
            ref={childRefs.current[index]}
            className="absolute"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-[600px]" style={{zIndex: db.length - index}}>
              <div className="relative w-full h-48">
                <Image
                  src={placeholderImage}
                  alt={character.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 h-[432px] overflow-y-auto">
                <h2 className="text-xl font-semibold">{character.name}, {character.age}</h2>
                <p className="text-gray-700"><strong>Education:</strong> {character.education}</p>
                <p className="text-gray-700"><strong>Profession:</strong> {character.profession}</p>
                <p className="text-gray-700"><strong>Field:</strong> {character.field}</p>
                <p className="text-gray-700"><strong>Projects:</strong> {character.projects} ongoing research projects</p>
                <p className="text-gray-700"><strong>Research:</strong> {character.research}</p>
                <p className="text-gray-600 mt-2"><strong>Bio:</strong> {character.bio}</p>
              </div>
            </div>
          </TinderCard>
        )}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-white rounded-full p-4 shadow-lg" onClick={() => swipe('left')}>
          <Image
            src={passIcon}
            alt="Pass"
            width={30}
            height={30}
          />
        </button>
        <button className="bg-white rounded-full p-4 shadow-lg" onClick={() => swipe('right')}>
          <Image
            src={connectIcon}
            alt="Connect"
            width={30}
            height={30}
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
    setUserData(data);
    console.log("User Data Saved: ", data);
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
