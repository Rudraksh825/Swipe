'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate the input and send a request to your backend
        localStorage.setItem('isAuthenticated', 'true');
        
        if (isSignUp) {
            // If signing up, go to user-info page to complete profile
            router.push('/user-info');
        } else {
            // If signing in, go directly to swipe page
            router.push('/swipe');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="mb-12">
                <Image src="/swipe1.png" alt="Swipe Logo" width={200} height={50} />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-500 ml-2 hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}
