'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserInfoPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    education: '',
    profession: '',
    field: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the user info to your backend
    console.log('User info submitted:', userInfo);
    // Then redirect to the swipe page
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={userInfo.age}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="education"
            placeholder="Education"
            value={userInfo.education}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={userInfo.profession}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="field"
            placeholder="Field of Study"
            value={userInfo.field}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={userInfo.bio}
            onChange={handleChange}
            className="w-full p-2 mb-6 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
