import { useState } from "react";
import phonebookServices from "../services/phonebook";
function PersonForm({ persons, setRefresh, setGreenNotification, setRedNotification }) {
  //   const [name, setname] = useState("");
  //   const [number, setnumber] = useState(""); //We can not make and maintain separate states for different inpputs in general forms
  const [form, setForm] = useState({ name: "", number: "" });
  console.log("the form object =", form);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      persons.some((person) => {
        return person.name === form.name;
      })
    ) {
      if (
        window.confirm(
          `${form.name} is already added to phonebook , Do you wanna replace old number with the new  number`,
        )
      ) {
        // Find and search are working for same purpose but search return us an array while find return us the first founded object only not array
        const id = persons.find((each) => each.name === form.name).id; //Here we'll get the id of the specific person we want to change the number
        // let id=array[0].id
        console.log("Ok, we are replacing.... and the id giver = ", id);
        phonebookServices
          .updateNumber(id, form)
          .then((res) => setRefresh((a) => !a));
        return;
      } else {
        return;
      }
    } else if (
      persons.some((person) => {
        return person.number === form.number;
      })
    ) {
      setRedNotification(`${form.number} is already exist in the phonebook `);
      setTimeout(() => {
        setRedNotification('')
      }, 2500)
      
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
        setGreenNotification("User is added successfully ....");
        setRefresh((before) => !before);
        console.log("the responce we get fromt he post req = ", res);
        setTimeout(() => {
          setGreenNotification("");
        }, 3000);
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
