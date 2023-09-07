import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { removeInformation } from "../store/slice/Save";
import ReactModal from "react-modal";
import Header from "./Header";
import { searchNews } from "../Request";
import SearchPage from "./SearchPage";

const SaveNews = () => {
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.save.information);
  const quantity = useSelector((state) => state.save.quantity);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  

  const handleArticleRemove = (newsItem) => {
    dispatch(removeInformation(newsItem));
  };

  const openModal = (newsItem) => {
    setSelectedArticle(newsItem);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };




  console.log(searchQuery);
  return (
    <div className="bg-black pt-6">
      <h1 className="text-yellow-200 flex justify-center items-center">NEWS.AM</h1>
      <div className="flex justify-center items-center p-4 space-x-10 pt-10 bg-black">
       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {savedNews.map((newsItem, index) => (
              <div
                className="p-6 border border-yellow-200 rounded-xl bg-black shadow-md hover:shadow-lg transition duration-300"
                key={index}
              >
                <img
                  className="w-60 h-40 mt-2 cursor-pointer"
                  src={newsItem.urlToImage || "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png"}
                  alt="News"
                  onClick={() => openModal(newsItem)}
                />
                <p className="font-semibold text-[#FFD700]">{newsItem.title}</p>
                <div onClick={() => handleArticleRemove(newsItem)} className="text-white text-xl pt-4">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>

                <ReactModal
                  isOpen={selectedArticle === newsItem}
                  onRequestClose={closeModal}
                  className="modal"
                  overlayClassName="overlay"
                >
                  {selectedArticle && (
                    <div className="popup-content p-6 bg-yellow-200 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <h1 className="flex justify-center items-center text-red-500">{selectedArticle.title}</h1>
                      <p className="flex justify-center items-center">author : {selectedArticle.author}</p>
                      <p className="flex justify-center items-center">{selectedArticle.content}</p>
                      <img src={selectedArticle.urlToImage} alt="Article" />
                      <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
                        For more...
                      </a>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={closeModal}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </ReactModal>
              </div>
            ))}
          </div>
       
        <div>Quantity: {quantity}</div>
      </div>
    </div>
  );
};

export default SaveNews;

