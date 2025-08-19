const FilterCountries = ({ filterCountries, showButton }) => {
  if (filterCountries.length <= 10 && filterCountries.length > 1) {
    return (
      <ul>
        {filterCountries.map((country) => (
          <li key={country.cca3}>{country.name.common} <button onClick={() => showButton(country.name.common)}>Show</button></li>
        ))}
      </ul>
    );
  } else if (filterCountries.length > 10) {
    return <div>Too many results</div>;
  } else if (filterCountries.length === 0) {
    return <div>No results found</div>;
  } else {
    return(
        <div>
            <h1>{filterCountries[0].name.common}</h1>
            <p>Capital {filterCountries[0].capital}</p>
            <p>Area {filterCountries[0].area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(filterCountries[0].languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={filterCountries[0].flags.png} alt={filterCountries[0].name.common} />
        </div>
    )
  }
};

export default FilterCountries;
