import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />

      <ToastContainer autoClose={2000} theme="light"/>
    </BrowserRouter>
  );
}
