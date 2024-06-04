import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tooltip, Paper, Fab, Button, IconButton, Modal, Box } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../features/seller/sellerThunks';
import { Loader } from '../../../layouts';
import AddProduct from '../AddProduct/AddProduct';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 170,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '3px',
}



const SellerProducts = () => {

    const dispatch = useDispatch()

    const { seller, sellerProducts, sellerLoading, isSellerAuthenticated, sellerMessage, sellerError } = useSelector((state) => state.seller)
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [productId, setProductId] = useState('')
    const [popup, setPopup] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const table_head_cell_properties = { color: 'white', fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }
    const table_body_cell_properties = { fontFamily: "Montserrat, sans-serif", fontWeight: 500 }

    const handleProductUpdate = () => {
        console.log("heelo")
    }

    const handleDeleteModalOpen = (product_id) => {
        setProductId(product_id)
        setDeleteConfirmation(true)
    }

    const handleDeleteModalClose = () => {
        setProductId('')
        setDeleteConfirmation(false)
    }

    const handleProductDelete = () => {
        setDeleteConfirmation(false)
        dispatch(deleteProduct(productId))
    }

    const handleAddProductOpen = () => {
        setPopup(true)
    }

  return (
    <>
    {sellerLoading ? (
        <Loader/>
    ) : (
        <>
        <AddProduct popup={popup} setPopup={setPopup} />
        <div className='min-h-[90vh] w-full px-[5rem] py-[2rem]'>
            <div className='flex flex-col justify-center items-start w-full h-full gap-[1rem]'>
                {sellerProducts.length === 0 ? (
                    <div className='flex-center flex-col w-full pt-[3rem] gap-[1rem]'>
                        <div className='flex-center flex-col gap-[4rem] w-full'>
                            <img className='w-[35%]' src="/no-products.svg" alt="no products" />
                            <h2 className='font-extrabold text-[35px] text-mediumGray'>No Products Found</h2>
                        </div>
                        <button onClick={handleAddProductOpen} className='btn-fill rounded-[3px] shadow-md flex gap-[7px]'><AddIcon />Add Product</button>
                    </div>
                ):(
                <>
                    <div className='w-full flex-center'>
                        <h1 className='font-extrabold text-[30px] text-mediumGray'>All Products</h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="products table"> 
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#ff5151' }}>
                                    <TableCell sx={table_head_cell_properties}>image</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">id</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">name</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">description</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">price</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">mrp</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">stock</TableCell>
                                    <TableCell sx={table_head_cell_properties} align="right">edit/delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? sellerProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : sellerProducts).map((product, key) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row"><img className='w-[70px]' src={product.image_url} alt="" /></TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.id}</TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.name}</TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.description}</TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.price}</TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.mrp}</TableCell>
                                        <TableCell sx={table_body_cell_properties} align="right">{product.stock}</TableCell>
                                        <TableCell align="center">
                                            <div className='flex gap-[0.4rem] justify-end'>
                                                <IconButton onClick={() => {handleProductUpdate(product.id)}} aria-label='update' size='medium'><ModeEditIcon fontSize='inherit' /></IconButton>
                                                <IconButton onClick={() => {handleDeleteModalOpen(product.id)}} aria-label='delete' size='medium'><DeleteIcon fontSize='inherit' /></IconButton>
                                                <Modal 
                                                    open={deleteConfirmation}
                                                    onClose={handleDeleteModalClose}
                                                >
                                                    <Box className="flex flex-col justify-between" sx={style}>
                                                        <p className='text-[18px]'>Are you sure about deleting?</p>
                                                        <Button
                                                            variant='contained' 
                                                            color='primary' 
                                                            sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, height: '2.5rem' }}
                                                            onClick={handleProductDelete}>
                                                            Delete
                                                        </Button>                                                    </Box>
                                                </Modal>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}    
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='flex justify-between w-full'>
                        <Tooltip title="Add Product" placement='right' arrow>
                            <Fab onClick={handleAddProductOpen} color='primary'>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <TablePagination 
                            component="div"
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={sellerProducts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </>
                )}

            </div>
        </div>
    </>
    )}
    </>
  )
}

export default SellerProducts