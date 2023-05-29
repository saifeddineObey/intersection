import React, { useState } from "react";
import OutputContainer from "./components/output-container";
import InputsContainer from "./components/inputs-container";
import ResultContainer from "./components/result-container";

import "./App.scss";

const App = () => {
  const [intersectionSize, setIntersectionSize] = useState("");
  const [computationTime, setComputationTime] = useState("");
  const [collectionA, setCollectionA] = useState([]);
  const [collectionB, setCollectionB] = useState([]);
  const [intersection, setIntersection] = useState([]);
  const [check, setCheck] = useState(false);

  const handleToggle = () => {
    setCheck(!check);
  };

  return (
    <div className="app">
      <div className="initial-question">
        <h1>Initial Question Answer: </h1>
        <p>
          If one collection is significantly larger than the other, it is more
          efficient to put the elements of the smaller collection into the
          hash-set. This approach minimizes the number of lookups performed in
          the hash-set, resulting in faster execution time.
        </p>
        <div className="switcher">
          <input type="checkbox" checked={check} onChange={handleToggle} />
          <label>Test This!</label>
        </div>
      </div>
      {check ? (
        <>
          <InputsContainer
            setIntersectionSize={setIntersectionSize}
            setComputationTime={setComputationTime}
            setCollectionA={setCollectionA}
            setCollectionB={setCollectionB}
            setIntersection={setIntersection}
          />
          <div className="d-md-flex justify-content-center">
            <div className="d-flex justify-content-center">
              <OutputContainer
                title={"Collection A"}
                collection={collectionA}
              />
              <OutputContainer
                title={"Collection B"}
                collection={collectionB}
              />
            </div>
            <OutputContainer title={"Intersection"} collection={intersection} />
          </div>
          {computationTime && (
            <ResultContainer
              intersectionSize={intersectionSize}
              computationTime={computationTime}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default App;
