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
  
      const data = csvRows.map(row => {
        const [employeeId, projectId, dateFromInput, dateToInput] = row.split(",");

        const [dateFromYear, dateFromMonth, dateFromDay] = dateFromInput.split('-');
        const dateFrom = new Date(dateFromYear, dateFromMonth, dateFromDay);

        const dateTo = dateToInput.trim() === 'NULL' ? new Date() : new Date(dateToInput.trim()); 

        let employee = new Employee(employeeId, projectId, dateFrom, dateTo);
        
        return employee;
      });
  
      setUserData(data);
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const result = event.target.result;
          csvFileToArray(result);
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

        {userData.length !== 0 ? <GetCommonEmployees data={userData}/> : <div/>}
      </div>
    );
}