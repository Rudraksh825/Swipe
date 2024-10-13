'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/swipe1.png"
            alt="Research Match Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Sign In to Research Match</h2>
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
