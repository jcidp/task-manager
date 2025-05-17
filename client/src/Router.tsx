import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
