import  { useState } from "react";

function PersonForm({ persons, setPersons }) {
//   const [newName, setNewName] = useState("");
//   const [newNumber, setNewNumber] = useState("");
    const [form, setForm] = useState({newName:"", newNumber:""})
    console.log("the form object =", form)
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      persons.some((person) => {
        return person.name === form.newName;
      }) ||
      persons.some((person) => {
        return person.number === form.newNumber;
      })
    ) {
      alert(`${form.newName} or ${form.newNumber} is already exist in the phonebook `);
      return;
    }
    setPersons((persons) => [...persons, { name: form.newName, number: form.newNumber , id: crypto.randomUUID() }]);
    // form.newName("");
    // form.newNumber("");
    // setForm((entity)=>{...entity, newName:"", newNumber:""} )
    setForm((entity)=>{return { ...entity, newName:"", newNumber:""}})

  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        name:{" "}
        <input
          value={form.newName}
          onChange={(e) => {
            setForm({ ...form, newName: e.target.value });
          }}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={form.newNumber}
          onChange={(e) => {
            setForm((entity)=>{return {...entity, newNumber: e.target.value}});
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
