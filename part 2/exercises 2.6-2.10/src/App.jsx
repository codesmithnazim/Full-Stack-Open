import { useEffect, useState } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import EntirePerson from "./components/EntirePerson";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteresPersonas, setFilteresPersonas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPersons(res.data);
        console.log("Our responce = ", res.data)
      })
      .catch((error) =>
        console.log(
          "The error catced during fetching from the json server",
          error,
        ),
      )
      .finally(() =>
        console.log("The data is successfully fetched from the json server"),
      );

  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} setFilteresPersonas={setFilteresPersonas} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {filteresPersonas.map((person) => (
          <EntirePerson
            key={person.id}
            name={person.name}
            number={person.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

// Now we are using this same form in separate component

{
  /* <form onSubmit={formSubmitHandler}>
        <div>
          name: <input  value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
        </div>
        <div>
          number: <input  value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */
}
