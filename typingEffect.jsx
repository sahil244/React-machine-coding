https://stackblitz.com/edit/react-4xdcsubp?file=src%2FApp.js,src%2FTypingEffect.jsx


import React, { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ text = '', delay = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [endIndex, setEndIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      if (!isDeleting && endIndex < text.length) {
        // typing forward
        setDisplayedText(text.slice(0, endIndex + 1));
        setEndIndex((prev) => prev + 1);
      } else if (isDeleting && endIndex > 0) {
        // deleting backward
        setDisplayedText(text.slice(0, endIndex - 1));
        setEndIndex((prev) => prev - 1);
      } else {
        // switch direction after pause
        setTimeout(() => setIsDeleting((prev) => !prev), 800);
      }
    }, delay);

    return () => clearTimeout(intervalRef.current);
  }, [endIndex, isDeleting, text, delay]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
