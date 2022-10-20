import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";




 /* Time  */
const timestampToday = Math.round(new Date().getTime() / 1000);
const timestampYesterday = timestampToday - 24 * 3600;
const timestampAWeekAgo = timestampToday - 7 * 24 * 3600;
const timestampAMonthAgo = timestampToday - 30 * 24 * 3600;
const timestampAYearAgo = timestampToday - 365 * 24 * 3600;





const Search = () => {
  /* Hooks  */

  const [results, setresults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [query, setquery] = useState("");
  const [tags, settags] = useState("story");
  const [pagecount, setpagecount] = useState(0);
  const [time, settime] = useState(timestampAYearAgo);




  /* fetching API  */

  useEffect(() => {
    const fetchResults = async () => {
      setloading(true);
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${query}&tags=${tags}&numericFilters=created_at_i>${time}&page=${pagecount}`
        );
        setresults(response.data.hits);
      } catch (err) {
        seterror(err);
      }
      setloading(false);
    };

    fetchResults();
  }, [query, tags, pagecount, time]);

  

  const Handlesearch = (e) => {
    e.preventDefault();
  };

  function storychange(e) {
    settags(e.target.value);
  }

  function statechange(e) {}


  function bytime(e) {
    settime(e.target.value);
  }

  const Increment = () => {
    setpagecount(pagecount + 1);
  };

  const Decrement = () => {
    setpagecount(pagecount - 1);
  };

  
  return (
    <div>
      <div>
        <div>
          <form onSubmit={Handlesearch} className="searchcontainer">
            <input
              value={query}
              onChange={(e) => setquery(e.target.value.toLowerCase())}
              className="searchinput"
              placeholder="  search.."
            ></input>
          </form>
        </div>
        <div>
          <div className="selectcontainer">
            <select className="selectbox" onChange={storychange}>
              <option value="all">All</option>
              <option value="story">story</option>
              <option value="comment">comment</option>
            </select>

            <select
              name="popularity"
              className="selectbox"
              onChange={statechange}
            >
              <option value="popularity">popularity</option>
              <option value="byDate">Date</option>
            </select>

            <select name="All time" className="selectbox" onChange={bytime}>
            <option value={time}>All time</option>
              <option value={timestampYesterday}>Last 24h</option>
              <option value={timestampAWeekAgo}>past week</option>
              <option value={timestampAMonthAgo}>Past Month</option>
              <option value={timestampAYearAgo}>Past year</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">loading.....</div>
        ) : (
          <div>
            <div className="stories-container">
              {results.map((result) => (
                <div key={result.objectID}>
                  <a
                    href={result.url}
                    className="card-anchor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <article className="story">
                      <p className="title">{result.title}</p>
                      <p className="text">{result.ERWERWERWEarticle}</p>
                      <p className="story-footer">
                        {result.descendants} comments
                      </p>
                    </article>
                  </a>
                </div>
              ))}
            </div>

            <div className="loadbuttoncontainer">
              {pagecount < 1 ? (
                <button onClick={Increment} className="loadbutton">
                  Load more
                </button>
              ) : (
                <div className="loadnext">
                  <button onClick={Decrement} className="loadbutton">
                    Go back
                  </button>
                  <button onClick={Increment} className="loadbutton">
                    Go next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
};

export default Search;
