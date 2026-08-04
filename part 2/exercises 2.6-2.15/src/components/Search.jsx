import {useState, useEffect } from "react";

function Search({ persons, setFilteresPersonas }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const changePersons = () => {
      console.log("ctrl of exec... came in search comp...");
      let filteredPersons = persons.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
      setFilteresPersonas(filteredPersons);
    };
    changePersons();

    return () => {};
  }, [query,persons]);

  return (
    <div style={{ marginBottom: "12px" }}>
      Filter saved numbers
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
