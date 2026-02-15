import { useEffect, useState } from "react";
import "./Joke.css";

export default function Joke() {
  let [joke, setJoke] = useState({});
  let [type, setType] = useState("random");
  const getUrl = () => {
    if (type === "random") {
      return "";
    } else {
      return `https://ofhttps://official-joke-api.appspot.com/random_jokeficial-joke-api.appspot.com/jokes/${type}/random`;
    }
  };

  const getNewJoke = async () => {
    let response = await fetch(getUrl());
    let jsonResponse = await response.json();
    let jokeData = type === "random" ? jsonResponse : jsonResponse[0];

    setJoke({
      setup: jokeData.setup,
      punchline: jokeData.punchline,
    });
  };

  useEffect(() => {
    getNewJoke();
  }, [type]);

  return (
    <div>
      <h2 className="heading">
        <i className="fa-regular fa-face-laugh-beam"></i> Random Joke Generator
      </h2>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="random">Random</option>
        <option value="general">General</option>
        <option value="programming">Programming</option>
        <option value="knock-knock">Knock Knock</option>
      </select>
      <div className="card">
        <h3>{joke.setup || "Loading..."}</h3>
        <p>{joke.punchline}</p>
      </div>

      <button onClick={getNewJoke}>Get New Joke</button>
    </div>
  );
}
