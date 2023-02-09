import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import './styles/App.css';
import NavbarComp from "./components/NavbarComp";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Play from "./pages/playMaker";
import View from "./pages/ViewPlays";


import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
    return (
        <Router>
            <div>
                <NavbarComp/>
                <Routes>
                    <Route path="/" element={<Play/>}/>
                    <Route path="/ViewPlays" element={<View/>}/>
                </Routes>
            </div>
        </Router>
    );
}
export default App;



