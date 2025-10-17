https://stackblitz.com/edit/react-7jj4mjyf?file=src%2FApp.js,src%2FTab.jsx,src%2FTab.css




import React, { useState } from 'react';
import './Tab.css';

const Tab = ({ tabData }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="tab">
      <div className="tab-container">
        {tabData.map((item, index) => (
          <button
            key={item.id}
            className={`tab-button ${
              selectedTabIndex === index ? 'active' : ''
            }`}
            onClick={() => setSelectedTabIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabData[selectedTabIndex].content}</div>
    </div>
  );
};

export default Tab;



.tab-container {
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 0.5rem;
  width: 100%;
}

.tab-button {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid transparent;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.tab-button:hover {
  background-color: #eaeaea;
}

.tab-button.active {
  border-bottom: 2px solid #007bff;
  background-color: #fff;
  color: #007bff;
}

.tab-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 1rem;
  width: 100%;
  min-height: 8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

