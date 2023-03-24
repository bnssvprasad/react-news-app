
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const CATEGORIES = ["general","business","entertainment","health","science","sports","technology"];
const NewsApp  = () => {
    const [articles,setArticles] = useState([]);
    const [selectCategory,setSelectCategory] = useState('');
    const [totalRecords,setTotalRecords] = useState(0);
    const [pageNumber,setPageNumber] = useState(1);
    const [isLoading,setIsLoading] = useState(false);
    const loadNews = () => {
        axios({
            method: 'GET',
            url:"https://newsapi.org/v2/top-headlines",
            params:{
                country:"in",
                 apikey:"63777fd825ba4eb4baec4e30a53fd5ed",
                  category:selectCategory,
                   page:pageNumber}
        }).then((response) => {
              setIsLoading(false);
               setArticles(response.data.articles);
               setTotalRecords(response.data.totalResults);
        }).catch(()=>{

        })
    }
    useEffect(() =>{
      loadNews();
    }, []);
    useEffect(() => {
      loadNews();
    },[selectCategory,pageNumber])
    return (
      <div>
                

        <div className="secondheader">
        <h1>NEWS TODAY</h1>
        <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        containerClassName="pagination"
        pageCount={Math.ceil(totalRecords/20)}
        onPageChange={(event) => {
    setPageNumber(event.selected + 1)
        }}
     
        
      />
      
        {
          CATEGORIES.map((category,index) => {
            return (
  
    <button className="btn btn-primary" style={{margin:10}} key={index} onClick={() => {
      setIsLoading(true);
      setPageNumber(1);

      setSelectCategory(category);
    }}>
      {category}
    </button>
   
  

            )
          })
        }
        </div>
        
        isLoading ?    (
          <button className="btn btn-primary" type="button" disabled>
<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
<span class="sr-only">Loading...</span>
</button>
<button class="btn btn-primary" type="button" disabled>
<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
Loading...
</button>
        )
        
        <div  className="cardfirst">
        {
            articles.map((articles,index) => {
                 return (
                    <div  className="card"  style = {{width:'300px',margin:10}}>
                 <img src={articles.urlToImage} className="card-img-top" alt="card-img-top" style={{minHeight:180}}/>
                 <div className="card-body">
                   <h5 className="card-title">{articles.title}</h5>
                   <p className="card-text">{articles.description}</p>
                   <p className="card-text"><small className="text-muted">{articles.publishedAt}</small></p>
                 </div>
               </div>

            )
            })
        }
        </div>
        <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        containerClassName="pagination"
        pageCount={Math.ceil(totalRecords/20)}
        onPageChange={(event) => {
          setPageNumber(event.selected + 1)

        }}
      />
        </div>
    )
}
export default NewsApp;