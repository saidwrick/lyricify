import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import TrackPage from "./TrackPage.js"
import ErrorPage from "./ErrorPage.js"

const RouteSwitch = () => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/track/:artist/:title/:id" element={<TrackPage />} />
                <Route path="/" element={<App />} />
                <Route path="*" element={<ErrorPage err={"404 Page not found"}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;