import React, { useState } from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

const AddItemForm = (props) => {
  const initialFormState = { id: null, title: "", desc: "" };
  const [item, setItem] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem({ ...item, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        console.log("onSubmit");
        event.preventDefault();
        if (!item.title || !item.desc) return;

        props.addItem(item);
        setItem(initialFormState);
      }}
    >
      <label style={{ paddingInline: 4 }}>Title:</label>
      <Input
        type="text"
        name="title"
        value={item.title}
        onChange={handleInputChange}
      />
      <label style={{ paddingInline: 4 }}>Description</label>
      <Input
        type="text"
        name="desc"
        value={item.desc}
        onChange={handleInputChange}
      />
      <button>Add new item</button>
    </form>
  );
};

export default AddItemForm;
