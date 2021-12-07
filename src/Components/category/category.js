import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from './../../Redux/actions';
import MUIDataTable from "mui-datatables";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
function Category() {

    const dispatch = useDispatch()
    const { categoryList, addCartData } = useSelector((state) => state.categoryReducer);
    console.log("add cart reducer info ", addCartData);
    console.log("list reducer info ", categoryList);
    const [addCart, setAddCart] = useState([]);
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        dispatch(actions.categoryList())
    }, []);

    // view cart popup open
    const handleClickOpen = () => {
        setOpen(true);
    };

    // view cart popup close
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCart = (val, actionType) => {
        let checkPro = addCart.filter(item => item.id === val.id);
        if (checkPro.length === 0) {
            //add new product to cart
            val.qty = 1
            let newProduct = [...addCart, val]
            setAddCart(newProduct);
            dispatch(actions.addProduct(newProduct))
        } else {
            let newCart = [...addCart];
            let checkAddNewQty = true
            newCart.map((item, index) => {
                if (item.id === val.id) {
                    if (actionType === "Add") {
                        //add quantity
                        item.qty = item.qty + 1
                    } else {
                        //remove quantity
                        let qty = item.qty - 1
                        if (qty !== 0) {
                            item.qty = qty
                        } else {
                            checkAddNewQty = false
                        }
                    }
                }
            })
            if (!checkAddNewQty) {
                let updateQty = newCart.filter(item => item.id !== val.id)
                newCart = updateQty
            }
            setAddCart(newCart);
            dispatch(actions.addProduct(newCart))
        }
    }

    // category data set in table
    const categoryTableInfo = []
    categoryList && categoryList.map((val, index) => {
        let productInfo = {
            name: val.title,
            price: val.price,
            image: val.image,
            action_detail: val,
            qty: 0
        }
        categoryTableInfo.push(productInfo);
    })

    // column for data table
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "image",
            label: "Image",
            options: {
                // filter: true,
                // sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Avatar variant="rounded" src={value} >
                        </Avatar>
                    )
                }
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "action_detail",
            label: "Action",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div>
                        <AddCircleIcon onClick={() => handleChangeCart(value, 'Add')} />
                    </div>
                )
            }
        },
    ];

    // option for data table
    const options = {
        filterType: 'checkbox',
    };

    var total = 0;
    addCart.forEach(item => {
        total += item.qty * item.price
    });

    return (
        <div className="App">
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"View Product"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell align="right">Qty</StyledTableCell>
                                            <StyledTableCell align="right">Price</StyledTableCell>
                                            <StyledTableCell align="right">Total</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {addCart.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.title}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <AddCircleIcon onClick={() => handleChangeCart(row, 'Add')} />
                                                    {row.qty}
                                                    <RemoveCircleIcon onClick={() => handleChangeCart(row, 'Minus')} />
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                                <StyledTableCell align="right">{row.qty * row.price}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        <StyledTableRow key={`total`}>
                                            <StyledTableCell align="right">{``}</StyledTableCell>
                                            <StyledTableCell align="right">{``}</StyledTableCell>
                                            <StyledTableCell align="right">{`Total Price`}</StyledTableCell>
                                            <StyledTableCell align="right">{total}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Button variant="contained" size="large" onClick={handleClickOpen}>
                view
            </Button>
            <MUIDataTable
                title={"List"}
                data={categoryTableInfo}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default Category;