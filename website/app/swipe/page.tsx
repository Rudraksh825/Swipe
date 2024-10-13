'use client'

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import TinderCard from 'react-tinder-card';

// Update the Researcher interface
interface Researcher {
  Name: string;
  Age: number;
  Education: string;
  GitHub: string;
  Bio: string;
  Score: number;
}

function SwipePage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    // Fetch the data from data.json
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Filter researchers with score >= 7 and sort by score in descending order
        const filteredResearchers = data
          .filter((researcher: Researcher) => researcher.Score >= 7)
          .sort((a: Researcher, b: Researcher) => b.Score - a.Score);
        setResearchers(filteredResearchers);
        setCurrentIndex(filteredResearchers.length - 1);
        currentIndexRef.current = filteredResearchers.length - 1;
      });
  }, []);

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
    // Don't restore the card here
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex >= 0) {
      await swiped(dir, researchers[currentIndex].Name, currentIndex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="mb-12 mt-8">
        <Image
          src={"/swipe1.png"}
          alt="Research Match Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      
      <div className="relative w-80 h-[600px]">
        {researchers.map((researcher, index) => (
          <TinderCard
            className="absolute"
            key={researcher.Name}
            onSwipe={(dir) => swiped(dir, researcher.Name, index)}
            onCardLeftScreen={() => outOfFrame(researcher.Name, index)}
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-[600px]" style={{zIndex: researchers.length - index}}>
              <div className="relative w-full h-48">
                <Image
                  src={"/logom.png"}
                  alt={researcher.Name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 h-[432px] overflow-y-auto">
                <h2 className="text-xl font-semibold">{researcher.Name}, {researcher.Age}</h2>
                <p className="text-gray-700"><strong>Education:</strong> {researcher.Education}</p>
                <p className="text-gray-700"><strong>GitHub:</strong> {researcher.GitHub}</p>
                <p className="text-gray-600 mt-2"><strong>Bio:</strong> {researcher.Bio}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button 
          className="bg-white rounded-full p-4 shadow-lg" 
          onClick={() => swipe('left')}
          disabled={!canSwipe}
        >
          <Image
            src={"/Red Cross Image.webp"}
            alt="Pass"
            width={30}
            height={30}
          />
        </button>
        <button 
          className="bg-white rounded-full p-4 shadow-lg" 
          onClick={() => swipe('right')}
          disabled={!canSwipe}
        >
          <Image
            src={"/Green Tick Icon.png"}
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

export default SwipePage;
