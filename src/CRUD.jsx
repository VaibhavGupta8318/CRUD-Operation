import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import { Typography, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(SrNo, Name, Age, isActive) {
  return { SrNo, Name, Age, isActive };
}

const initialRows = [
  createData(1, 'Vaibhav', 25, true),
  createData(2, 'Shiva', 30, false),
  createData(3, 'Shubham', 22, true),
  createData(4, 'Nishant', 28, false),
  createData(5, 'Shivam', 26, true),
  createData(6, 'Vaibhav', 32, true)
];

export default function DenseTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [isAddMode, setIsAddMode] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [editedName, setEditedName] = React.useState('');
  const [editedAge, setEditedAge] = React.useState('');
  const [editedIsActive, setEditedIsActive] = React.useState(false);

  const handleOpen = (row = null) => {
    if (row) {
      setSelectedRow(row);
      setEditedName(row.Name);
      setEditedAge(row.Age);
      setEditedIsActive(row.isActive);
      setIsAddMode(false);
    } else {
      setSelectedRow(null);
      setEditedName('');
      setEditedAge('');
      setEditedIsActive(false);
      setIsAddMode(true);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isAddMode) {
      if (editedAge >= 100) {
        alert("Age must be less than 100.");
        return;
      }
      const newRow = createData(rows.length + 1, editedName, editedAge, editedIsActive);
      setRows((prevRows) => [...prevRows, newRow]);
    } else if (selectedRow) {
      if (editedAge >= 100) {
        alert("Age must be less than 100.");
        return;
      }
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.SrNo === selectedRow.SrNo
            ? { ...row, Name: editedName, Age: editedAge, isActive: editedIsActive }
            : row
        )
      );
    }
    handleClose();
  };

  const handleDelete = (SrNo) => {
    if (window.confirm("Are you sure to delete this entry?")) {
      setRows((prevRows) => prevRows.filter((row) => row.SrNo !== SrNo));
    }
  };

  return (
    <TableContainer component={Paper} sx={{ border: "4px solid #ffffff" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ m: 2 }}
      >
        ADD
      </Button>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "Yellow" }}>
            <TableCell sx={{ fontWeight: "bold", borderRight: "2px solid #cccccc" }}>SrNo</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", borderRight: "2px solid #cccccc" }}>Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", borderRight: "2px solid #cccccc" }}>Age</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", borderRight: "2px solid #cccccc" }}>isActive</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", borderRight: "2px solid #cccccc" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.SrNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.SrNo}</TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Age}</TableCell>
              <TableCell align="right">{row.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(row)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(row.SrNo)}
                  style={{ marginLeft: '8px' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for editing/adding */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isAddMode ? "Add Entry" : "Edit Entry"}
          </Typography>
          <TextField
            label="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            type="number"
            value={editedAge}
            onChange={(e) => setEditedAge(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Active"
            type="checkbox"
            checked={editedIsActive}
            onChange={(e) => setEditedIsActive(e.target.checked)}
          />
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
}
