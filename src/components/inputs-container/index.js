import React, { useState } from "react";

import "./inputs-container.scss";

const InputsContainer = ({
  setIntersectionSize,
  setComputationTime,
  setCollectionA,
  setCollectionB,
  setIntersection,
}) => {
  const [sizeA, setSizeA] = useState("");
  const [sizeB, setSizeB] = useState("");
  const [putInHashSet, setPutInHashSet] = useState(true);

  const handleSizeAChange = (event) => {
    let value = event.target.value;
    if (value > 99) {
      value = 99;
    }
    setSizeA(value);
  };

  const handleSizeBChange = (event) => {
    let value = event.target.value;
    if (value > 99) {
      value = 99;
    }
    setSizeB(value);
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
    <div className="d-flex justify-content-center">
      <div className="inputs-container col-md-5">
        <h2>Collections-Intersection</h2>
        <div className="input-container">
          <label htmlFor="sizeA">Size of Collection A:</label>
          <input
            type="number"
            id="sizeA"
            value={sizeA > 99 ? 99 : sizeA}
            onChange={handleSizeAChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="sizeB">Size of Collection B:</label>
          <input
            type="number"
            id="sizeB"
            value={sizeB > 99 ? 99 : sizeB}
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
              disabled={!(sizeA > 0 && sizeB > 0)}
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
              disabled={!(sizeA > 0 && sizeB > 0)}
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
  );
};

export default InputsContainer;
