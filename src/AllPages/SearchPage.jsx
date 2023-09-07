import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import ReactModal from 'react-modal';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

ReactModal.setAppElement("#root");
const SearchPage = ({ searchResult, news, setData, setInformation }) => {
  

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  
  console.log(news)

  const [totalPages, setTotalPages] = useState(0);

  if (!news) {
    return (
      <article>
        <p>Loading news...</p>
      </article>
    );
  }

  let filteredNews = [];

  if (typeof searchResult === "string") {
    const lowerSearchResult = searchResult.toLowerCase();
    const searchWords = lowerSearchResult.split("");

    filteredNews = news.filter((article) =>
      searchWords.every((word) => article.title.toLowerCase().includes(word))
    );
  }

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);

    const startIndex = selected.selected * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articlesToDisplay = filteredNews.slice(startIndex, endIndex);

    setData(articlesToDisplay);
  };

  const handleArticleSave = (article) => {
    dispatch(setInformation(article));
  };

  return (
    <>
     <div className="bg-black pt-8">
      {news.length === 0 ? (
        <article>
         <p className="text-white text-center">No matching posts</p>
        </article>
      ) : (
        <>
            <h1 className="text-yellow-200 text-center">Search NEWS</h1>
          <ul className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {news.map((article, index) => (
              <li
                className="p-6 border border-yellow-200 rounded-xl bg-black shadow-md hover:shadow-lg transition duration-300"
                key={index}
                onClick={() => setSelectedArticle(article)}
              >
                <div key={index}>
                  <p className="font-semibold text-[#FFD700]">{article.title}</p>
                  <img
                    alt="Article"
                    className="w-60 h-40 mt-2 cursor-pointer"
                    src={article.urlToImage || "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png"}
                    onClick={() => {
                      setSelectedArticle(article);
                      setIsOpen(true);
                    }}
                  />
                  <p className="text-gray-500 mt-2">{article.publishedAt}</p>
                  <div
                    onClick={() => handleArticleSave(article)}
                    className="text-white text-xl pt-4"
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ReactModal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="modal"
            overlayClassName="overlay"
          >
            <div className="popup-content p-6 bg-yellow-200 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    
           {selectedArticle && (
          <div>
            <h1 className="flex justify-center items-centers text-red-500">{selectedArticle.title}</h1>
            <p className="flex justify-center items-centers">author : {selectedArticle.author}</p>
            <p className="flex justify-center items-centers">{selectedArticle.content}</p>
            <img src={selectedArticle.urlToImage} alt="Article" />
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">For more...</a>
          </div>
        )}
     {selectedArticle && (
        <div>
          <div className="flex mt-4 space-x-4">
            <FacebookShareButton url={selectedArticle.url}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={selectedArticle.url} title={selectedArticle.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <EmailShareButton url={selectedArticle.url} subject={selectedArticle.title}>
              <EmailIcon size={32} round />
            </EmailShareButton>
    
          </div>
        </div>
      )}
        <div className="mt-4 flex justify-end">
          <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Close
          </button>
        </div>
      </div>
    </ReactModal>
    

          <ReactPaginate
            containerClassName="flex flex-wrap justify-center items-center m-5"
            pageClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            previousClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            nextClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            activeClassName="bg-blue-500 text-white mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}/>
        </>
      )}
      <Footer/>
      </div>
        

    </>
  );
};

export default SearchPage;
