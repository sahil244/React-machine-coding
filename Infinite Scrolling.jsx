import React, { useEffect, useState, useRef } from 'react';

const App = () => {
  // ----------------------------
  // 🧠 State Variables
  // ----------------------------
  const [posts, setPosts] = useState([]); // Holds all fetched posts
  const [page, setPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(false); // Indicates API call in progress
  const [hasMore, setHasMore] = useState(true); // Whether more data is available

  // Ref for the "loader" element (sentinel)
  const loaderRef = useRef(null);

  // ----------------------------
  // 📡 Function: Fetch paginated data from API
  // ----------------------------
  const fetchPosts = async () => {
    setLoading(true); // Start loading indicator

    try {
      // Call API with page and limit query parameters
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
      );
      console.log('page', page);
      const data = await res.json();

      // If no new data returned, we reached the end
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // Append new data to existing posts
        setPosts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // ----------------------------
  // 🔁 useEffect: Fetch new data when 'page' changes
  // ----------------------------
  useEffect(() => {
    if (hasMore) fetchPosts();
  }, [page]); // Run this whenever `page` updates

  // ----------------------------
  // 👀 useEffect: Observe the loader element
  // ----------------------------
  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]; // We observe only one element (the loader)
      // When loader enters the viewport and not currently loading
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1); // Trigger next page fetch
      }
    });

    // Start observing the loader element
    if (loaderRef.current) observer.observe(loaderRef.current);

    // Cleanup when component unmounts
    return () => observer.disconnect();
  }, [loading, hasMore]);

  // ----------------------------
  // 💅 Render Section
  // ----------------------------
  return (
    <div style={{ width: '60%', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>📜 Infinite Scroll (API Example)</h2>

      {/* Render each post */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            margin: '10px 0',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: 8,
            background: '#f9f9f9',
          }}
        >
          <h4>
            {post.id}. {post.title}
          </h4>
          <p>{post.body}</p>
        </div>
      ))}

      {/* Loader div — observed by IntersectionObserver */}
      <div ref={loaderRef}>
        {loading
          ? 'Loading more ...' // When API call in progress
          : ''}
      </div>
    </div>
  );
};

export default App;
