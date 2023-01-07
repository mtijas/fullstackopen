const PersonRow = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

const PersonsTable = ({ persons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => <PersonRow key={person.id} person={person} />)}
      </tbody>
    </table>
  )
}

export default PersonsTable