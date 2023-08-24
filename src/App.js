import "./App.css";
import FormComponent from "./components/form/form";
import LabTabs from "./components/tabs";

function App() {
  return (
    <div className="App">
      <FormComponent />
      <div className="app-page">
        <LabTabs />
      </div>
    </div>
  );
}

export default App;
