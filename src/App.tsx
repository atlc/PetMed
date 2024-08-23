import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Navbar from "./components/Navbar";
import Verify from "./views/Verify";
import GettingStarted from "./views/GettingStarted";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<h1>Welcome to PetMed!</h1>}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/verify"
                        element={<Verify />}
                    />
                    <Route
                        path="/getting_started/:stage?"
                        element={<GettingStarted />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
