import { useState, useEffect, useRef } from "react";

export default function AlgorithmVisualizer({ selectedAlgorithm }) {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState(selectedAlgorithm || "bubbleSort"); // Use prop value or default
  const [visualSteps, setVisualSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [searchElement, setSearchElement] = useState("");
  const [foundIndex, setFoundIndex] = useState(-1);

  const animationRef = useRef(null);

  useEffect(() => {
    generateRandomArray();
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setVisualSteps([]);
    setCurrentStep(0);
    setIsRunning(false);
    setFoundIndex(-1);
    setAlgorithm(selectedAlgorithm); // Update algorithm when prop changes
    if (selectedAlgorithm === "binarySearch") {
      setArray((prevArray) => [...prevArray].sort((a, b) => a - b));
    }
  }, [selectedAlgorithm]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setVisualSteps([newArray.slice()]);
    setCurrentStep(0);
    setFoundIndex(-1);
  };

  const startVisualization = async () => {
    if (isRunning) {
      setIsRunning(false);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      return;
    }

    if (
      ["linearSearch", "binarySearch"].includes(algorithm) &&
      searchElement === ""
    ) {
      alert("Please enter a search element.");
      return;
    }

    let steps = [];
    let searchResult = -1;
    const arrayCopy = [...array];

    try {
      // Calculate steps based on algorithm
      switch (algorithm) {
        case "bubbleSort":
          steps = bubbleSort(arrayCopy);
          break;
        case "quickSort":
          steps = quickSort(arrayCopy);
          break;
        case "mergeSort":
          steps = mergeSort(arrayCopy);
          break;
        case "insertionSort":
          steps = insertionSort(arrayCopy);
          break;
        case "selectionSort":
          steps = selectionSort(arrayCopy);
          break;
        case "heapSort":
          steps = heapSort(arrayCopy);
          break;
        case "radixSort":
          steps = radixSort(arrayCopy);
          break;
        case "linearSearch":
        case "binarySearch":
          const element = Number(searchElement);
          if (isNaN(element)) {
            alert("Please enter a valid number for search.");
            return;
          }
          const result =
            algorithm === "linearSearch"
              ? linearSearch(arrayCopy, element)
              : binarySearch(arrayCopy, element);
          steps = result.steps;
          searchResult = result.foundIndex;
          break;
        default:
          steps = [];
      }

      setVisualSteps(steps);
      setFoundIndex(searchResult);
      setIsRunning(true);

      // Animation loop
      let stepIndex = 0;
      const animate = () => {
        if (stepIndex < steps.length) {
          setCurrentStep(stepIndex);
          setArray(steps[stepIndex]);
          stepIndex++;
          animationRef.current = setTimeout(animate, speed); // Use the latest speed
        } else {
          // After sorting is done, wait for 1 second and then animate coloring the array green from left to right
          setTimeout(() => {
            let colorIndex = 0;
            const colorAnimate = () => {
              if (colorIndex < array.length) {
                setCurrentStep(array.length + colorIndex);
                colorIndex++;
                animationRef.current = setTimeout(colorAnimate, speed);
              } else {
                setIsRunning(false);
              }
            };
            colorAnimate();
          }, 1000);
        }
      };

      animate();
    } catch (error) {
      console.error("Visualization error:", error);
      setIsRunning(false);
    }
  };

  // Sorting Algorithms
  const bubbleSort = (arr) => {
    const steps = [arr.slice()];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push(arr.slice());
        }
      }
    }
    return steps;
  };

  const quickSort = (
    arr,
    low = 0,
    high = arr.length - 1,
    steps = [arr.slice()]
  ) => {
    if (low < high) {
      const pi = partition(arr, low, high, steps);
      quickSort(arr, low, pi - 1, steps);
      quickSort(arr, pi + 1, high, steps);
    }
    return steps;
  };

  const partition = (arr, low, high, steps) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push(arr.slice());
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push(arr.slice());
    return i + 1;
  };

  const mergeSort = (arr) => {
    const steps = [arr.slice()];
    const aux = arr.slice();
    mergeSortHelper(arr, 0, arr.length - 1, aux, steps);
    return steps;
  };

  const mergeSortHelper = (arr, low, high, aux, steps) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      mergeSortHelper(aux, low, mid, arr, steps);
      mergeSortHelper(aux, mid + 1, high, arr, steps);
      merge(arr, low, mid, high, aux, steps);
    }
  };

  const merge = (arr, low, mid, high, aux, steps) => {
    let i = low,
      j = mid + 1,
      k = low;
    while (i <= mid && j <= high) {
      if (aux[i] <= aux[j]) {
        arr[k++] = aux[i++];
      } else {
        arr[k++] = aux[j++];
      }
      steps.push(arr.slice());
    }
    while (i <= mid) {
      arr[k++] = aux[i++];
      steps.push(arr.slice());
    }
    while (j <= high) {
      arr[k++] = aux[j++];
      steps.push(arr.slice());
    }
  };

  const insertionSort = (arr) => {
    const steps = [arr.slice()];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        steps.push(arr.slice());
      }
      arr[j + 1] = key;
      steps.push(arr.slice());
    }
    return steps;
  };

  const selectionSort = (arr) => {
    const steps = [arr.slice()];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        steps.push(arr.slice());
      }
    }
    return steps;
  };

  // Heap Sort
  const heapSort = (arr) => {
    const steps = [arr.slice()];
    const n = arr.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, steps);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      steps.push(arr.slice());
      heapify(arr, i, 0, steps);
    }

    return steps;
  };

  const heapify = (arr, n, i, steps) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push(arr.slice());
      heapify(arr, n, largest, steps);
    }
  };

  // Radix Sort
  const radixSort = (arr) => {
    const steps = [arr.slice()];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp, steps);
    }

    return steps;
  };

  const countingSort = (arr, exp, steps) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
      count[Math.floor((arr[i] / exp) % 10)]++;
    }

    // Change count[i] so that it now contains the actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
      count[Math.floor((arr[i] / exp) % 10)]--;
    }

    // Copy the output array to arr[]
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    steps.push(arr.slice());
  };

  // Update search algorithms to show visualization steps
  const linearSearch = (arr, target) => {
    const steps = [arr.slice()];
    for (let i = 0; i < arr.length; i++) {
      const stepArray = arr.slice();
      if (arr[i] === target) {
        return { steps: [...steps, stepArray], foundIndex: i };
      }
      steps.push(stepArray);
    }
    return { steps, foundIndex: -1 };
  };

  const binarySearch = (arr, target) => {
    const steps = [];
    const sortedArr = [...arr].sort((a, b) => a - b);
    steps.push(sortedArr.slice());

    let left = 0,
      right = sortedArr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const stepArray = sortedArr.slice();
      steps.push(stepArray);

      if (sortedArr[mid] === target) {
        return { steps: [...steps, stepArray], foundIndex: mid };
      }
      if (sortedArr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return { steps, foundIndex: -1 };
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex-grow">
      <h1 className="text-2xl font-bold mb-4">Algorithm Visualizer</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={generateRandomArray}
          disabled={isRunning}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          Generate Random Array
        </button>
        <button
          onClick={startVisualization}
          className={`${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded transition-colors`}
        >
          {isRunning ? "Stop" : "Start"} Visualization
        </button>

        <div className="flex items-center gap-2">
          <span>Slow</span>
          <input
            type="range"
            min="50"
            max="1000"
            value={1050 - speed}
            onChange={(e) => setSpeed(1050 - Number(e.target.value))}
            className="w-32"
          />
          <span>Fast</span>
        </div>
      </div>

      {/* Render search element input when a search algorithm is selected */}
      {["linearSearch", "binarySearch"].includes(algorithm) && (
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter search element"
            value={searchElement}
            onChange={(e) => setSearchElement(e.target.value)}
            className="border p-2 rounded w-full max-w-xs"
          />
          {foundIndex !== -1 && (
            <p className="mt-2 text-green-600">
              Element found at index: {foundIndex}
            </p>
          )}
        </div>
      )}

      <div className="border rounded-lg p-4 bg-white shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Visualization</h3>
        <div className="flex justify-center items-end h-64 bg-gray-100 p-4">
          {array.map((value, index) => (
            <div
              key={index}
              style={{
                height: `${(value / 100) * 100}%`, // Keep it as a percentage to fit within the container
                width: "30px", // Make the bars wider
              }}
              className={`mx-1 transition-all duration-300 flex flex-col justify-end relative ${
                index === currentStep
                  ? "bg-red-500"
                  : foundIndex === index
                  ? "bg-green-500"
                  : currentStep > array.length && index <= currentStep - array.length
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              <span className="absolute bottom-0 left-0 right-0 text-xs text-center transform -rotate-90 origin-bottom translate-y-full mt-1">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            Current step: {currentStep + 1} / {visualSteps.length}
          </p>
        </div>
      </div>
    </div>
  );
}













// import { useState, useEffect, useRef } from "react";


// export default function AlgorithmVisualizer({ selectedAlgorithm }) {

//   const [array, setArray] = useState([]);
//   const [algorithm, setAlgorithm] = useState(selectedAlgorithm || "bubbleSort"); // Use prop value or default
//   const [visualSteps, setVisualSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [speed, setSpeed] = useState(500);
//   const [searchElement, setSearchElement] = useState("");
//   const [foundIndex, setFoundIndex] = useState(-1);

//   const animationRef = useRef(null);

//   useEffect(() => {
//     generateRandomArray();
//     return () => {
//       if (animationRef.current) {
//         clearTimeout(animationRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setVisualSteps([]);
//     setCurrentStep(0);
//     setIsRunning(false);
//     setFoundIndex(-1);
//     setAlgorithm(selectedAlgorithm); // Update algorithm when prop changes
//   }, [selectedAlgorithm]);

//   const generateRandomArray = () => {
//     const newArray = Array.from({ length: 20 }, () =>
//       Math.floor(Math.random() * 100)
//     );
//     setArray(newArray);
//     setVisualSteps([newArray.slice()]);
//     setCurrentStep(0);
//     setFoundIndex(-1);
//   };

//   const startVisualization = async () => {
//     if (isRunning) {
//       setIsRunning(false);
//       if (animationRef.current) {
//         clearTimeout(animationRef.current);
//       }
//       return;
//     }

//     if (
//       ["linearSearch", "binarySearch"].includes(algorithm) &&
//       searchElement === ""
//     ) {
//       alert("Please enter a search element.");
//       return;
//     }

//     let steps = [];
//     let searchResult = -1;
//     const arrayCopy = [...array];

//     try {
//       // Calculate steps based on algorithm
//       switch (algorithm) {
//         case "bubbleSort":
//           steps = bubbleSort(arrayCopy);
//           break;
//         case "quickSort":
//           steps = quickSort(arrayCopy);
//           break;
//         case "mergeSort":
//           steps = mergeSort(arrayCopy);
//           break;
//         case "insertionSort":
//           steps = insertionSort(arrayCopy);
//           break;
//         case "selectionSort":
//           steps = selectionSort(arrayCopy);
//           break;
//         case "heapSort":
//           steps = heapSort(arrayCopy);
//           break;
//         case "radixSort":
//           steps = radixSort(arrayCopy);
//           break;
//         case "linearSearch":
//         case "binarySearch":
//           const element = Number(searchElement);
//           if (isNaN(element)) {
//             alert("Please enter a valid number for search.");
//             return;
//           }
//           const result =
//             algorithm === "linearSearch"
//               ? linearSearch(arrayCopy, element)
//               : binarySearch(arrayCopy, element);
//           steps = result.steps;
//           searchResult = result.foundIndex;
//           break;
//         default:
//           steps = [];
//       }

//       setVisualSteps(steps);
//       setFoundIndex(searchResult);
//       setIsRunning(true);

//       // Animation loop
//       let stepIndex = 0;
//       const animate = () => {
//         if (stepIndex < steps.length) {
//           setCurrentStep(stepIndex);
//           setArray(steps[stepIndex]);
//           stepIndex++;
//           animationRef.current = setTimeout(animate, speed);
//         } else {
//           setIsRunning(false);
//         }
//       };

//       animate();
//     } catch (error) {
//       console.error("Visualization error:", error);
//       setIsRunning(false);
//     }
//   };

//   // Sorting Algorithms
//   const bubbleSort = (arr) => {
//     const steps = [arr.slice()];
//     const n = arr.length;
//     for (let i = 0; i < n - 1; i++) {
//       for (let j = 0; j < n - i - 1; j++) {
//         if (arr[j] > arr[j + 1]) {
//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//           steps.push(arr.slice());

//         }
//       }
//     }
//     return steps;
//   };

//   const quickSort = (
//     arr,
//     low = 0,
//     high = arr.length - 1,
//     steps = [arr.slice()]
//   ) => {
//     if (low < high) {
//       const pi = partition(arr, low, high, steps);
//       quickSort(arr, low, pi - 1, steps);
//       quickSort(arr, pi + 1, high, steps);
//     }
//     return steps;
//   };

//   const partition = (arr, low, high, steps) => {
//     const pivot = arr[high];
//     let i = low - 1;
//     for (let j = low; j < high; j++) {
//       if (arr[j] < pivot) {
//         i++;
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//         steps.push(arr.slice());
//       }
//     }
//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
//     steps.push(arr.slice());
//     return i + 1;
//   };

//   const mergeSort = (arr) => {
//     const steps = [arr.slice()];
//     const aux = arr.slice();
//     mergeSortHelper(arr, 0, arr.length - 1, aux, steps);
//     return steps;
//   };

//   const mergeSortHelper = (arr, low, high, aux, steps) => {
//     if (low < high) {
//       const mid = Math.floor((low + high) / 2);
//       mergeSortHelper(aux, low, mid, arr, steps);
//       mergeSortHelper(aux, mid + 1, high, arr, steps);
//       merge(arr, low, mid, high, aux, steps);
//     }
//   };

//   const merge = (arr, low, mid, high, aux, steps) => {
//     let i = low,
//       j = mid + 1,
//       k = low;
//     while (i <= mid && j <= high) {
//       if (aux[i] <= aux[j]) {
//         arr[k++] = aux[i++];
//       } else {
//         arr[k++] = aux[j++];
//       }
//       steps.push(arr.slice());
//     }
//     while (i <= mid) {
//       arr[k++] = aux[i++];
//       steps.push(arr.slice());
//     }
//     while (j <= high) {
//       arr[k++] = aux[j++];
//       steps.push(arr.slice());
//     }
//   };

//   const insertionSort = (arr) => {
//     const steps = [arr.slice()];
//     for (let i = 1; i < arr.length; i++) {
//       let key = arr[i];
//       let j = i - 1;
//       while (j >= 0 && arr[j] > key) {
//         arr[j + 1] = arr[j];
//         j = j - 1;
//         steps.push(arr.slice());
//       }
//       arr[j + 1] = key;
//       steps.push(arr.slice());
//     }
//     return steps;
//   };

//   const selectionSort = (arr) => {
//     const steps = [arr.slice()];
//     for (let i = 0; i < arr.length; i++) {
//       let min = i;
//       for (let j = i + 1; j < arr.length; j++) {
//         if (arr[j] < arr[min]) {
//           min = j;
//         }
//       }
//       if (min !== i) {
//         [arr[i], arr[min]] = [arr[min], arr[i]];
//         steps.push(arr.slice());
//       }
//     }
//     return steps;
//   };

//   // Heap Sort
//   const heapSort = (arr) => {
//     const steps = [arr.slice()];
//     const n = arr.length;

//     // Build a max heap
//     for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//       heapify(arr, n, i, steps);
//     }

//     // One by one extract elements from the heap
//     for (let i = n - 1; i > 0; i--) {
//       [arr[0], arr[i]] = [arr[i], arr[0]];
//       steps.push(arr.slice());
//       heapify(arr, i, 0, steps);
//     }

//     return steps;
//   };

//   const heapify = (arr, n, i, steps) => {
//     let largest = i;
//     const left = 2 * i + 1;
//     const right = 2 * i + 2;

//     if (left < n && arr[left] > arr[largest]) {
//       largest = left;
//     }

//     if (right < n && arr[right] > arr[largest]) {
//       largest = right;
//     }

//     if (largest !== i) {
//       [arr[i], arr[largest]] = [arr[largest], arr[i]];
//       steps.push(arr.slice());
//       heapify(arr, n, largest, steps);
//     }
//   };

//   // Radix Sort
//   const radixSort = (arr) => {
//     const steps = [arr.slice()];
//     const max = Math.max(...arr);

//     for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
//       countingSort(arr, exp, steps);
//     }

//     return steps;
//   };

//   const countingSort = (arr, exp, steps) => {
//     const n = arr.length;
//     const output = new Array(n);
//     const count = new Array(10).fill(0);

//     // Count occurrences
//     for (let i = 0; i < n; i++) {
//       count[Math.floor((arr[i] / exp) % 10)]++;
//     }

//     // Change count[i] so that it now contains the actual position of this digit in output[]
//     for (let i = 1; i < 10; i++) {
//       count[i] += count[i - 1];
//     }

//     // Build the output array
//     for (let i = n - 1; i >= 0; i--) {
//       output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
//       count[Math.floor((arr[i] / exp) % 10)]--;
//     }

//     // Copy the output array to arr[]
//     for (let i = 0; i < n; i++) {
//       arr[i] = output[i];
//     }

//     steps.push(arr.slice());
//   };

//   // Update search algorithms to show visualization steps
//   const linearSearch = (arr, target) => {
//     const steps = [arr.slice()];
//     for (let i = 0; i < arr.length; i++) {
//       const stepArray = arr.slice();
//       if (arr[i] === target) {
//         return { steps: [...steps, stepArray], foundIndex: i };
//       }
//       steps.push(stepArray);
//     }
//     return { steps, foundIndex: -1 };
//   };

//   const binarySearch = (arr, target) => {
//     const steps = [];
//     const sortedArr = [...arr].sort((a, b) => a - b);
//     steps.push(sortedArr.slice());

//     let left = 0,
//       right = sortedArr.length - 1;
//     while (left <= right) {
//       const mid = Math.floor((left + right) / 2);
//       const stepArray = sortedArr.slice();
//       steps.push(stepArray);

//       if (sortedArr[mid] === target) {

//         return { steps: [...steps, stepArray], foundIndex: mid };
//       }
//       if (sortedArr[mid] < target) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//     return { steps, foundIndex: -1 };
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto flex-grow">
//       <h1 className="text-2xl font-bold mb-4">Algorithm Visualizer</h1>

//       <div className="flex flex-wrap gap-4 mb-4">
//         <button
//           onClick={generateRandomArray}
//           disabled={isRunning}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
//         >
//           Generate Random Array
//         </button>
//         <button
//           onClick={startVisualization}
//           className={`${
//             isRunning
//               ? "bg-red-500 hover:bg-red-600"
//               : "bg-green-500 hover:bg-green-600"
//           } text-white px-4 py-2 rounded transition-colors`}
//         >
//           {isRunning ? "Stop" : "Start"} Visualization
//         </button>

//         <div className="flex items-center gap-2">
//           <span>Slow</span>
//           <input
//             type="range"
//             min="50"
//             max="1000"
//             value={1050 - speed}
//             onChange={(e) => setSpeed(1050 - Number(e.target.value))}
//             className="w-32"
//           />
//           <span>Fast</span>
//         </div>
//       </div>

//       {/* Render search element input when a search algorithm is selected */}
//       {["linearSearch", "binarySearch"].includes(algorithm) && (
//         <div className="mb-4">
//           <input
//             type="number"
//             placeholder="Enter search element"
//             value={searchElement}
//             onChange={(e) => setSearchElement(e.target.value)}
//             className="border p-2 rounded w-full max-w-xs"
//           />
//           {foundIndex !== -1 && (
//             <p className="mt-2 text-green-600">
//               Element found at index: {foundIndex}
//             </p>
//           )}
//         </div>
//       )}

// <div className="border rounded-lg p-4 bg-white shadow-lg">
//   <h3 className="text-lg font-semibold mb-4">Visualization</h3>
//   <div className="flex justify-center items-end h-64 bg-gray-100 p-4">
//     {array.map((value, index) => (
//       <div
//         key={index}
//         style={{
//           height: `${(value / 100) * 100}%`, // Keep it as a percentage to fit within the container
//           width: '30px', // Make the bars wider
//         }}
//         className={`mx-1 transition-all duration-300 flex flex-col justify-end relative ${
//           index === currentStep
//             ? "bg-red-500"
//             : foundIndex === index
//             ? "bg-green-500"
//             : "bg-blue-500"
//         }`}
//       >
//         <span className="absolute bottom-0 left-0 right-0 text-xs text-center transform -rotate-90 origin-bottom translate-y-full mt-1">
//           {value}
//         </span>
//       </div>
//     ))}
//   </div>

//   <div className="mt-4 text-sm text-gray-600">
//     <p>
//       Current step: {currentStep + 1} / {visualSteps.length}
//     </p>
//   </div>
// </div>

//     </div>
//   );
// }
