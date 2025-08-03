import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThreepointLight from "./pages/ThreePointLight";
import ThreeKindLight from "./pages/ThreeKindLight";
import DynamicLight from "./pages/DynamicLight";
import Merge from "./pages/Merge";
import HDR from "./pages/HDR";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/threepoint" element={<ThreepointLight />} />
                <Route path="/threekind" element={<ThreeKindLight />} />
                <Route path="/dynamic" element={<DynamicLight />} />
                <Route path="/merge" element={<Merge />} />
                <Route path="/hdr" element={<HDR />} />
            </Routes>
        </BrowserRouter>
    );
}