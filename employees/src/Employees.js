import React, {useState} from 'react';


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
        return values;
      });
  
      setUserData(userData);
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
  
        {userData}
        <table>
  
          <tbody>
            {userData.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}