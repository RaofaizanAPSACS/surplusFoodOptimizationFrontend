import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function AddFoodItems() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), itemName: "", itemDescription: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", ...inputFields);

    axios
      .post("http://localhost:8086/addFoodItems", inputFields)
      .then((result) => {
        if (result.data === "Food Items Added") {
          alert("Food Items Added");
          notify();
        } else if (result.data === 500) {
          alert("Session Logged Out");
          sessionOut();
          window.location.href = "/LoginRestaurant";
        } else {
          window.location.href = "/LoginRestaurant";
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), itemName: "", itemDescription: "" },
    ]);
  };
  const notify = () => {
    toast.success("Added Successfully");
  };

  const sessionOut = () => {
    toast.warn("Session Out, Login Again!");
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <Container className="mt-12">
      <ToastContainer />
      <div className=" pt-20">
        <h1 className="font-bold text-4xl text-blue-600 text-center ">
          ADD FOOD ITEMS
        </h1>

        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <TextField
                name="itemName"
                label="Food Name"
                variant="filled"
                value={inputField.itemName}
                required={true}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <TextField
                name="itemDescription"
                label="Food Description"
                variant="filled"
                value={inputField.itemDescription}
                required={true}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <IconButton
                disabled={inputFields.length === 1}
                onClick={() => handleRemoveFields(inputField.id)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddFields}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add to Menu
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddFoodItems;
