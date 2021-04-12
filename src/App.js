import React , { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, CardContent, Card } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData } from './util';

function App() {
  // STATE = How to write a variable in React 
  // https://disease.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // useEffect = Runs a piece of code
  // based on a given condition
  useEffect(() => {
    // The code inside here will run once when the component loads and not again
    // countries ==> code inside here will run once when the component loads while country change
    // async ==> send a request, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country)=> (
          {
          name: country.country,
          value: country.countryInfo.iso2
          }
        ));
        setTableData(sortData(data));
        setCountries(countries);
      })
    }

    getCountriesData();
    return () => {
      //cleanup
    };
  }, []);

  // https://disease.sh/v3/covid-19/countries/[country_Code]
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__left">    
        <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        value={country}
        onClick={onCountryChange}
        >
          <MenuItem value={"worldwide"}>World Wide</MenuItem>
          {
            countries.map(country => (
              <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
     
      <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />
      </div>
      <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new </h3>
            <LineGraph/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
