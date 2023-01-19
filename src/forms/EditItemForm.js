import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";

const EditItemForm = (props) => {
  const [item, setItem] = useState(props.currentItem);

  useEffect(() => {
    setItem(props.currentItem);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem({ ...item, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateItem(item);
      }}
    >
      <label>Title</label>
      <Input
        type="text"
        name="title"
        value={item.title}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <Input
        type="text"
        name="desc"
        value={item.desc}
        onChange={handleInputChange}
      />
      <button>Update Item</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditItemForm;
