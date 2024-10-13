import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const resetAndGoToSwipe = () => {
    localStorage.removeItem('swipedResearchers');
    localStorage.removeItem('matches');
    localStorage.setItem('sessionReset', 'true');
    router.push('/swipe');
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('swipedResearchers');
    localStorage.removeItem('matches');
    localStorage.removeItem('sessionReset');
    router.push('/auth');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="w-full px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 ml-2">
            <button onClick={resetAndGoToSwipe} className="flex items-center">
              <Image src="/swipe1.png" alt="Logo" width={120} height={30} />
            </button>
          </div>
          <div className="flex-grow flex justify-center items-center space-x-6">
            <Link href="/swipe" className="py-3 px-4 text-lg font-medium text-white rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">Home</Link>
            <Link href="/chat" className="py-3 px-4 text-lg font-medium text-white rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">Chat</Link>
          </div>
          <div className="flex-shrink-0">
            <button onClick={signOut} className="py-3 px-4 text-lg font-medium text-white rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
