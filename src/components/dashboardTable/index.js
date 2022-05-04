import { Table, TableContainer } from "@mui/material";
import React from "react";
import TableHeader from "./components/tableHeader";
import TableContent from './components/tableContent';
import { styles } from "./styles";


const DashboardTable = ({ maxLength, dashboardData, history }) => {
  return (
    <TableContainer sx={styles.tableContainer}>
      <Table aria-label="simple table">
        <TableHeader maxLength={maxLength} />
        <TableContent dashboardData={dashboardData} history={history} />
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;