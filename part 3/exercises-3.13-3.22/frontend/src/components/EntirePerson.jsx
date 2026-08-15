import phonebookServices from "../services/phonebook";
function EntirePerson({ person,  setPersons, setNegativeNotification }) {
  const deleteHandler = (e) => {
    if(window.confirm(`Do you really want to delete ${person.name} from your phonebook`)){
    e.target.style.backgroundColor = "red";
    e.target.style.color="white";
    phonebookServices
      .deletePerson(person._id)
      .then((res) => {
        // setRefresh((before) => !before);
        setPersons(persons=>persons.filter(individual=>individual._id!=person._id))
        setNegativeNotification(`Information of ${person.name} is deleted successfuly from the server `)
        setTimeout(() => {
          setNegativeNotification('')
        }, 3000)
      })
      .catch((error) =>
        console.trace(
          "catch of EntirePerson component and the error = ",
          error,
        ),
      );
    }
      
  };
  return (
    <li>
      {person.name} {person.phone}{" "}
      <button onClick={deleteHandler} style={{overflow:"hidden"}}>delete</button>
    </li>
  );
}

export default EntirePerson;
