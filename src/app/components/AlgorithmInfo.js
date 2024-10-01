import React from 'react';

// components/AlgorithmInfo.js

export default function AlgorithmInfo({ algorithm }) {
  const algorithmDetails = {
    bubbleSort: {
      name: 'Bubble Sort',
      description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.",
      timeComplexity: {
        best: "O(n)",
        average: "O(n^2)",
        worst: "O(n^2)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) { 
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
      `
    },
    quickSort: {
      name: 'Quick Sort',
      description: "Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n^2)"
      },
      spaceComplexity: {
        best: "O(log n)",
        average: "O(log n)",
        worst: "O(log n)"
      },
      code: `
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
      `
    },
    mergeSort: {
      name: 'Merge Sort',
      description: "Merge Sort is an efficient, stable, divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)"
      },
      spaceComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)"
      },
      code: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
      `
    },
    linearSearch: {
      name: 'Linear Search',
      description: "Linear Search is the simplest search algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.",
      timeComplexity: {
        best: "O(1)",
        average: "O(n)",
        worst: "O(n)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
      `
    },
    binarySearch: {
      name: 'Binary Search',
      description: "Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
      timeComplexity: {
        best: "O(1)",
        average: "O(log n)",
        worst: "O(log n)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
      `
    },
    selectionSort: {
      name: 'Selection Sort',
      description: "Selection Sort is a comparison sorting algorithm. It divides the input list into two parts: the sorted part at the front and the unsorted part at the back, and repeatedly selects the smallest (or largest) element from the unsorted part to move it to the sorted part.",
      timeComplexity: {
        best: "O(n^2)",
        average: "O(n^2)",
        worst: "O(n^2)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
      `
    },
    insertionSort: {
      name: 'Insertion Sort',
      description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      timeComplexity: {
        best: "O(n)",
        average: "O(n^2)",
        worst: "O(n^2)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
      `
    },
    heapSort: {
      name: 'Heap Sort',
      description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It is an in-place sorting algorithm with a time complexity of O(n log n).",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)"
      },
      spaceComplexity: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)"
      },
      code: `
function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
      `
    },
    radixSort: {
      name: 'Radix Sort',
      description: "Radix Sort is a non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It works by distributing numbers into buckets according to their digits and then collecting them.",
      timeComplexity: {
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)"
      },
      spaceComplexity: {
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)"
      },
      code: `
function radixSort(arr) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
  return arr;
}

function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    count[Math.floor((arr[i] / exp) % 10)]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
    count[Math.floor((arr[i] / exp) % 10)]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
      `
    }
  };

  const { name, description, timeComplexity, spaceComplexity, code } = algorithmDetails[algorithm] || {};
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="mb-4">{description}</p>
      <div className="flex justify-center mt-8">
  <table className="w-full max-w-3xl border border-gray-300 border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 border border-gray-300 text-left">Time Complexity</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Space Complexity</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2"><strong>Best:</strong> {timeComplexity?.best}</td>
        <td className="border border-gray-300 px-4 py-2"><strong>Best:</strong> {spaceComplexity?.best}</td>
      </tr>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2"><strong>Average:</strong> {timeComplexity?.average}</td>
        <td className="border border-gray-300 px-4 py-2"><strong>Average:</strong> {spaceComplexity?.average}</td>
      </tr>
      <tr className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2"><strong>Worst:</strong> {timeComplexity?.worst}</td>
        <td className="border border-gray-300 px-4 py-2"><strong>Worst:</strong> {spaceComplexity?.worst}</td>
      </tr>
    </tbody>
  </table>
</div>


      <h3 className="text-xl font-semibold mb-2">Implementation:</h3>
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
