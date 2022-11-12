import React, { useState } from "react";
import './styles/CommonEmployees.css';

export default function GetCommonEmployees({ data }) {
  const [common, setCommon] = useState([]);

  const setCommonWorkingDays = (a, b) => {
    if (a.dateFrom <= b.dateFrom) {
      if (a.dateTo >= b.dateTo) {
        setCommon(
          common.push({
            firstEmployeeId: a.id,
            secondEmployeeId: b.id,
            projectId: a.projectId,
            days: dateDiffInDays(a.dateFrom, a.dateTo),
          })
        );
      } else {
        setCommon(
          common.push({
            firstEmployeeId: a.id,
            secondEmployeeId: b.id,
            projectId: a.projectId,
            days: dateDiffInDays(a.dateFrom, b.dateTo),
          })
        );
      }
    } else {
      if (a.dateTo >= b.dateTo) {
        setCommon(
          common.push({
            firstEmployeeId: a.id,
            secondEmployeeId: b.id,
            projectId: a.projectId,
            days: dateDiffInDays(b.dateFrom, a.dateTo),
          })
        );
      } else {
        setCommon(
          common.push({
            firstEmployeeId: a.id,
            secondEmployeeId: b.id,
            projectId: a.projectId,
            days: dateDiffInDays(b.dateFrom, b.dateTo),
          })
        );
      }
    }
  };

  const extractEmployees = (data) => {
    data.sort((a, b) => {
      if (a.projectId === b.projectId) {
        if (a.dateFrom >= b.dateFrom && a.dateTo <= b.dateTo) {
          setCommonWorkingDays(a, b);
          return 1;
        } else if (b.dateFrom >= a.dateFrom && b.dateTo <= a.dateTo) {
          setCommonWorkingDays(a, b);
          return 1;
        }
        return -1;
      }
      return -1;
    });

    const sorted = common.sort((a, b) => {
      return a.commonProject.days >= b.commonProject.days ? 1 : -1;
    });

    return sorted;
  };

  if (common.length === 0) {
    setCommon(extractEmployees(data));
  }

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    if (a !== undefined && b !== undefined) {
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    return 0;
  }

  return (
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
        {common.length > 0 ? (
          common.map((a) => (
            <tr key={a.firstEmployeeId + a.secondEmployeeId}>
              <td>{a.firstEmployeeId}</td>
              <td>{a.secondEmployeeId}</td>
              <td>{a.projectId}</td>
              <td>{dateDiffInDays(a.dateFrom, a.dateTo)}</td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}
