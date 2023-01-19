import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import ItemTableRow from "./ItemTableRow";
import { collection, onSnapshot } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function useTimes(sortBy = "TIME_ASC") {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const newTimes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("updatelust", sortBy);
      setTimes(newTimes);
    });
    return () => unsubscribe();
  }, [sortBy]);

  return times;
}

const ItemTable = (props) => {
  const times = useTimes();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
              {/* <TableCell align="right">Image</TableCell> */}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.length > 0 ? (
              times.map((itemValue) => (
                <ItemTableRow
                  key={itemValue.id}
                  itemValue={itemValue}
                  items={props.items}
                  editRow={props.editRow}
                  deleteItem={props.deleteItem}
                  editing={props.editing}
                  setEditing={props.setEditing}
                  currentItem={props.currentItem}
                  updateItem={props.updateItem}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No users</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemTable;
