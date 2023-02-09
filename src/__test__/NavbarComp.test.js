import React from "react";
import ReactDOM from "react-dom";
import NavbarComp from "../components/NavbarComp";

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavbarComp></NavbarComp>, div);
})


