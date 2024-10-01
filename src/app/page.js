'use client'; // Ensure this is enabled for Next.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './components/Sidebar';
import AlgorithmVisualizer from './components/Visualiser'; // Ensure the correct component name
import AlgorithmInfo from './components/AlgorithmInfo';

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [array, setArray] = useState([]);

  // Generate a random array when the component mounts
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>Sorting and Searching Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar Component */}
      <Sidebar setSelectedAlgorithm={setSelectedAlgorithm} />

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold mb-8">Sorting and Searching Visualizer</h1>
        
        {/* Algorithm Visualizer Component */}
        <AlgorithmVisualizer 
          selectedAlgorithm={selectedAlgorithm} 
          array={array} 
          setArray={setArray} 
        />
        
        {/* Algorithm Info Component */}
        <AlgorithmInfo algorithm={selectedAlgorithm} />
      </main>
    </div>
  );
}
