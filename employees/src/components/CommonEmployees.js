import React, {useState} from 'react';


export default function GetCommonEmployees({data}){
    const [common, setCommon] = useState();

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
          <tr>
            <th>Employee #1</th>
            <th>Employee #2</th>
            <th>Project ID</th>
            <th>Days worked</th>
          </tr>
        </thead>
        <tbody>
        {common !== undefined ?? common.map(a => <tr key={a.id + a.projectId}> 
          <td>{a.projectId}</td>
          <td>{dateDiffInDays(a.dateFrom, a.dateTo)}</td>
        </tr>)}
        </tbody>
      </table>

        <div style={{ textAlign: "center" }}>
        
      </div>
      </>
    );
}