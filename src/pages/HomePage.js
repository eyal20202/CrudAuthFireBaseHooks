import React, { useState, Fragment } from "react";
import AddItemForm from "..//forms/AddItemForm";
import EditItemForm from "..//forms/EditItemForm";
import ItemTable from "..//tables/ItemTable";
import { signOutWithGoogle, db } from "..//services/firebase";
import { Button } from "@material-ui/core";
import "firebase/firestore";
import "firebase/auth";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const HomePage = () => {
  const itemsData = [{ id: null, title: "", desc: "", image: "" }];
  const initialFormState = { id: null, title: "", desc: "" };

  const [items, setItems] = useState(itemsData);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  console.log("home");

  const addItem = (item) => {
    console.log("add item");
    addDoc(collection(db, "items"), {
      title: item.title,
      desc: item.desc
    })
      .then(() => {
        console.log("sucess");
      })
      .catch(() => {
        console.log("addError");
      });
  };

  const deleteItem = (id) => {
    setEditing(false);
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (updatedItem) => {
    setEditing(false);
    console.log("updateItemonAd", updatedItem);
    updateDoc(doc(db, "items", updatedItem.id), {
      ...updatedItem
    }).then((data) => {
      console.log("updateItemonAddSuccess", updatedItem.id);
    });
  };

  const editRow = (item) => {
    setEditing(true);
    setCurrentItem({ id: item.id, title: item.title, desc: item.desc });
    console.log("editRow", item);
  };

  return (
    <div className="container">
      <h1>Eyal Mizrahi CRUD App with React Firebase </h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit Item</h2>
              <EditItemForm
                editing={editing}
                setEditing={setEditing}
                currentItem={currentItem}
                updateItem={updateItem}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add item</h2>
              <AddItemForm addItem={addItem} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View Items</h2>
          <ItemTable
            items={items}
            editRow={editRow}
            deleteItem={deleteItem}
            editing={editing}
            setEditing={setEditing}
            currentItem={currentItem}
            updateItem={updateItem}
          />
        </div>
      </div>
      <Button onClick={signOutWithGoogle} variant="contained" color="primary">
        logout
      </Button>
    </div>
  );
};

export default HomePage;
