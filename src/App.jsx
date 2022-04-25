import React from 'react';
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './styles/App.css';
import NavbarComp from "./components/NavbarComp";

Amplify.configure(awsExports);


function App() {


        return (

            <NavbarComp/>


        );

}

export default App;



