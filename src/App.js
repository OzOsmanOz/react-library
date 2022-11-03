import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePages from "./Pages/HomePage";
import AddBookPage from "./Pages/AddBookPage";
import EditBookPage from "./Pages/EditBookPage";

function App() {
  return (
    <div
      className="App "
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#DFF6FF",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />}></Route>
          <Route path="/add-book" element={<AddBookPage />}></Route>
          <Route path="/edit-book/:bookId" element={<EditBookPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
