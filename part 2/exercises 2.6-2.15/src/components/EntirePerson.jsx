import phonebookServices from "../services/phonebook";
function EntirePerson({ person,  setPersons }) {
  const deleteHandler = (e) => {
    if(window.confirm(`Do you really want to delete ${person.name} from your phonebook`)){
    e.target.style.backgroundColor = "blue";
    phonebookServices
      .deletePerson(person.id)
      .then((res) => {
        // setRefresh((before) => !before);
        setPersons(persons=>persons.filter(individual=>individual.id!=person.id))
        

      })
      .catch((error) =>
        console.log(
          "catch of loc 4 n entirePErson compoent and the error = ",
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
