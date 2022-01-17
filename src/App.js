import { BrowserRouter, Route, Routes} from "react-router-dom";
import QuestionForm from "./Pages/QuestionForm";
import FormsList from "./Pages/FormList";
import Form from "./Pages/FormPage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<QuestionForm />} />
          <Route exact path="/form/:formId" element={<Form />} />
          <Route exact path="/formList" element={<FormsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
