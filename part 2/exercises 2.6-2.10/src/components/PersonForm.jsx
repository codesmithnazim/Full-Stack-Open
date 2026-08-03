import axios from "axios";
import { useState } from "react";

function PersonForm({ persons, setRefresh }) {
  //   const [name, setname] = useState("");
  //   const [number, setnumber] = useState(""); //We can not make and maintain separate states for different inpputs in general forms
  const [form, setForm] = useState({ name: "", number: "" });
  console.log("the form object =", form);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      persons.some((person) => {
        return person.name === form.name;
      }) ||
      persons.some((person) => {
        return person.number === form.number;
      })
    ) {
      alert(
        `${form.name} or ${form.number} is already exist in the phonebook `,
      );
      return;
    }
    // setPersons((persons) => [
    //   ...persons,
    //   { name: form.name, number: form.number, id: crypto.randomUUID() },
    // ]);

    // axios //Axios makes the things easy for us such as the one example is given below
    //   .post("http://localhost:3001/persons", form)

    fetch("http://localhost:3001/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        setRefresh((before) => !before);
        console.log("the responce we get fromt he post req = ", res);
      })
      .catch((error) =>
        console.log("the error we got from the post request ", error),
      );
    // form.name("");
    // form.number("");
    // setForm((entity)=>{...entity, name:"", number:""} )
    setForm((entity) => {
      return { ...entity, name: "", number: "" };
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        name:{" "}
        <input
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={form.number}
          onChange={(e) => {
            setForm((entity) => {
              return { ...entity, number: e.target.value };
            });
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
