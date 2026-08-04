import { useEffect, useState } from "react";
import axios from "axios";
// import "dotenv/config";

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [oneCountry, setOneCountry] = useState(null);

  const newsugestions = (data) => {
    // console.log("All countries names", allCountries);
    setSuggestions(
      allCountries.filter((each) =>
        each.toLowerCase().includes(data.toLowerCase()),
      ),
    );
  };

  const searchCountry = (countryName) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`,
      )
      .then((res) => {
        axios
          .get(
            `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=${res.data.capital}`,
          )
          .then((res2) => {
            setOneCountry((details) => {
              return {
                ...details,
                id: crypto.randomUUID(),
                name: res.data.name.common,
                capital: res.data.capital,
                area: res.data.area,
                languages: res.data.languages,
                flag: res.data.flags.png,
                temp_c: res2.data.current.temp_c,
                wind_kph: res2.data.current.wind_kph,
                icon: res2.data.current.condition.icon,
              };
            });
          });
      });
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setAllCountries(res.data.map((count) => count.name.common));
        console.log(res);
      });
  }, []);

  return (
    <div>
      find countries :{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          newsugestions(e.target.value);
        }}
      />
      <ul>
        {suggestions.length > 10 || !suggestions
          ? "Too many macthes, try searching different"
          : suggestions.map((countryName) => (
              <li
                key={countryName}
                style={{
                  border: "2px solid black",
                  cursor: "pointer",
                  margin: "5px",
                  padding: "10px 100px 10px 20px",
                  width: "fit-content",
                  borderRadius: "16px",
                }}
                onClick={() => searchCountry(countryName)}
              >
                {countryName}
              </li>
            ))}
      </ul>
      {oneCountry && (
        <div className="details">
          <h1>{oneCountry.name}</h1>
          <div>capital {oneCountry.capital}</div>
          <div>Area {oneCountry.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.entries(oneCountry.languages).map(([key, value]) => {
              return <li key={oneCountry.id.concat("wow")}>{value}</li>;
            })}
            {/* {oneCountry.languages.map(a=><li key={oneCountry.id.concat("wow")}></li>)} */}
          </ul>

          <img
            src={`${oneCountry.flag}`}
            alt={`The picture of ${oneCountry.name} flag `}
          />
          <h2>Weather in {oneCountry.name} </h2>
          <div>Temperature {oneCountry.temp_c} C </div>
          <img src={`${oneCountry.icon}`} alt="the weather icon is missing" />
          <div className="wind">wind {oneCountry.wind_kph} kph</div>
        </div>
      )}
    </div>
  );
}

export default App;
