import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function App() {
  const [count, setCount] = useState(10);
  const goingUp = useRef(false); // tracks direction

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (!goingUp.current && prev === 0) {
          alert("Test");
          goingUp.current = true;   // flip direction
          return prev + 1;          // start going up
        }

        if (goingUp.current && prev === 10) {
          goingUp.current = false;  // flip direction
          return prev - 1;          // start going down
        }

        return goingUp.current ? prev + 1 : prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
