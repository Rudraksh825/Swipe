'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Image
        src="/logom.png"
        alt="Research Match Logo"
        width={200}
        height={200}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-white mb-4">Research Match</h1>
      <p className="text-xl text-white mb-8 text-center">
        Connect with researchers and collaborate on groundbreaking projects
      </p>
      <Link href="/auth" className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300">
        Get Started
      </Link>
    </div>
  );
}
