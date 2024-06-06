import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import App from "./App.jsx";
import Auth from "./components/Auth.jsx";

export const Router = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/tanks" element={<App />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};
