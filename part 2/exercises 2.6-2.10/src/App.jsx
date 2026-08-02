import { useState } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import EntirePerson from "./components/EntirePerson";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",number:"+92 306000000", id: crypto.randomUUID() },
    { name: "Jade Kolingam",number:"+92 1234241", id: crypto.randomUUID() },
    { name: "Micheal Strawburn",number:"+92 432423423", id: crypto.randomUUID() },
  ]);

  const [filteresPersonas, setFilteresPersonas] = useState([])  




  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} setFilteresPersonas={setFilteresPersonas} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <ul style={{listStyle:"none"}}>
        {filteresPersonas.map((person) => (
          <EntirePerson key={person.id} name={person.name} number={person.number}/>
        ))}
      </ul>
    </div>
  );
};

export default App;








         // Now we are using this same form in separate component

      {/* <form onSubmit={formSubmitHandler}>
        <div>
          name: <input  value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
        </div>
        <div>
          number: <input  value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}