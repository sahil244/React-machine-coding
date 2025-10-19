https://stackblitz.com/edit/react-ojyya8rq?file=src%2FApp.js,src%2FOtp.jsx,src%2FOtp.css

import React, { useState, useRef, useEffect } from 'react';
import './Otp.css';
const Otp = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(Array(otpLength).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    let value = e.target.value;

    // Ensure the value is a valid number
    if (isNaN(value) || value === ' ') return;
    value = value.slice(0, 1);
    const newOtp = [...otpFields];
    newOtp[index] = value;

    setOtpFields(newOtp); // Update state with the new OTP array

    // Automatically focus on the next input field after entering a value
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // prevent default backspace behavior
      const newOtp = [...otpFields];

      if (newOtp[index]) {
        // just clear current box
        newOtp[index] = '';
        setOtpFields(newOtp);
      } else if (index > 0) {
        // move to previous box if already empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          maxLength={1}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default Otp;



input {
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;
}

