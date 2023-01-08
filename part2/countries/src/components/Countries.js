function CountryList({ countries, setFilter }) {
  return (
    <ul>
      {countries.map((country, id) => (
        <CountryRow key={id} country={country} setFilter={setFilter} />
      ))}
    </ul>
  );
}

function CountryRow({ country, setFilter }) {
  return (
    <li>
      {country.name.common}
      <button onClick={() => setFilter(country.name.common)}>
        Show
      </button>
    </li>
  );
}

function Country({ country }) {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital[0]}
        <br />
        Area: {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </>
  );
}

export default function Countries({ countries, setFilter }) {
  if (countries.length > 10) {
    return <div>Too many countries, specify another filter</div>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return <CountryList countries={countries} setFilter={setFilter} />;
}
