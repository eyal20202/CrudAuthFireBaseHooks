import { doc, setDoc, deleteDoc } from "firebase/firestore";
import React, { useState, useEffect, Fragment } from "react";
import { db } from "../services/firebase";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import Image from "material-ui-image";
const ItemTableRow = (props) => {
  const [item, setItem] = useState(props.currentItem);

  useEffect(() => {
    setItem(props.currentItem);
  }, [props]);

  const handleDeleteClick = (id) => {
    console.log("id", id);
    deleteDoc(doc(db, "items", id)).then(() => {
      console.log("deleteDoc");
    });
  };

  const handleUpdateItemClick = (data) => {
    console.log("handleUpdateItemClick", data.id);
    setDoc(doc(db, "items", data.id), {
      ...data
    }).then(() => {
      console.log("updateSuccess", data.id);
    });
    props.setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  return props.editing && props.currentItem.id === props.itemValue.id ? (
    <Fragment>
      <TableRow key={props.itemValue.id}>
        <TableCell>
          <Input
            variant="outlined"
            type="text"
            name="title"
            value={item.title}
            onChange={handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Input
            type="text"
            name="desc"
            value={item.desc}
            onChange={handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Button
            onClick={() => props.setEditing(false)}
            className="button muted-button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateItemClick(item)}
            className="button muted-button"
          >
            Update
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  ) : (
    <Fragment>
      <TableRow key={props.itemValue.id}>
        <TableCell>{props.itemValue.title}</TableCell>
        <TableCell>{props.itemValue.desc}</TableCell>
        <TableCell>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"
            height="100px"
            width="100px"
          />
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              props.editRow(props.itemValue);
            }}
            className="button muted-button"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteClick(props.itemValue.id)}
            className="button muted-button"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default ItemTableRow;
