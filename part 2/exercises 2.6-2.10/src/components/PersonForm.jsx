import  { useState } from "react";

function PersonForm({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      persons.some((person) => {
        return person.name === newName;
      }) ||
      persons.some((person) => {
        return person.number === newNumber;
      })
    ) {
      alert(`${newName} or ${newNumber} is already exist in the phonebook `);
      return;
    }
    setPersons((persons) => [...persons, { name: newName, number: newNumber , id: crypto.randomUUID() }]);
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
