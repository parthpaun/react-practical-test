import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormList } from "../Redux/Actions/QuestionFormAction";

export default function FormsList() {
  // const formList = localStorage.getItem("formList")
  //   ? JSON.parse(localStorage.getItem("formList"))
  //   : [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFormList({}));
  }, [dispatch]);
  const formList = useSelector(({ FormReducer }) => FormReducer.formList);
  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Form Name</TableCell>
              <TableCell>Form URL</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formList.map((form) => (
              <TableRow
                key={form.formId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  navigate(`/form/${form.formId}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {form.formName}
                </TableCell>
                <TableCell>{form.formURL}</TableCell>
                <TableCell>{form.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
