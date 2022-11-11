import React, {useState} from 'react';


export default function GetCommonEmployees({data}){
    const [common, setCommon] = useState({});

    const extractEmployees = data => {
        setCommon(data.filter(u => u.projectId))
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }
  
    return (
        <>
        <table>
        <thead>
          <tr>Employee #1</tr>
          <tr>Employee #2</tr>
          <tr>Project ID</tr>
          <tr>Days worked</tr>
        </thead>
        <tbody>
        {data.map(a => <li key={a.id + a.projectId}> 
          <tr>{a.id}</tr>
          <tr>{a.projectId}</tr>
          <tr>{dateDiffInDays(a.dateFrom, a.dateTo)}</tr>
        </li>)}
        </tbody>
      </table>

        <div style={{ textAlign: "center" }}>
        
      </div>
      </>
    );
}