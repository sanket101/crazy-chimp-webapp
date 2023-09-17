import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './size-chart.style';
import PRODUCT_TYPE from '../../constants/product-constants';

const SizeChart = (props) => {
    const createData = (size, chest, sleeve, length, shoulder) => {
        return { size, chest, sleeve, length, shoulder };
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

    const ostShirtData = [
        createData('S', 42, '', 28),
        createData('M', 44, '', 29),
        createData('L', 46, '', 30),
        createData('XL', 48, '', 31),
        createData('2XL', 50, '', 32),
    ];

    const hoodiesData = [
        createData('XS', 38, 23, 24, 16),
        createData('S', 40, 24, 25, 17),
        createData('M', 42, 25, 26, 18),
        createData('L', 44, 26, 27, 19),
        createData('XL', 46, 27, 28, 20),
        createData('2XL', 48, 28, 29, 21),
    ];

    const swtsData = [
        createData('XS', 38, 23, 24),
        createData('S', 40, 24, 25),
        createData('M', 42, 25, 26),
        createData('L', 44, 26, 27),
        createData('XL', 46, 27, 28),
        createData('2XL', 48, 28, 29),
    ]

    const { classes } = props;

    if(props.productType === PRODUCT_TYPE.HST) {
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
                                <TableCell component="th" scope="row" align="center">
                                {row.size}
                                </TableCell>
                                <TableCell align="center">{row.chest}</TableCell>
                                <TableCell align="center">{row.sleeve}</TableCell>
                                <TableCell align="center">{row.length}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    if(props.productType === PRODUCT_TYPE.OST) {
        return (
            <div className={classes.tableWrapper}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell align="right">Chest (inches)</TableCell>
                                <TableCell align="right">Length (inches)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ostShirtData.map((row) => (
                            <TableRow
                                key={row.size}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                {row.size}
                                </TableCell>
                                <TableCell align="center">{row.chest}</TableCell>
                                <TableCell align="center">{row.length}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    if(props.productType === PRODUCT_TYPE.HOODIES) {
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
                                <TableCell align="right">Shoulder (inches)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hoodiesData.map((row) => (
                            <TableRow
                                key={row.size}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                {row.size}
                                </TableCell>
                                <TableCell align="center">{row.chest}</TableCell>
                                <TableCell align="center">{row.sleeve}</TableCell>
                                <TableCell align="center">{row.length}</TableCell>
                                <TableCell align="center">{row.shoulder}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    if(props.productType === PRODUCT_TYPE.SWTS) {
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
                            {swtsData.map((row) => (
                            <TableRow
                                key={row.size}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                {row.size}
                                </TableCell>
                                <TableCell align="center">{row.chest}</TableCell>
                                <TableCell align="center">{row.sleeve}</TableCell>
                                <TableCell align="center">{row.length}</TableCell>
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