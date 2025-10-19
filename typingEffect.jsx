https://stackblitz.com/edit/react-4xdcsubp?file=src%2FApp.js,src%2FTypingEffect.jsx
import React, { useState, useEffect } from "react";

const TypingEffect = ({ text = "", typingSpeed = 100, pauseDuration = 1000 }) => {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && visibleLength < text.length) {
        setDisplayedText(text.slice(0, visibleLength + 1));
        setVisibleLength((prev) => prev + 1);
      } else if (isDeleting && visibleLength > 0) {
        setDisplayedText(text.slice(0, visibleLength - 1));
        setVisibleLength((prev) => prev - 1);
      } else {
        setTimeout(() => setIsDeleting((prev) => !prev), pauseDuration);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [visibleLength, isDeleting, text, typingSpeed, pauseDuration]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;

