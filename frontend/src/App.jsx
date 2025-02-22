/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("https://blog-app-1-ykup.onrender.com/posts").then((res) => setPosts(res.data));
  }, []);

  const addPost = () => {
    axios.post("https://blog-app-1-ykup.onrender.com/posts", { title, content }).then((res) => {
      setPosts([...posts, res.data]);
      setTitle("");
      setContent("");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h2 className="text-3xl font-bold text-blue-600 mb-5">Simple Blog App</h2>

      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-md">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          onClick={addPost}
        >
          Add Post
        </button>
      </div>

      <ul className="w-full max-w-md mt-5">
        {posts.map((post) => (
          <li key={post._id} className="bg-white shadow-md p-4 rounded-lg mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
