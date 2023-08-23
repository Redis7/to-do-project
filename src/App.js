import "./App.css";
import FormComponent from "./components/form/form";
import CardHolder from "./components/cardHolder/cardHolder";

function App() {
  return (
    <div className="App">
      <FormComponent />
      <div className="app-page">
        <div class="prova"></div>
        <CardHolder />
      </div>
    </div>
  );
}

export default App;
