https://stackblitz.com/edit/react-dawbd78c?file=src%2FApp.js,src%2FStarRating.jsx,src%2Fstyle.css,src%2FStarRating.css



import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ starCount = 5 }) => {
  const [starValue, setStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(null);

  const getStarValue = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    return index + (isHalf ? 0.5 : 1);
  };

  const handleClick = (e, index) => {
    setStarValue(getStarValue(e, index));
  };

  const handleHover = (e, index) => {
    setHoverValue(getStarValue(e, index));
  };

  const handleMouseLeave = () => setHoverValue(null);

  const getClass = (index) => {
    const activeValue = hoverValue ?? starValue;
    if (activeValue >= index + 1) return 'full';
    if (activeValue >= index + 0.5) return 'half';
    return '';
  };

  return (
    <div className="container" onMouseLeave={handleMouseLeave}>
      {Array.from({ length: starCount }).map((_, index) => (
        <span
          key={index}
          className={`star ${getClass(index)}`}
          onClick={(e) => handleClick(e, index)}
          onMouseMove={(e) => handleHover(e, index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;



.container {
  font-size: 32px;
  cursor: pointer;
  user-select: none;
}

.star {
  color: #ccc;
  display: inline-block;
  width: 32px;
  transition: color 0.2s;
}

/* Full star */
.star.full {
  color: gold;
}

/* Half star with gradient fill */
.star.half {
  background: linear-gradient(90deg, gold 50%, #ccc 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
