import { useState } from "react";
import phonebookServices from "../services/phonebook";
function PersonForm({
  persons,
  setPersons,
  setRefresh,
  setGreenNotification,
  setRedNotification,
}) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setRedNotification("Phone number or name is missing");
      setTimeout(() => {
        setRedNotification("");
      }, 1300);
      return;
    } else if (
      persons.some((person) => {
        return person.name === form.name;
      })
    ) {
      if (
        window.confirm(
          `${form.name} is already added to phonebook , Do you wanna replace old phone-number with the new  number`,
        )
      ) {
        // Find and search are working for same purpose but search return us an array while find return us the first founded object only not array
        let _id = persons.find((each) => each.name === form.name)._id; //Here we'll get the id of the specific person we want to change the number
        // let id=array[0].id
        console.log("Ok, we are replacing the phone number of the person with id = ", _id);

        // Update function
        phonebookServices // it'll called if the above if get true.
          .updateNumber(_id, form.phone)
          .then((mongoRes) => {
            console.log(
              "the updated person number object returned to the frontend ",
              mongoRes,
            );
              setPersons(allPersons=>allPersons.map(person=>person._id == _id ? mongoRes : person))
            console.log(
              "update process is completed and the resulted ",
              persons,
            );
            form.name=''
            form.phone=''
          })
          .catch((error) => console.trace(error.response.data.error));
        return;
      } else {
        return;
      }
    }

    // axios //Axios makes the things easy for us such as the one example is given below
    //   .post("http://localhost:3001/persons", form)

    // fetch("/api/persons", {   //You can check difference between fetch and axios now here. fetch does not care status, I mean it suppose that request was successful, if res.send() occur in express, even res.status(404).send({error:error})
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // })

    phonebookServices
      .addPerson(form)
      .then((mongoRes) => {
        // setRefresh((before) => !before);
        setPersons(persons.concat(mongoRes.data));
        console.log("Updated persons = ", persons);
        console.log(
          "the responce we get from the express through post request = ",
          mongoRes.data,
        );
        setGreenNotification("User is added successfully ....");
        setTimeout(() => {
          setGreenNotification("");
        }, 3000);
      })
      .catch((error) => {
        console.log(
          "the catch from the PersonForm component,and the error =  ",
          error?.response?.data?.error,
        );
        // let message = `${Object.entries(error?.response?.data?.message).map(([key, value]) => value)} Number already exists`;
        let message = error?.response?.data?.error
        setRedNotification(message);
        setTimeout(() => {
          setRedNotification("");
        }, 15000);
      });
    // form.name("");
    // form.number("");
    // setForm((entity)=>{...entity, name:"", number:""} )
    setForm((entity) => {
      return { ...entity, name: "", phone: "" };
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
          value={form.phone}
          onChange={(e) => {
            setForm((entity) => {
              return { ...entity, phone: e.target.value };
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
