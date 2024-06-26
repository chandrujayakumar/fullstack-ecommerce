import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerOrders } from '../../../features/seller/sellerThunks';
import { Loader } from '../../../layouts';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

const SellerDashboard = () => {
    const dispatch = useDispatch();
    const { orders, stats, sellerLoading, sellerError } = useSelector((state) => state.seller);

    useEffect(() => {
        dispatch(getSellerOrders());
    }, [dispatch]);

    if (sellerLoading) return <Loader />;
    if (sellerError) return <Typography color="error">{sellerError}</Typography>;


    // Calculate product sales
    const productSales = orders.reduce((acc, order) => {
        if (!acc[order.product_name]) {
            acc[order.product_name] = 0;
        }
        acc[order.product_name] += parseFloat(order.order_item_price) * order.quantity;
        return acc;
    }, {});

    // Sort products by sales contribution
    const sortedProductSales = Object.entries(productSales).sort((a, b) => b[1] - a[1]);

    // Calculate total sales
    const totalSales = sortedProductSales.reduce((acc, [product, sales]) => acc + sales, 0);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Seller Dashboard</Typography>
            <Box mb={3}>
                <Typography variant="h6">Statistics</Typography>
                {stats ? (
                    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="stat bg-primary p-4 rounded-sm shadow-2xl border-r-4">
                            <h2 className="text-xl font-semibold text-white">Total Sales</h2>
                            <p className="text-3xl font-bold text-white">₹{stats.totalSales.toFixed(2)}</p>
                        </div>
                        <div className="stat bg-primary p-4 rounded-sm shadow-2xl border-r-4">
                            <h2 className="text-xl font-semibold text-white">Total Orders</h2>
                            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                        </div>
                        <div className="stat bg-primary p-4 rounded-sm shadow-2xl border-r-4">
                            <h2 className="text-xl font-semibold text-white">Total Products Sold</h2>
                            <p className="text-3xl font-bold text-white">{stats.totalProductsSold}</p>
                        </div>
                    </Box>
                ) : (
                    <Typography>No statistics available.</Typography>
                )}
            </Box>
            <Box mb={3}>
                <Typography variant="h6">Product Ranking</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Sales</TableCell>
                                <TableCell>Percentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedProductSales.map(([product, sales]) => (
                                <TableRow key={product}>
                                    <TableCell>{product}</TableCell>
                                    <TableCell>₹{sales.toFixed(2)}</TableCell>
                                    <TableCell>{((sales / totalSales) * 100).toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
           
        </Box>
    );
};

export default SellerDashboard;