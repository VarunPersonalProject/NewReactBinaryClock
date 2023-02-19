import MidSection from "./components/MidSection";
import "./App.css";
import BeginSection from "./components/BeginSection";

function App() {
  return (
    <div className="App">
      <div className="Begin">
        <BeginSection />
      </div>
      <div className="Mid">
        <MidSection />
      </div>

      <div className="End"></div>
    </div>
  );
}

export default App;
