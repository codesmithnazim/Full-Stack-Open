import phonebookServices from "../services/phonebook";
function EntirePerson({ person,  setPersons, setNegativeNotification }) {
  const deleteHandler = (e) => {
    if(window.confirm(`Do you really want to delete ${person.name} from your phonebook`)){
    e.target.style.backgroundColor = "blue";
    phonebookServices
      .deletePerson(person.id)
      .then((res) => {
        // setRefresh((before) => !before);
        setPersons(persons=>persons.filter(individual=>individual.id!=person.id))
        setNegativeNotification(`Information of ${person.name} is deleted successfuly from the server `)
        setTimeout(() => {
          setNegativeNotification('')
        }, 3000)
        

      })
      .catch((error) =>
        console.log(
          "catch of loc 20 n entirePErson compoent and the error = ",
          error,
        ),
      );
    }
      
  };
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={deleteHandler}>delete</button>
    </li>
  );
}

export default EntirePerson;
