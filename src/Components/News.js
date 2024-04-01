import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import { useEffect } from 'react';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  //document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*  constructor(props) {
      super(props);
      console.log("Hello from constructor of News component");
      this.state = {
        articles: [],//this.articles,
        loading: true,
        page: 1,
        totalResults: 0
      }
      document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
    }
  */

  const updateNews = async (props) => {
    //  props.setProgress(10);
    console.log(props);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //  this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    //  props.setProgress(40);
    let parsedData = await data.json()
    //  props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    /*  this.setState({
        totalResults: parsedData.totalResults,
        articles: parsedData.articles,
        loading: false
      })*/
    //  props.setProgress(100);
  }

  useEffect(() => {
    updateNews(props);
  // eslint-disable-next-line
  },[]);
  /*
  async componentDidMount() {
    //  console.log('cdm');
    /*  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10d085369dea4e56881a8df192bc764e&page=1&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      })*/
  /*    this.updateNews();
   }
   */
  const handlePrevClick = async () => {

    /*  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10d085369dea4e56881a8df192bc764e&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
      */
    //  this.setState({ page: this.state.page - 1 });
    setPage(page - 1)
    this.updateNews();

  }

  const handleNextClick = async () => {
    /*   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
   
           let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10d085369dea4e56881a8df192bc764e&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
           this.setState({ loading: true });
           let data = await fetch(url);
           let parsedData = await data.json()
           console.log(parsedData);
           this.setState({
             page: this.state.page + 1,
             articles: parsedData.articles,
             loading: false
           })
          }*/
    //  this.setState({ page: this.state.page + 1 });
    setPage(page + 1)
    this.updateNews();

  }

  const fetchMoreData = async (props) => {
    //this.setState({ page: this.state.page + 1 })
    
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };  
  
return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {/*  {loading && <Spinner />}  */}
      <InfiniteScroll
        dataLength={articles.length}
        next={() => fetchMoreData(props)}
        hasMore={articles.length <= totalResults}
        loader={<Spinner />}
      >

        <div className="container my-3">
          <div className="row">
            {/*    {!this.state.loading && this.state.articles.map((element) => {  */}

            {articles.map((element, index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/*     <div className="container d-flex justify-content-between">

          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>


        </div>
        */}


    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News