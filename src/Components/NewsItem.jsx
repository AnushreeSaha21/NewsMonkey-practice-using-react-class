import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-warning" style={{ left: "90%", zIndex: 1 }}>
            {source}
          </span>

          <img src={!imageUrl ? "https://english.cdn.zeenews.com/sites/default/files/2023/12/13/1335429-ayurveda-kidney.png" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="__blank" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
