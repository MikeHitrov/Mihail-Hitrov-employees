import React, {useState} from 'react';
import GetCommonEmployees from './CommonEmployees';
import Employee from './Employee'


export default function EmployeesPage(){
    const [file, setFile] = useState();
    const [userData, setUserData] = useState([]);
  
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const csvFileToArray = string => {
      const csvRows = string.split("\n");
  
      const array = csvRows.map(i => {
        const values = i.split(",");

        const employeeId = values[0];
        const projetId = values[1];
        const dateFrom = Date.parse(values[2].trim());
        const dateTo = values[3].trim() === 'NULL' ? Date.now() : Date.parse(values[3].trim()); 

        let employee = new Employee(employeeId, projetId, dateFrom, dateTo);
        
        return employee;
      });
  
      setUserData(array);
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
  
        fileReader.readAsText(file);
      }
    };
  
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Common employees app</h1>
        <form>
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />
  
          <button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Import Data
          </button>
        </form>
  
        <br />

        {userData !== null ? <GetCommonEmployees data={userData}/> : <div/>}
      </div>
    );
}