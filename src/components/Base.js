import ReactTable from "react-table-6";
import React, { useState } from 'react'
import "react-table-6/react-table.css"
import * as xlsx from 'xlsx';
import './Base.css'

const Base = () => {
    const [empdata, setEmpData] = useState([]);
    const getResult = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = xlsx.read(data, { type: 'array' });
    const sheet = workbook.SheetNames[0];
    const excelsheet = workbook.Sheets[sheet];
    const employeeList = xlsx.utils.sheet_to_json(excelsheet);
    console.log(employeeList);
    setEmpData(employeeList);
    };
    reader.readAsArrayBuffer(file);
  };

  const columns = [
    {
        Header: "ID",
        accessor: "ID",
        filterable: true, 
      },
      {
        Header: "Name",
        accessor: "Name",
        filterable: true, 
      },
      {
        Header: "Position",
        accessor: "Title",
        filterable: true, 
      },
      {
        Header: "Age",
        accessor: "Age",
        filterable: true, 
    },
    {
      Header: 'Gender',
      accessor: 'Gender',
      filterable: true,
    },
      {
        Header: "Salary",
        accessor: "Salary",
        filterable: true,
    },
    {
      Header: "City",
      accessor: "City",
      filterable: true,
    },
  ];

  return (
    <div>
      
      <ReactTable
        data={empdata}
        columns={columns}
        defaultSorted={[{ id: "ID", desc: false }]}
        defaultPageSize={10}
        sortable={true}
        collapseOnDataChange={false}
        collapsible={true}
        filterable={true}
        className="-striped -highlight"
      />
      <input
        className="form-control"
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            getResult(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default Base;
