import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './size-chart.style';

const SizeChart = (props) => {
    const createData = (size, chest, sleeve, length) => {
        return { size, chest, sleeve, length };
    };
      
    const tShirtData = [
        createData('XS', 36, 7.5, 24.5),
        createData('S', 38, 7, 26),
        createData('M', 40, 7.5, 27),
        createData('L', 42, 8, 28),
        createData('XL', 44, 8.5, 29),
        createData('2XL', 46, 9, 30),
        createData('3XL', 48, 9.5, 31),
    ];

    const { classes } = props;

    if(props.productType === "T-shirts") {
        return (
            <div className={classes.tableWrapper}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell align="right">Chest (inches)</TableCell>
                                <TableCell align="right">Sleeve (inches)</TableCell>
                                <TableCell align="right">Length (inches)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tShirtData.map((row) => (
                            <TableRow
                                key={row.size}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                {row.size}
                                </TableCell>
                                <TableCell align="right">{row.chest}</TableCell>
                                <TableCell align="right">{row.sleeve}</TableCell>
                                <TableCell align="right">{row.length}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
};

export default withStyles(styles)(SizeChart);