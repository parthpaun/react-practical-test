import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddFieldPopup from "../Components/FormInputPopup";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function Form() {
  const [formName, setFormName] = useState();
  const [openAddField, setOpenAddField] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const navigate = useNavigate();
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };
  const handleAddFields = () => {
    setOpenAddField(true);
  };
  const handleAddField = (fields) => {
    setFormFields([...formFields, fields]);
  };
  const handleSaveForm = () => {
    const uniqueID = `${Date.now()}`;
    const formList = localStorage.getItem("formList")
      ? JSON.parse(localStorage.getItem("formList"))
      : [];
    const formData = {
      formName,
      formURL: `${process.env.REACT_APP_REDIRECT_URL}/form/${uniqueID}`,
      formId: uniqueID,
      formFields: formFields,
      createdAt: moment().format("DD-MMM-YYYY hh:mm"),
    };
    const updatedFormList = [...formList, formData];
    localStorage.setItem("formList", JSON.stringify(updatedFormList));
    navigate(`/form/${uniqueID}`);
  };
  console.log(`formFields`, formFields);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Form Name"
          onChange={handleFormNameChange}
          name="formName"
          type="text"
        />{" "}
        <br />
        <Button variant="outlined" onClick={handleAddFields}>
          Add Question
        </Button>
      </div>
      <div style={{ marginTop: "25px", minWidth: "100vh" }}>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            // gridTemplateColumns: { md: "1fr 1fr" },
            gap: 5,
            border: 0.1,
          }}
        >
          <>
            <Typography>Form Preview</Typography>
            <Typography>{formName}</Typography>
            {/* <div style={{border:"0.5px"}}></div> */}
            {formFields.map((field) => {
              return (
                <div style={{ display: "grid" }}>
                  <label>{field.fieldLabel}</label>
                  {field.fieldType === "text" && <input type="text" disabled />}
                  {field.fieldType === "checkbox" &&
                    field.checkBoxOptions.map(({ value, label }) => {
                      return (
                        // <div>{label}</div>
                        <FormControlLabel
                          control={<Checkbox value={value} disabled />}
                          label={`${label}`}
                        />
                      );
                    })}
                  {field.fieldType === "radio" && (
                    <RadioGroup
                      aria-label="gender"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {field.radioOptions.map(({ value, label }) => {
                        return (
                          // <div>{label}</div>

                          <FormControlLabel
                            value={value}
                            control={<Radio />}
                            label={label}
                            disabled
                          />
                        );
                      })}
                    </RadioGroup>
                  )}
                </div>
              );
            })}
          </>
        </Box>
      </div>
      <div>
        <Button
          onClick={handleSaveForm}
          disabled={!formName || !formFields.length}
          variant="outlined"
          style={{ marginTop: "1rem" }}
        >
          Save Form
        </Button>
        <Button variant="outlined" onClick={() => navigate("/formList")} style={{ marginTop: "1rem" , marginLeft:"1rem"}}>
          Form List
        </Button>
      </div>
      <AddFieldPopup
        open={openAddField}
        setOpen={setOpenAddField}
        onPopupSubmit={handleAddField}
      />
    </div>
  );
}

export default Form;
