https://stackblitz.com/edit/react-4xdcsubp?file=src%2FApp.js,src%2FTypingEffect.jsx
import React, { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ text = '', delay = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      if (!isDeleting && index < text.length) {
        // typing forward
        setDisplayedText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        // deleting backward
        setDisplayedText(text.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      } else {
        // switch direction after pause
        setTimeout(() => setIsDeleting((prev) => !prev), 1000);
      }
    }, delay);

    return () => clearTimeout(intervalRef.current);
  }, [index, isDeleting, text, delay]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
