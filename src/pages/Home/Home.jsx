import React, { useContext, useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCountries,filterCountries } from "../../slices/countrySlice";
import CountryCard from "../../components/CountryCard/CountryCard";
import { PacmanLoader } from "react-spinners";
import { myContext } from "../../App";
import Header from "../../components/Header/Header";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import {Select} from "@mui/material"
import { MenuItem } from "@mui/material";
import { search } from "../../slices/countrySlice"
import { Pagination } from "@mui/material";
import { paginate } from "../../store/utils/utils";

const Home = () => {
  const dispatch = useDispatch();
  const { dark } = useContext(myContext);
  const [pageSize , setPageSize] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
  const { countries, loading, error } = useSelector((state) => state.countries);


  useEffect(() => {
    dispatch(fetchAllCountries());
  }, []);

  const handleSearchChange1=(e)=>{
    console.log(e.target.value)
    let keyword = e.target.value;
    dispatch(search({countries: countries,keyword: keyword}))
  }

  const [region , setRegion] = useState('All')
  const handleFilterChange1 = (e) => {
setRegion(e.target.value);
dispatch(filterCountries({keyword : e.target.value}))
}

const handleFilterChange = (e) => {
  setCurrentPage(1)
  setRegion(e.target.value);
  dispatch(filterCountries({ keyword: e.target.value }));
};

const handlePageChange = (e, value) => {
  setCurrentPage(value)
}


const handleSearchChange = (e) => {
 setCurrentPage(1);
 setRegion("All")
  let keyword = e.target.value;
  dispatch(search({ countries: countries, keyword: keyword }));
}; 

let paginatedResults = countries && paginate(countries, currentPage-1, pageSize);
  return (
    <>
      {/* Spinner start */}
      {!loading && !countries && error && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop:"20px auto",
            width:"80mk%"
          }}
        >
          <h1 style={{ color: "red", opacity: "0.7" }}>{error}</h1>
        </div>
      )}
      {!error && !countries && loading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          // <PacmanLoader color="rgb(20, 19, 19)" size={40} />
        </div>
      )}
      {/* Spinner end */}
      <TextField 
          id="outline"
          label="Search"
          variant="outlined"
          size="normal"
          margin="none"
          onChange={handleSearchChange}
          sx={{width:"40%"}}/>
         <FormControl sx={{width : "20%"}}>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleFilterChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
            <MenuItem value={"Oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>


      <div
        className="country-wrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
          marginTop: "50px",
        }}
      >
        {!loading &&
          !error &&
          paginatedResults &&
          paginatedResults.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
      </div>
      <div style={{paddingBlock : "30px" , display : "flex", justifyContent : "center"}}>
        { !loading && !error && countries&&(
      <Pagination color="primary" count={countries ? Math.ceil(countries.length / pageSize) : 0} page={currentPage} onChange={handlePageChange} />
      )} 
      </div>
    </>
  );
};

export default Home;
