import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { OrderForm } from "./components/ui/OrderForm.tsx";
import { DetailedPage } from "./components/ui/DetailsOrder.tsx";
import { Dashboard } from "./components/ui/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/order/:userId/:address" element={<OrderForm />} />
        <Route path="/service/:userId" element={<DetailedPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
