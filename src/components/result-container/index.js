import React from 'react'
import "./result-container.scss"

const ResultContainer = ({intersectionSize,computationTime}) => {
  return (
    <div className=" d-flex justify-content-center">
    <div className="result-container col-md-5">
      <div className="result">
        <strong>Intersection Size:</strong> {intersectionSize}
      </div>
      <div className="result">
        <strong>Computation Time:</strong> {computationTime} ms
      </div>
    </div>
  </div>  )
}

export default ResultContainer