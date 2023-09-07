import { Link } from "react-router-dom";

const Footer = ()=>{
    return(
        <>
        
            <div className="flex justify-end pb-3 pr-5 bg-black items-end">
            <Link to={"/"}>
                <img className="w-15 h-16 pb-3 flex justify-end" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Armenian_news_-_NEWS.am.png" alt="Logo"/>
            </Link>
          </div>
        </>
)
}
export default Footer