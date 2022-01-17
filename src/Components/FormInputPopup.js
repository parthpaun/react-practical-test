import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function AddFieldPopup({ open, setOpen, onPopupSubmit }) {
  const initialState = {
    fieldType: "text",
    fieldName: "",
    fieldLabel: "",
  };
  //   const [open, setOpen] = React.useState(false);
  const [fieldData, setFieldData] = useState(initialState);
  const [checkBoxOptions, setCheckBoxOptions] = useState([]);
  const [radioOptions, setRadioOptions] = useState([]);
  useEffect(() => {
    console.log(`useEffectCalled`);
    if (fieldData.fieldType === "checkbox") {
      setCheckBoxOptions([{ name: "", label: "", value: "" }]);
      setRadioOptions([]);
    } else if (fieldData.fieldType === "radio") {
      setRadioOptions([{ name: "", label: "", value: "" }]);
      setCheckBoxOptions([]);
    } else {
      setCheckBoxOptions([]);
      setRadioOptions([]);
    }
  }, [fieldData.fieldType]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...fieldData };
    if (fieldData.fieldType === "radio") {
      data.radioOptions = radioOptions;
    } else if (fieldData.fieldType === "checkbox") {
      data.checkBoxOptions = checkBoxOptions;
    }
    onPopupSubmit(data);
    setCheckBoxOptions([]);
    setRadioOptions([]);
    setFieldData(initialState);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldData({ ...fieldData, [name]: value });
  };
  const handleAddOptions = () => {
    if (fieldData.fieldType === "checkbox") {
      setCheckBoxOptions([
        ...checkBoxOptions,
        { name: "", label: "", value: "" },
      ]);
    } else if (fieldData.fieldType === "radio") {
      setRadioOptions([...radioOptions, { name: "", label: "", value: "" }]);
    }
  };

  const handleRdioOptionChange = (event, index) => {
    const value = event.target.value;
    let radioOptionsClone = [...radioOptions];
    radioOptionsClone[index] = {
      name: "radio",
      label: value,
      value: value.replace(" ", "_"),
    };
    setRadioOptions(radioOptionsClone);
  };
  const handleCheckboxOptionChange = (event, index) => {
    const value = event.target.value;
    let checkBoxOptionsClone = [...checkBoxOptions];
    checkBoxOptionsClone[index] = {
      name: "checkbox",
      label: value,
      value: value.replace(" ", "_"),
    };
    console.log(`checkBoxOptionsClone`, checkBoxOptionsClone);
    setCheckBoxOptions(checkBoxOptionsClone);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        fullWidth={true}
      >
        <DialogTitle>Add Field</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="field_name"
            label="Question"
            type="text"
            // fullWidth
            variant="outlined"
            onChange={handleChange}
            name="fieldLabel"
            value={fieldData.fieldLabel}
            required
            style={{ marginTop: "1rem" }}
          />
          <FormControl style={{ marginTop: "1rem" }}>
            <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fieldData.fieldType}
              label="Field Type"
              onChange={handleChange}
              name="fieldType"
              required
            >
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"checkbox"}>Multichoice Checkbox</MenuItem>
              <MenuItem value={"radio"}>Single Select radio</MenuItem>
            </Select>
          </FormControl>

          {checkBoxOptions.map((option, index) => {
            return (
              <div>
                <TextField
                  type="text"
                  name={`${index + 1}`}
                  onChange={(event) => handleCheckboxOptionChange(event, index)}
                  label={`option ${index + 1}`}
                  style={{ marginTop: "1rem", marginLeft: "1rem" }}
                />
              </div>
            );
          })}
          {radioOptions.map((option, index) => {
            return (
              <div>
                <TextField
                  type="text"
                  // name={`checkBox`}
                  value={option.label}
                  onChange={(event) => handleRdioOptionChange(event, index)}
                  label={`option ${index + 1}`}
                  style={{ marginTop: "1rem", marginLeft: "1rem" }}
                />
              </div>
            );
          })}
          {(fieldData.fieldType === "checkbox" ||
            fieldData.fieldType === "radio") && (
            <Button
              onClick={handleAddOptions}
              variant="outlined"
              style={{ marginTop: "1rem" }}
            >
              Add Options
            </Button>
          )}
          <TextField
            // autoFocus
            // margin="dense"
            id="field_name"
            label="Field Name"
            type="text"
            // fullWidth
            name="fieldName"
            variant="outlined"
            onChange={handleChange}
            value={fieldData.fieldName}
            required
            style={{ marginTop: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="primary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
