import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [fieldValue, setFieldValue] = useState([]);
  const { formId } = useParams();

  const formList = localStorage.getItem("formList")
    ? JSON.parse(localStorage.getItem("formList"))
    : [];
  const formData = formList.find((form) => {
    return formId === form.formId;
  });
  const navigate = useNavigate();
  // const formId = location.
  const handleChange = (event, fieldData) => {
    const value = event.target.value;
    const name = event.target.name;
    const fieldType = fieldData.fieldType;

    let fieldValueClone = [...fieldValue];
    const alreadyAddedValueIndex = fieldValueClone.findIndex((field) => {
      return field.name === name;
    });
    if (alreadyAddedValueIndex === -1) {
      if (fieldType === "checkbox") {
        fieldValueClone.push({ name, value: [value] });
      } else {
        fieldValueClone.push({ name, value });
      }
    } else {
      if (fieldType === "checkbox") {
        const priviousVal = [
          ...fieldValueClone?.[alreadyAddedValueIndex]?.value,
        ];
        if (event.target.checked) {
          fieldValueClone[alreadyAddedValueIndex] = {
            name,
            value: [...priviousVal, value],
          };
        } else {
          const usedIndex = priviousVal.findIndex((priviousvalue) => {
            return priviousvalue === value;
          });
          priviousVal.splice(usedIndex, 1);
          fieldValueClone[alreadyAddedValueIndex] = {
            name,
            value: [...priviousVal],
          };
        }
      } else {
        fieldValueClone[alreadyAddedValueIndex] = { name, value };
      }
    }
    setFieldValue(fieldValueClone);
    console.log(`event`, event);
    console.log(`object`, { value, name });
  };
  const handleSubmit = (event) => {
    const storedValues =
      (localStorage.getItem("formValues") &&
        JSON.parse(localStorage.getItem("formValues"))) ||
      {};
    const currentFormValues = storedValues?.[formData.formId] || [];
    event.preventDefault();
    const data = {
      fieldValue,
      ...formData,
    };
    localStorage.setItem(
      "formValues",
      JSON.stringify({
        ...storedValues,
        [formData.formId]: [...currentFormValues, data],
      })
    );
    setFieldValue([]);
    event.target.reset();
    console.log(`data`, data);
  };
  //   console.log(`formData`, formData);
  return (
    // <Typography>{formData.formName}</Typography>
    <div>
      <Button
        variant="outlined"
        onClick={() => navigate("/formList")}
        style={{ marginBottom: "1rem" }}
      >
        Form List
      </Button>
      <div style={{ border: "1px solid", padding: "1.5rem", width: "50vw" }}>
        <Typography
          style={{
            marginBottom: "3%",
            borderBottom: "1px solid black !important",
            fontWeight: "bold",
          }}
          variant="h5"
        >
          {formData.formName}
        </Typography>
        <form onSubmit={handleSubmit}>
          {formData?.formFields.map((field) => {
            return (
              <div style={{ display: "grid" }} key={field.fieldName}>
                <label>{field.fieldLabel}</label>
                {field.fieldType === "text" && (
                  <TextField
                    type="text"
                    variant="outlined"
                    onChange={(event) => handleChange(event, field)}
                    name={field.fieldName}
                  />
                )}
                {field.fieldType === "checkbox" &&
                  field.checkBoxOptions.map(({ value, label }) => {
                    return (
                      // <div>{label}</div>
                      <FormControlLabel
                        control={<Checkbox value={value} name="checkbox" key={value}/>}
                        label={`${label}`}
                        onChange={(event) => handleChange(event, field)}
                        name={field.fieldName}
                        key={value}
                      />
                    );
                  })}
                {field.fieldType === "radio" && (
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name={field.fieldName}
                  >
                    {field.radioOptions.map(({ value, label }) => {
                      return (
                        // <div>{label}</div>

                        <FormControlLabel
                          value={value}
                          control={<Radio key={value} />}
                          label={label}
                          onChange={(event) => handleChange(event, field)}
                        />
                      );
                    })}
                  </RadioGroup>
                )}
              </div>
            );
          })}
          <Button type="submit" variant="outlined">
            submit
          </Button>
        </form>{" "}
      </div>
    </div>
  );
};
export default Form;
