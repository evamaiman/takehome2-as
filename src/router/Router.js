import React from "react";
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route,
} from "react-router-dom";
import App from "../App";
import PropertyListings from "../pages/PropertyListings/PropertyListings";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<PropertyListings />}
                    path="PropertyListings"
                />
                {/* Add new routes here */}
                <Route
                    element={<App />}
                    path="/"
                />
                <Route
                    element={<Navigate to="/" />}
                    path="*"
                />
            </Routes>
        </BrowserRouter>
    );
}
