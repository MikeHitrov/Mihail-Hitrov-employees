import React, {useState} from 'react';


export default function GetCommonEmployees({data}){
    // const [common, setCommon] = useState();

    // const extractEmployees = data => {
    //     return data.filter(u => u[1])
    // }
  
    return (
        <div style={{ textAlign: "center" }}>
        {data.map(a => <li key={a.id + a.projectId}> 
          {a.id}
        </li>)}
      </div>
    );
}