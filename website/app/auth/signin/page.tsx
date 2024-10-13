'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the sign-in logic
        // After successful sign-in, redirect directly to the swipe page
        router.push('/swipe');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="w-full max-w-md fixed top-8 left-1/2 transform -translate-x-1/2">
                <Image
                    src="/swipe1.png"
                    alt="Swipe Logo"
                    width={200}
                    height={50}
                    className="mx-auto"
                />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16"> {/* Added margin-top here */}
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-6 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center"> {/* Adjust margin here if needed */}
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
