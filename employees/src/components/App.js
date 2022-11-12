import { useEffect } from 'react';
import EmployeesPage from './EmployeePage';
import './styles/App.css';

function App() {
  useEffect(() => {
    // change background color with a random color
   
  const color = '#282c34' 
    document.body.style.background = color;
  });

  return (
    <div className="App">
      <EmployeesPage />
    </div>
  );
}

export default App;
