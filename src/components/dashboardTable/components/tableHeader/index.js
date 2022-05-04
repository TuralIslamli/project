import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { styles } from './styles';
import { Box } from "@mui/system";


const TableHeader = ({ maxLength }) => {
  return (
    <TableHead sx={styles.tableHeader}>
      <TableRow>
        <TableCell sx={styles.dateCell}>
          <Box sx={styles.verticalLine}></Box>
          Date
        </TableCell>
        {maxLength?.map((i, index) => <TableCell key={index} sx={styles.inOutCell}>{index % 2 ? 'OUT' : 'IN'}
          <Box sx={styles.verticalLine}></Box>
        </TableCell>
        )}
        <TableCell sx={styles.totalCell}>
          <Box sx={styles.verticalLineWithZIndex}></Box>
          Total
        </TableCell>
        <TableCell sx={styles.differenceCell}>
          <Box sx={styles.verticalLineWithZIndex}></Box>
          Difference</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;