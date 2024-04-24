import React, {useState} from "react";
import "./App.css";
// import {getDummyDataDemo} from "./static/script";
import {fetchDockets} from "./static/script";
import SearchBar from "./components/SearchBar";
import DocketList from "./components/DocketList";

function App() {
 const [dockets, setDockets] = useState([]); // Initialize docket state to false
 const [email, setEmail] = useState();
 const [totalResults, setTotalResults] = useState(0);
 const [page, setPage] = useState(0);
 const [term, setTerm] = useState("");

 const handleOnClick = async (term) => {
  try {
   // This will display a message if the search term is invalid or no results are found
   // It still has issues with some search terms such as ' ' (a single space)
   setTerm(term);
   if (!term) {
    alert("Please enter a valid search term.");
    return;
   } else {
    const data = await fetchDockets(term, page);
    setPage(page + 1);

    if (data.data.dockets.length === 0) {
     alert("No results found for: '" + term + "'");
     return;
    } else {
     setDockets([...dockets, ...data.data.dockets]);
     setTotalResults(data.meta.total_results);
    }
   }
  } catch (error) {
   console.log(error);
  }
 };

 const handleInputChange = async (event) => {
  setEmail(event.target.value);
 };

 return (
  <div className="App">
   <input
    type="text"
    value={email}
    onChange={handleInputChange}
    placeholder="Enter Email"
    className="search-input" // Add the search-input class
   />
   <h1>Mirrulations Search</h1>
   <div>
    <SearchBar handleOnClick={handleOnClick} />
    {/* list total number of dockets found for the term */}
    {totalResults > 0 && <h2>{totalResults} Results Found</h2>}
    {dockets && <DocketList dockets={dockets} />}{" "}
    {/* Render SearchResultsList only if dockets is true */}
   </div>
   <div></div>
   {dockets && dockets.length > 0 && dockets.length < totalResults && (
    <button
     onClick={() => {
      handleOnClick(term);
     }}>
     Load Other Docket
    </button>
   )}
  </div>
 );
}

export default App;
