import React, { useState, useEffect } from "react";
import Datatable from "./datatable/index";
import TagInput from './chips'

require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {

  const [data, setData]  = useState([])
  const [q, setQ] = useState("")
  const [searchColumns, setSearchColumns] = useState(["region", "unitName", "specialism"])

  useEffect(() => {
    const fetchData = async () =>{
      await fetch("http://helixsmartlabs.in/portfolio/old/bed_bureau/bed.php")
              .then(async response => await response.json())
              .then(async json => await setData(json.beds));
    }
    fetchData();
  }, [data])

  function search(rows) {
    return rows.filter(row => 
        searchColumns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
      )
  }

  const columns = data[0] && Object.keys(data[0])

  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {columns && columns.map((column) => <label className="px-2">
          <input type="checkbox" checked={searchColumns.includes(column)} onChange = {(e) => {
            const checked = searchColumns.includes(column)
            setSearchColumns(prev => checked
              ? prev.filter(sc => sc !== column)
              : [...prev, column])
          }}/>
          &nbsp;
          {column}
          </label>)}
      </div>
      <div>
        <Datatable  data={search(data)}/>
      </div>
      <div>
        <TagInput />
      </div>
    </div>
  );
}

export default App;
