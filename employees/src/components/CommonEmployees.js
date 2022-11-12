import React, { useState, useEffect } from "react";
import "./styles/CommonEmployees.css";

export default function GetCommonEmployees({ data }) {
  const [common, setCommon] = useState([]);

  useEffect(() => {
    const userData = extractEmployees(data);
    setCommon(userData);
  });

  const setCommonWorkingDays = (a, b) => {
    if (
      !common.some(
        (commonItem) =>
          ((commonItem.firstEmployeeId == a.id &&
            commonItem.secondEmployeeId == b.id) ||
            (commonItem.firstEmployeeId == b.id &&
              commonItem.secondEmployeeId == a.id)) &&
          commonItem.projectId == a.projectId &&
          commonItem.projectId == b.projectId
      )
    ) {
      if (a.dateFrom <= b.dateFrom) {
        if (a.dateTo >= b.dateTo) {
          let daysInCommon = dateDiffInDays(a.dateFrom, a.dateTo);

          setCommon(
            common.push({
              firstEmployeeId: a.id,
              secondEmployeeId: b.id,
              projectId: a.projectId,
              days: daysInCommon,
            })
          );
        } else {
          let daysInCommon = dateDiffInDays(a.dateFrom, a.dateTo);

          setCommon(
            common.push({
              firstEmployeeId: a.id,
              secondEmployeeId: b.id,
              projectId: a.projectId,
              days: daysInCommon,
            })
          );
        }
      } else {
        let daysInCommon = dateDiffInDays(a.dateFrom, a.dateTo);

        if (a.dateTo >= b.dateTo) {
          setCommon(
            common.push({
              firstEmployeeId: a.id,
              secondEmployeeId: b.id,
              projectId: a.projectId,
              days: daysInCommon,
            })
          );
        } else {
          let daysInCommon = dateDiffInDays(a.dateFrom, a.dateTo);

          setCommon(
            common.push({
              firstEmployeeId: a.id,
              secondEmployeeId: b.id,
              projectId: a.projectId,
              days: daysInCommon,
            })
          );
        }
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
      return a.days >= b.days ? 1 : -1;
    });

    return sorted;
  };

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

  console.log(common);

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
              <td>{a.days}</td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}
