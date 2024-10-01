import { useState } from 'react';
import { Menu, ChevronLeft, ArrowUpCircle, ArrowDownCircle, Search, Layers } from 'lucide-react';

const algorithms = {
  sorting: [
    { name: 'Bubble Sort', value: 'bubbleSort', icon: <ArrowUpCircle size={16} /> },
    { name: 'Quick Sort', value: 'quickSort', icon: <ArrowDownCircle size={16} /> },
    { name: 'Merge Sort', value: 'mergeSort', icon: <Layers size={16} /> },
    { name: 'Insertion Sort', value: 'insertionSort', icon: <ArrowUpCircle size={16} /> },
    { name: 'Selection Sort', value: 'selectionSort', icon: <ArrowDownCircle size={16} /> },
    { name: 'Heap Sort', value: 'heapSort', icon: <Layers size={16} /> },
    { name: 'Radix Sort', value: 'radixSort', icon: <ArrowUpCircle size={16} /> },
  ],
  searching: [
    { name: 'Linear Search', value: 'linearSearch', icon: <Search size={16} /> },
    { name: 'Binary Search', value: 'binarySearch', icon: <Search size={16} /> },
  ],
};

export default function Sidebar({ setSelectedAlgorithm }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-indigo-800 text-white shadow-lg ${isOpen ? 'w-64' : 'w-16'} transition-all duration-500 ease-in-out flex flex-col h-full`}>
      <button
        className="p-4 w-full text-left hover:bg-indigo-700 flex items-center rounded-md transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`${isOpen ? 'block' : 'hidden'} flex-1 overflow-y-auto p-2`}>
        <div className="mb-4">
          <h2 className="px-4 py-2 text-sm font-semibold text-indigo-300">Sorting Algorithms</h2>
          <ul>
            {algorithms.sorting.map((algo) => (
              <li
                key={algo.value}
                className="flex items-center p-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                onClick={() => setSelectedAlgorithm(algo.value)}
              >
                {isOpen && <span className="mr-2 text-indigo-200">{algo.icon}</span>}
                <span className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>{algo.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="px-4 py-2 text-sm font-semibold text-indigo-300">Searching Algorithms</h2>
          <ul>
            {algorithms.searching.map((algo) => (
              <li
                key={algo.value}
                className="flex items-center p-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                onClick={() => setSelectedAlgorithm(algo.value)}
              >
                {isOpen && <span className="mr-2 text-indigo-200">{algo.icon}</span>}
                <span className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>{algo.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
