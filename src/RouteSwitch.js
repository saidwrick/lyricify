import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import TrackPage from "./TrackPage.js"

const RouteSwitch = () => {

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/track/:artist/:title/:id" element={<TrackPage />} />
                    <Route path="/" element={<App />} />
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;