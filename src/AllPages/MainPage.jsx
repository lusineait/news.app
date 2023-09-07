import React, { useState, useEffect } from "react";
import { getNews, searchNews, getTopHeadlinesByCountry, getTopHeadlinesByLanguage, getTopHeadlinesByCategory } from "../Request";
import Header from "./Header";
import ReactPaginate from "react-paginate";
import ReactModal from 'react-modal';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon, } from 'react-share';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { setInformation } from "../store/slice/Save";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import SearchPage from "./SearchPage";


ReactModal.setAppElement("#root");



const MainPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews(setInformation);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setData(news.slice(0, itemsPerPage));
    setTotalPages(Math.ceil(news.length / itemsPerPage));
  }, [news]);

  const fetchNews = () => {
    setLoading(true);
    getNews()
      .then((rsp) => {
        console.log(rsp.data.articles);
        setNews(rsp.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  

    const handleCountryChange = (event) => {
    const newSelectedCountry = event.target.value;
    setSelectedCountry(newSelectedCountry);
    setSelectedCategory("");
    setSelectedArticle(null);
    setLoading(true);
    setCurrentPage(0);

    getTopHeadlinesByCountry(newSelectedCountry)
      .then((rsp) => {
        setNews(rsp.data.articles);
        setLoading(false);
        setTotalPages(Math.ceil(rsp.data.articles.length / itemsPerPage));
        setData(rsp.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  };

  const handleLanguageChange = (event) => {
    const newSelectedLnguage = event.target.value;
    setSelectedLanguage(newSelectedLnguage);
    setSelectedCategory("");
    setSelectedArticle(null);
    setLoading(true);
    setCurrentPage(0);
    getTopHeadlinesByLanguage(newSelectedLnguage)
      .then((rsp) => {
        setNews(rsp.data.articles);
        setLoading(false);
        setTotalPages(Math.ceil(rsp.data.articles.length / itemsPerPage));
        setData(rsp.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  };

  const handleChangeCategory = (e) => {
    const newSelectedCategory = e.target.value;
    setSelectedCategory(newSelectedCategory);
    setSelectedArticle(null);
    setLoading(true);
    setCurrentPage(0);
    getTopHeadlinesByCategory(newSelectedCategory)
      .then((rsp) => {
        setNews(rsp.data.articles);
        setLoading(false);
        setTotalPages(Math.ceil(rsp.data.articles.length / itemsPerPage));
        setData(rsp.data.articles);
      });
  };



  const handleSearch = (query) => {
    setSearchQuery(query); 
    setLoading(true);

    if (query) {
      searchNews(query)
        .then((rsp) => {
          setNews(rsp.data.articles);
          setSearchResult(rsp.data.articles);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    } else {
      fetchNews();
    }
  };
  

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
    setData(news.slice(selected.selected * itemsPerPage, (selected.selected + 1) * itemsPerPage));
  };
  

  

  const dispatch = useDispatch();
  const savedArticles = useSelector(state => state.save.information);

  const handleArticleSave = (article) => {
    dispatch(setInformation(article));
  };
  
  return (
    <div>
   <Header news={news} setSearchResult={setSearchResult} handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
   
   {searchQuery === "" ? (
      <div className="bg-black">
        
        <div className="p-4 space-x-10 pt-10 flex justify-center sm:grid sm:grid-cols-2 md:flex md:flex-cols-3 lg:grid lg:grid-cols-4 xl:flex xl:flex-cols-5 gap-6">
         <div className="p-4 w-[150px] border border-yellow-200 rounded-3xl bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
         <select className="bg-black w-full md:w-[100px] text-white px-2 py-1 rounded-md border-none focus:ring focus:ring-yellow-400 focus:outline-none" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Country</option>
              <option value="us">US</option>
              <option value="gb">GB</option>
              <option value="co">CO</option>
              <option value="ae">AE</option>
              <option vlaue="be">BE</option>
              <option value="bg">BG</option>
              <option value="br">bR</option>
              <option value="ca">CA</option>
              <option value="ch">CH</option>
              <option value="cn">CN</option>
              <option value="cu">CU</option>
              <option value="cz">CZ</option>
              <option value="de">DE</option>
              <option value="eg">EG</option>
              <option value="fr">FR</option>
              <option value="gb">GB</option>
              <option value="gr">GR</option>
              <option value="hk">HK</option>
              <option value="hu">HU</option>
              <option value="id">ID</option>
              <option value="ie">IE</option>
              <option value="il">IL</option>
              <option value="it">IT</option>
              <option value="in">IN</option>
              <option value="jp">JP</option>
              <option value="kr">KR</option>
              <option value="lt">LT</option>
              <option value="lv">LV</option>
              <option value="ma">MA</option>
              <option value="mx">MX</option>
              <option vlaue="my">MY</option>
              <option value="ng">NG</option>
              <option value="nl">NL</option>        
              <option value="no">NO</option>  
              <option value="nz">NZ</option>
              <option value="ph">PH</option>
              <option value="pl">PL</option>
              <option value="pt">PT</option>
              <option value="ro">RO</option>
              <option value="rs">RS</option>
              <option value="ru">RU</option>
              <option value="sa">SA</option>
              <option value="se">SE</option>
              <option value="sg">SG</option>
              <option value="si">SI</option>
              <option value="sk">SK</option>
              <option value="th">TH</option>
              <option value="tr">TR</option>
              <option value="tw">TW</option>
              <option value="ua">UA</option>
              <option value="ve">VE</option>
              <option value="za">ZA</option>
            </select>
          </div>

          <div className="p-4 w-[150px] border border-yellow-200 rounded-3xl bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <select className="bg-black w-full md:w-[100px] text-white px-2 py-1 rounded-md border-none focus:ring focus:ring-yellow-400 focus:outline-none" value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="">Language</option>
              <option value="ar">ar</option>
              <option value="de">de</option>
              <option value="en">en</option>
              <option value="es">es</option>
              <option value="fr">fr</option>
              <option value="he">he</option>
              <option value="it">it</option>
              <option value="nl">nl</option>
              <option value="no">no</option> 
              <option value="pt">pt</option>
              <option value="ru">ru</option>
              <option vlaue="sv">sv</option>
              <option value="ud">ud</option>
              <option value="zh">zh</option>

            </select>
          </div>
          <div className="p-4 w-[150px] border border-yellow-200 rounded-3xl bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <select className="bg-black w-full md:w-[100px] text-white px-2 py-1 rounded-md border-none focus:ring focus:ring-yellow-400 focus:outline-none" value="selectedCategory" onChange={handleChangeCategory}>
              <option value="">Category</option>
              <option value="business">business</option>
              <option value="entertainment">entertainment</option>
              <option value="general">general</option>
              <option value="health">health</option>
              <option value="science">science</option>
              <option value="sports">sports</option>
              <option value="technology">technology</option>
            </select>
          </div>

        </div>
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
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
</ReactModal>

      {loading ? (
        <div className="flex justify-center items-center">
          <img src="https://tr.rbxcdn.com/907f94f7bc7727a5257c801c451e057e/420/420/Hat/Png" alt="Loading..." />
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((item, index) => (
              <li className="p-6 border border-yellow-200 rounded-xl bg-black shadow-md hover:shadow-lg transition duration-300" key={index} onClick={() => setSelectedArticle(item)}>
                <img className="w-60 h-40 mt-2 cursor-pointer" src={item.urlToImage || "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png"} alt="News" onClick={() => { setSelectedArticle(item); setIsOpen(true);}}/>
                 <p className="font-semibold text-[#FFD700]">{item.title}</p>
                 <p className="text-gray-500 mt-2">{item.publishedAt}</p>
                 <div onClick={() => handleArticleSave(item)} className="text-white text-xl pt-4">
                     <FontAwesomeIcon icon={faBookmark} />
                  </div>
              </li>
            ))}
          </ul>
          <ReactPaginate
            containerClassName="flex flex-wrap justify-center items-center m-5"
            pageClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            previousClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            nextClassName="bg-gray-300 hover:bg-gray-400 mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            activeClassName="bg-blue-500 text-white mx-1 mb-2 md:mx-2 px-3 py-2 rounded"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}/>

        </div>
      )}
         <Footer className="pt-5"/>
    </div>
           ) : (
            <div className="bg-black">
              {loading ? (
                <div className="flex justify-center items-center">
                  <img src="https://tr.rbxcdn.com/907f94f7bc7727a5257c801c451e057e/420/420/Hat/Png" alt="Loading..." />
                </div>
              ) : (
                <div>
                 <SearchPage searchResult={searchResult} news={news} setData={setData}  setInformation={setInformation}/>
                </div>
              )}
            </div>
          )}
         
        </div>
      );
};

export default MainPage;



