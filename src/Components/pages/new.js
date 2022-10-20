import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateTimeDifference } from "../utility/Utility";

const New = () => {
  const URL = "https://hacker-news.firebaseio.com/v0";




  /* Hooks  */

  const [results, setresults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);




  /* fetching API  */

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const story = await axios.get(`${URL}/item/${id}.json`);
        return story;
      } catch (error) {
        console.log("Error");
        seterror(error);
      }
    };

    const getStories = async () => {
      setloading(true);
      try {
        const { data: storyIds } = await axios.get(`${URL}/newstories.json`);
        const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));
        setresults(stories);
        console.log(stories);
      } catch (error) {
        seterror(error);
      }
      setloading(false);
    };

    getStories();
  }, []);



  
  return (
    <div>
      {loading ? (
        <div className="loading">loading.....</div>
      ) : (
        <div className="stories-container">
          {results.map((result) => (
            <div key={result.data.id}>
              <a
                href={result.data.url}
                className="card-anchor"
                target="_blank"
                rel="noreferrer"
              >
                <article className="story">
                  <p className="title">{result.data.title}</p>
                  <p className="text">
                    <b>Author:</b>
                    {result.data.by}
                  </p>
                  <p className="story-footer">
                    {calculateTimeDifference(Date.now(), result.data.time)} ago
                    | {result.data.descendants} comments
                  </p>
                </article>
              </a>
            </div>
          ))}
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default New;
