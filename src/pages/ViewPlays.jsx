import React, {createContext, useEffect, useRef, useState} from "react";
import "../styles/playMaker.css";
import * as PropTypes from "prop-types";
import {FrameButton} from "./frameButton";
import UserListComp from "../components/UserListComp";
import {IconContext} from "react-icons";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";


FrameButton.propTypes = {
    onMouseDown: PropTypes.func,
    onMouseDown1: PropTypes.func,
    onMouseDown2: PropTypes.func,
    counter: PropTypes.number,
    total: PropTypes.number,
    onMouseDown3: PropTypes.func,
    onMouseDown4: PropTypes.func
};
const ViewPlays = () => {


    const canvas = useRef();
    let ctx = null;

    const [viewCircles, setViewCircles] = useState([]);
    const [currentPlay, setCurrentPlay] = useState([]);
    const [frameNum, setFrameNum] = useState(0);


    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas

        ctx = canvasEle.getContext('2d');
    });


    useEffect(() => {
        loadFrame();
        draw();
    },);


    // draw rectangle
    const draw = () => {

        ctx.clearRect(
            0,
            0,
            canvas.current.clientWidth,
            canvas.current.clientHeight
        );

        viewCircles.map((info) => drawFillRect(info));
    };


    // draw circle with background
    const drawFillRect = (info, style = {}) => {
        const {x, y, r, colour, id} = info;
        const {backgroundColor = colour} = style;

        //this id represents the basketball
        if (id === 23) {
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.fillStyle = backgroundColor;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();

            //lines on bball
            //verticle line
            ctx.lineWidth = '2';
            ctx.beginPath();
            ctx.moveTo(x, y - 12);
            ctx.lineTo(x, y + 12);
            ctx.stroke();
            ctx.closePath();

            //horizontal line
            ctx.beginPath();
            ctx.moveTo(x - 12, y);
            ctx.lineTo(x + 12, y);
            ctx.stroke();
            ctx.closePath();

            //left arc
            ctx.beginPath();
            ctx.arc(x - 22, y, r + 5, 0.6, 5.7, true);
            //ctx.moveTo(x-9, y+12);
            //ctx.lineTo(x-9, y-12);
            ctx.stroke();
            ctx.closePath();

            //right arc
            ctx.beginPath();
            ctx.arc(x + 22, y, r + 5, -2.5, 2.5, true);
            //ctx.moveTo(x+9, y-12);
            //ctx.lineTo(x+9, y+12);
            ctx.stroke();
            ctx.closePath();

        }
        //the rest of the circles represent the players
        else {
            //console.log(r);
            ctx.lineWidth = "4";
            ctx.strokeStyle = "#000000"
            ctx.beginPath();
            ctx.fillStyle = backgroundColor;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.font = "15px Arial";
            ctx.textAlign = 'center';
            ctx.fillText(id, x, y + 5);
        }


    };

    const loadFrame = () => {
        if (typeof currentPlay[frameNum] === 'undefined') {
            console.log('nothing is set yet');
            return 'empty';
        }
        ;
        const theFormation = JSON.parse(currentPlay[frameNum]);


        for (let i = 0; i < theFormation.length; i++) {
            viewCircles[i] = theFormation[i];
        }

    };

    const PreviousFormation = () => {

        if (frameNum > 0) {
            setFrameNum(frameNum - 1);
            loadFrame();

        }


    };
    const NextFormation = () => {

        if (loadFrame() === 'empty') {
            return;
        }
        ;
        loadFrame();
        setFrameNum(frameNum + 1);

    }

    return (


        <div class="container-fluid bg-white">
            <div class='row'>
                <nav class='col-md-2 bg-light'>
                    <div class="sidebar-sticky">

                        <UserListComp currentPlay={currentPlay} onClick={setCurrentPlay}></UserListComp>
                    </div>
                </nav>

                <div class='col-md-auto offset-2'>
                    {<canvas
                        className='basketballCourt'
                        ref={canvas}>
                    </canvas>}


                    <div class='card-body'>
                        <IconContext.Provider value={{color: "#007A33", size: "35px"}}>
                            <button className='btn btn-dark btn-outline-dark' onClick={PreviousFormation}>
                                <BsFillArrowLeftCircleFill/>
                            </button>
                            <button className='btn btn-dark btn-outline-light'><p
                                data-testid='frameNum'>{frameNum}/{currentPlay.length}</p></button>
                            <button className='btn btn-dark' onClick={NextFormation}>
                                <BsFillArrowRightCircleFill/>
                            </button>
                        </IconContext.Provider>
                    </div>
                </div>

            </div>
        </div>


    )
}
export default ViewPlays;
