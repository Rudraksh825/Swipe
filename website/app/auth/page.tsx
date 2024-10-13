'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function AuthChoicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Image
        src="/logom.png"
        alt="Research Match Logo"
        width={100}
        height={100}
        className="mb-8"
      />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Research Match</h2>
        <div className="space-y-4">
          <Link href="/auth/signup" className="block w-full bg-blue-600 text-white font-bold py-2 px-4 rounded text-center hover:bg-blue-700 transition duration-300">
            Sign Up
          </Link>
          <Link href="/auth/signin" className="block w-full bg-green-600 text-white font-bold py-2 px-4 rounded text-center hover:bg-green-700 transition duration-300">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
