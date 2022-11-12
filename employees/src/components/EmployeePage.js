import React, { useState } from "react";
import GetCommonEmployees from "./CommonEmployees";
import Employee from "./Employee";
import "./styles/EmployeePage.css";

export default function EmployeesPage() {
  const [file, setFile] = useState();
  const [userData, setUserData] = useState([]);
  const parser = require("any-date-parser");

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvRows = string.split("\n");

    const data = csvRows.map((row) => {
      const [employeeId, projectId, dateFromInput, dateToInput] =
        row.split(",");

      const parsedDateFromData = parser.attempt(dateFromInput.trim());
      const dateFrom = new Date(
        parsedDateFromData.year,
        parsedDateFromData.month,
        parsedDateFromData.day
      );

      let dateTo = new Date();

      if (dateToInput.trim() !== "NULL") {
        const parsedDateToData = parser.attempt(dateToInput.trim());
        dateTo = new Date(
          parsedDateToData.year,
          parsedDateToData.month,
          parsedDateToData.day
        );
      }

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
        <div className="file-input">
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            className={"file"}
            onChange={handleOnChange}
          />
          <label htmlFor="csvFileInput">
            {file !== undefined ? file.name : "Select file"}
          </label>
        </div>

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Import Data
        </button>
      </form>

      <br />

      {userData.length !== 0 ? <GetCommonEmployees data={userData} /> : <div />}
    </div>
  );
}
