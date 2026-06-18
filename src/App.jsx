import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsAndConditions";
import AcceptableUse from "./pages/AcceptableUsePolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsOfService />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;