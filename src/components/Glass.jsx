import React from 'react';
import '../styles/Glass.css';
import rockGlass from '../images/rockGlass.svg';

function Glass() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default Glass;
