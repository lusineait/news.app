import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = ({ news, setSearchResult, handleSearch, setSearchQuery }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(text); 
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);

    if (!searchText) {
      setSearchResult(news);
      return;
    }

    setLoading(true);

   
    setTimeout(() => {
      setSearchResult([]); 
      setLoading(false);

      
      handleSearch(searchText);
    }, 1000); 
  };

  return (
    <div className="p-4  md:flex md:justify-between md:items-center p-6 bg-black text-white border-b-2 border-[#FFD700]">
      <div className="flex items-center md:mr-4">
        <Link to={"/"}>
          <img
            className="w-16 h-16"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Armenian_news_-_NEWS.am.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center mt-4 md:mt-0 md:ml-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="border-2 border-white rounded-full p-2 mr-2 bg-transparent text-white focus:outline-none"
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search for news..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-4 md:mt-0">
        <Link to="/save">
          <FontAwesomeIcon icon={faBookmark} className="text-white text-xl sm:text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
