'use client'

import React, { useEffect, useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

// Update the Researcher interface
interface Researcher {
  Name: string;
  Score: number;
  Age?: number;
  Education?: string;
  GitHub?: string;
  Bio?: string;
}

export default function SwipePage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const currentIndexRef = useRef<number | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [swipedResearchers, setSwipedResearchers] = useState<Set<string>>(new Set());

  const childRefs = useRef<React.RefObject<any>[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [router]);

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        const sessionReset = localStorage.getItem('sessionReset');
        let swipedSet: Set<string>;
        
        if (sessionReset === 'true') {
          swipedSet = new Set();
          localStorage.removeItem('sessionReset');
          localStorage.removeItem('swipedResearchers');
        } else {
          const storedSwipedResearchers = localStorage.getItem('swipedResearchers');
          swipedSet = storedSwipedResearchers ? new Set(JSON.parse(storedSwipedResearchers)) : new Set();
        }
        
        setSwipedResearchers(swipedSet);
        
        const filteredResearchers = data
          .filter((researcher: Researcher) => researcher.Score >= 7 && !swipedSet.has(researcher.Name))
          .sort((a: Researcher, b: Researcher) => b.Score - a.Score);
        setResearchers(filteredResearchers);
        setCurrentIndex(filteredResearchers.length - 1);
        currentIndexRef.current = filteredResearchers.length - 1;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResearchers();
  }, []);

  useEffect(() => {
    childRefs.current = Array(researchers.length)
      .fill(0)
      .map((_, i) => childRefs.current[i] || React.createRef());
  }, [researchers]);

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(Array.from(matches)));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('swipedResearchers', JSON.stringify(Array.from(swipedResearchers)));
  }, [swipedResearchers]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex !== null && currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setSwipedResearchers(prev => new Set(prev).add(nameToDelete));
    if (direction === 'right') {
      setMatches(prev => [...prev, nameToDelete]);
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current !== null && currentIndexRef.current >= idx && childRefs.current[idx]?.current) {
      childRefs.current[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex !== null) {
      await childRefs.current[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Navbar />
      <div className="flex flex-col items-center justify-start flex-grow p-4 pt-8">
        <div className="relative w-80 h-[600px]">
          {researchers.map((researcher, index) => (
            <TinderCard
              ref={childRefs.current[index]}
              className="absolute"
              key={researcher.Name}
              onSwipe={(dir) => swiped(dir, researcher.Name, index)}
              onCardLeftScreen={() => outOfFrame(researcher.Name, index)}
              preventSwipe={['up', 'down']}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-[600px]" style={{zIndex: researchers.length - index}}>
                <div className="relative w-full h-48">
                  <Image
                    src="/logom.png"
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
        
        <div className="flex justify-center mt-4 space-x-4">
          <button 
            className="bg-white rounded-full p-4 shadow-lg" 
            onClick={() => swipe('left')}
            disabled={!canSwipe}
          >
            <Image
              src="/Red Cross Image.webp"
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
              src="/Green Tick Icon.png"
              alt="Connect"
              width={30}
              height={30}
            />
          </button>
        </div>
        
        {lastDirection && (
          <h2 className="mt-4 text-white">You swiped {lastDirection}</h2>
        )}
      </div>
    </div>
  );
}
