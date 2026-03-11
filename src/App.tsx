import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Problem } from "./pages/Problem";
import { Data } from "./pages/Data";
import { Model } from "./pages/Model";
import { Results } from "./pages/Results";
import { CalculatorPage } from "./pages/Calculator";
import { Simulator } from "./pages/Simulator";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="problem" element={<Problem />} />
          <Route path="data" element={<Data />} />
          <Route path="model" element={<Model />} />
          <Route path="results" element={<Results />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="simulator" element={<Simulator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
