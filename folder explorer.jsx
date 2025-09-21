import React, { useState } from 'react';
import './style.css';

// Example JSON data
const explorerData = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.js', type: 'file' },
        { name: 'index.js', type: 'file' },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [{ name: 'index.html', type: 'file' }],
    },
  ],
};

// Recursive Folder component
const Folder = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (node.type === 'file') {
    return <div style={{ marginLeft: '16px' }}> {node.name}</div>;
  }

  return (
    <div style={{ marginLeft: '16px' }}>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {node.name}
      </div>

      {isOpen &&
        node.children?.map((child, index) => (
          <Folder key={child.name + index} node={child} />
        ))}
    </div>
  );
};

export default function FileExplorer() {
  return (
    <div>
      <h2> File Explorer</h2>
      <Folder node={explorerData} />
    </div>
  );
}
