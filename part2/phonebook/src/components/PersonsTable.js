const PersonRow = ({ person, deleteHandler }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
};

const PersonsTable = ({ persons, deletePerson }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => {
          return (
            <PersonRow
              key={person.id}
              person={person}
              deleteHandler={() => {
                if (
                  window.confirm(`Do you really want to delete ${person.name}`)
                ) {
                  deletePerson(person.id);
                }
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonsTable;
