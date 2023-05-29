import React from 'react'
import "./output-container.scss" 

const OutputContainer = ({collection,title}) => {
  return (
    <div className="output-container">
    <h5>
      <strong>{title}:</strong>
    </h5>

    {collection.length > 0 ? (
      <ul>
        {collection.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
    ) : (
      <p>No elements in Collection A</p>
    )}
  </div>  )
}

export default OutputContainer