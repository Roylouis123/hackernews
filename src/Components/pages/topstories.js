import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
import { calculateTimeDifference } from "../utility/Utility";



const Topstories = () => {


  const url = "https://hacker-news.firebaseio.com/v0";



  /* Hooks  */

  const [topstories, settopstories] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);



  
  /* fetching API  */

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const story = await axios.get(`${url}/item/${id}.json`);
        return story;
      } catch (error) {
        seterror(error);
      }
    };

    const getStories = async () => {
      setloading(true);
      try {
        const { data: storyIds } = await axios.get(`${url}/topstories.json`);
        const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));
        settopstories(stories);
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
          {topstories.map((result) => (
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

          <div></div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Topstories;
