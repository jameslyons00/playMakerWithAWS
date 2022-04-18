import React from 'react';
import {Amplify, Auth} from 'aws-amplify';
import awsExports from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import Home from "./pages/Home";
import Play from "./pages/playMaker";

Amplify.configure(awsExports);


function App({signOut}) {


        return (

            <NavbarComp/>


        );

}

export default withAuthenticator(App);



