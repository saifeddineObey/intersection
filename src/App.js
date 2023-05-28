import React, { useState } from "react";
import "./App.scss";

const App = () => {
  const [sizeA, setSizeA] = useState("");
  const [sizeB, setSizeB] = useState("");
  const [putInHashSet, setPutInHashSet] = useState(true);
  const [intersectionSize, setIntersectionSize] = useState("");
  const [computationTime, setComputationTime] = useState("");
  const [collectionA, setCollectionA] = useState([]);
  const [collectionB, setCollectionB] = useState([]);
  const [intersection, setIntersection] = useState([]);

  const handleSizeAChange = (event) => {
    setSizeA(event.target.value);
  };

  const handleSizeBChange = (event) => {
    setSizeB(event.target.value);
  };

  const handleCollectionSelection = (event) => {
    setPutInHashSet(event.target.value === "hashSet");
  };

  const handleRunButtonClick = async () => {
    const generatedCollectionA = await generateRandomNumbers(sizeA);
    const generatedCollectionB = await generateRandomNumbers(sizeB);

    setCollectionA(Array.from(generatedCollectionA));
    setCollectionB(Array.from(generatedCollectionB));

    const startTime = performance.now();

    let intersectionSet;

    if (putInHashSet) {
      intersectionSet = await computeIntersectionWithHashSet(
        generatedCollectionA,
        generatedCollectionB
      );
    } else {
      intersectionSet = await computeIntersectionWithIteration(
        generatedCollectionA,
        generatedCollectionB
      );
    }

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    setIntersection(Array.from(intersectionSet));
    setIntersectionSize(intersectionSet.size);
    setComputationTime(timeTaken);
  };

  const generateRandomNumbers = (size) => {
    const collection = new Set();
    while (collection.size < size) {
      const randomNum = Math.floor(Math.random() * 100);
      collection.add(randomNum);
    }
    return collection;
  };

  const computeIntersectionWithHashSet = (setA, setB) => {
    const intersectionSet = new Set();
    for (const element of setA) {
      if (setB.has(element)) {
        intersectionSet.add(element);
      }
    }
    return intersectionSet;
  };

  const computeIntersectionWithIteration = (setA, setB) => {
    const intersectionSet = new Set();
    for (const element of setB) {
      if (setA.has(element)) {
        intersectionSet.add(element);
      }
    }
    return intersectionSet;
  };

  return (
    <div className="app">
      <div className="d-flex justify-content-center">
        <div className="inputs-container col-md-5">
          <h2>Collections-Intersection</h2>
          <div className="input-container">
            <label htmlFor="sizeA">Size of Collection A:</label>
            <input
              type="number"
              id="sizeA"
              value={sizeA}
              onChange={handleSizeAChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="sizeB">Size of Collection B:</label>
            <input
              type="number"
              id="sizeB"
              value={sizeB}
              onChange={handleSizeBChange}
            />
          </div>
          <div className="input-container">
            <label>
              <input
                type="radio"
                name="collectionType"
                value="hashSet"
                checked={putInHashSet}
                onChange={handleCollectionSelection}
              />
              Put Collection A into HashSet
            </label>
          </div>
          <div className="input-container">
            <label>
              <input
                type="radio"
                name="collectionType"
                value="iteration"
                checked={!putInHashSet}
                onChange={handleCollectionSelection}
              />
              Iterate over Collection A
            </label>
          </div>
          <button
            disabled={!(sizeA > 0 && sizeB > 0)}
            className={
              !(sizeA > 0 && sizeB > 0) ? "disabled-button" : "run-button"
            }
            onClick={handleRunButtonClick}>
            Run
          </button>
        </div>
      </div>
      <div className="d-md-flex justify-content-center">
        <div className="d-flex justify-content-center">
        <div className="output-container">
          <h5>
            <strong>Collection A:</strong>
          </h5>

          {collectionA.length > 0 ? (
            <ul>
              {collectionA.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          ) : (
            <p>No elements in Collection A</p>
          )}
        </div>
        <div className="output-container">
          <h5>
            <strong>Collection B:</strong>
          </h5>
          {collectionB.length > 0 ? (
            <ul>
              {collectionB.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          ) : (
            <p>No elements in Collection B</p>
          )}
        </div>
        </div>
        <div className="output-container">
          <h5>

            <strong>Intersection:</strong>
          </h5>
          {intersection.length > 0 ? (
            <ul>
              {intersection.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          ) : (
            <p>No elements in Intersection</p>
          )}

          <div className="result-container">
            <div className="result">
              <strong>Intersection Size:</strong> {intersectionSize}
            </div>
            <div className="result">
              <strong>Computation Time:</strong> {computationTime} ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
