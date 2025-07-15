import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* <Chatbot /> */}

   
      <Toaster
        position="top-right"
        theme="light" // "light" makes it black on white by default
        closeButton
        toastOptions={{
          style: {
            background: "#fff",
            color: "#000",
            border: "1px solid #000",
            fontSize: "14px",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
