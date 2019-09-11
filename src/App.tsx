import React, { useState, useMemo } from "react";
import "./App.css";
import Table, { Datum } from "./Table";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const automobiles: Datum[] = [
  {
    id: 1,
    manufacturer: "Ford",
    model: "Focus"
  },
  {
    id: 2,
    manufacturer: "Ford",
    model: "Mustang"
  },
  {
    id: 3,
    manufacturer: "Ford",
    model: "F-150"
  },
  {
    id: 4,
    manufacturer: "Chevrolet",
    model: "Corvette"
  },
  {
    id: 5,
    manufacturer: "Chevrolet",
    model: "Equinox"
  },
  {
    id: 6,
    manufacturer: "Tesla",
    model: "Model 3"
  },
  {
    id: 7,
    manufacturer: "Toyota",
    model: "Camry"
  },
  {
    id: 8,
    manufacturer: "Dodge",
    model: "Charger"
  },
  {
    id: 9,
    manufacturer: "Dodge",
    model: "Challenger"
  }
];

const createClassRow = (
  id: number,
  subject: string,
  numberStudents: number,
  averageGrade: number
) => {
  return {
    id,
    subject,
    numberStudents,
    averageGrade
  };
};

const classes: Datum[] = [
  createClassRow(1, "Math", 23, 3.4),
  createClassRow(2, "Science", 12, 2.8),
  createClassRow(3, "English", 23, 2.9),
  createClassRow(4, "Social", 23, 3.8),
  createClassRow(5, "Gym", 23, 2.1),
  createClassRow(6, "Music", 23, 1.9)
];

const dataSets = [automobiles, classes];

const Buttons = styled.div`
  display: flex;
  margin-bottom: 12px;
  && > * {
    margin-right: 12px;
  }
`;

const App: React.FC = () => {
  const [dataSetIndex, setDataSetIndex] = useState(0);
  const dataSet = useMemo(() => {
    return dataSets[dataSetIndex];
  }, [dataSetIndex]);

  return (
    <div className="App">
      <Buttons>
        <Button
          variant={dataSetIndex === 0 ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setDataSetIndex(0)}
        >
          Data set 1
        </Button>
        <Button
          variant={dataSetIndex === 1 ? "contained" : "outlined"}
          onClick={() => setDataSetIndex(1)}
          color="secondary"
        >
          Data set 2
        </Button>
      </Buttons>

      <Table
        key={dataSetIndex}
        data={dataSet}
        datumKey="id"
        boldCellFuncs={{
          manufacturer: value => value.toString().toLowerCase() === "ford"
        }}
        upperCaseColumns={["model"]}
      />
    </div>
  );
};

export default App;
