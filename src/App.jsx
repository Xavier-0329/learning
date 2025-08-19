import { useEffect, useState } from "react";
import countryInfo from "./services/country";
import FilterCountries from "./components/FilterCountries";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryInfo.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const filterCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(country.toLowerCase())
  );

  const showButton = (countryName) => {
    setCountry(countryName);
  };


  return (
    <div>
      <div>
        find countries{" "}
        <input value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <FilterCountries filterCountries={filterCountries} showButton={showButton} />
      
    </div>
  );
};

export default App;
