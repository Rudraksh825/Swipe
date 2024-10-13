'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <Image src="/swipe1.png" alt="Swipe Logo" width={200} height={50} className="mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Swipe</h1>
        <p className="text-xl text-white mb-8">Connect with researchers and innovators</p>
        <Link href="/auth" className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
}
