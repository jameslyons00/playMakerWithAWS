import React, {useRef, useState, useEffect} from "react";
import {IconContext} from "react-icons";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsFillPlusCircleFill,
    BsFillTrashFill,
    BsPlayBtn
} from "react-icons/bs";
import "../styles/playMaker.css";

const PlayMaker = () => {


    const canvas = useRef();
    let ctx = null;


    const [circles, setCircles] = useState([
        {x: 370, y: 30, r: 13, colour: "green", id: 1},
        {x: 370, y: 85, r: 13, colour: "green", id: 2},
        {x: 370, y: 140, r: 13, colour: "green", id: 3},
        {x: 370, y: 195, r: 13, colour: "green", id: 4},
        {x: 370, y: 250, r: 13, colour: "green", id: 5},
        {x: 370, y: 355, r: 13, colour: "#87CEEB", id: 1},
        {x: 370, y: 410, r: 13, colour: "#87CEEB", id: 2},
        {x: 370, y: 465, r: 13, colour: "#87CEEB", id: 3},
        {x: 370, y: 520, r: 13, colour: "#87CEEB", id: 4},
        {x: 370, y: 575, r: 13, colour: "#87CEEB", id: 5},
        {x: 370, y: 302, r: 12, colour: "orange", id: 23,}
    ]);

    const [counter, setCounter] = useState(1);
    const [total, setTotal] = useState(1);
    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);
    let formationChange = false;
    let isDown = false;
    let dragTarget = null;
    let startX = null;
    let startY = null;
    let localCount = 0;

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
        loadFromLocal();
        draw();
        countLocal();

    },);


    const countLocal = () => {

        Object.keys(localStorage).forEach(function (key) {

            if (key.includes('formation')) {
                localCount++;
            }

        })
        console.log(localCount);
        if (localCount === 0) setTotal(1);
        else setTotal(localCount + 1);
    }

    // draw rectangle
    const draw = () => {

        ctx.clearRect(
            0,
            0,
            canvas.current.clientWidth,
            canvas.current.clientHeight
        );


        circles.map((info) => drawFillRect(info));
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
            ctx.strokeStyle = "white"
            ctx.beginPath();
            ctx.fillStyle = backgroundColor;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.font = "15px Arial";
            ctx.textAlign = 'center';
            ctx.fillText(id, x, y + 5);
        }


    };

    // identify the click event in the rectangle
    const hitBox = (mx, my) => {
        let isTarget = null;
        for (let i = 0; i < circles.length; i++) {
            const circ = circles[i];

            let dx = circ.x - mx;
            let dy = circ.y - my;
            if (
                dx * dx + dy * dy < circ.r * circ.r

            ) {
                dragTarget = circ;
                isTarget = true;
                break;
            }
        }
        formationChange = true;
        setCircles(circles);
        return isTarget;
    };

    const handleMouseDown = (e) => {
        startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
        startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
        isDown = hitBox(startX, startY);
    };
    const handleMouseMove = (e) => {
        if (!isDown) return;

        const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
        const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
        const dx = mouseX - startX;
        const dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        dragTarget.x += dx;
        dragTarget.y += dy;
        draw();
    };
    const handleMouseUp = () => {
        dragTarget = null;
        isDown = false;
    };
    const handleMouseOut = (e) => {
        handleMouseUp(e);
    };

    const saveToLocal = () => {
        if (formationChange === false) {
            alert("You must change the current frame before making a new one");
            return
        }

        console.log("Save to local storage");
        let formation = circles;
        localStorage.setItem("formations" + counter, JSON.stringify(formation));
        increment();
        console.log(JSON.stringify(formation));

    };

    const loadFromLocal = () => {
        console.log("LOAD FRAME: " + counter);
        let json = localStorage.getItem("formations" + counter);
        if (null === json) {
            return 'empty';
        }
        console.log("Loading.......");
        const formation = JSON.parse(json);

        console.log(json);

        for (let i = 0; i < formation.length; i++) {
            circles[i] = formation[i];
        }
    };

    const PreviousFormation = () => {
        if (counter > 1) {
            loadFromLocal();
            draw();
            decrement()
        }


    };


    const NextFormation = () => {
        if (loadFromLocal() === 'empty') {
            alert('You are at the last frame');
            return
        }

        //currentFrame[0]++;
        //console.log("Loading next formation" + counter);
        loadFromLocal();
        draw();
        increment();
    }

    const play = () => {


        Object.keys(localStorage).forEach(function (key) {

            setTimeout(() => {
                if (key.includes('formation')) {
                    loadFromLocal();
                    draw();
                    increment();
                }
            }, 1000);

        })
        console.log('finished');
    }


    return (

        <div className="playMaker">
            <div className="main-content">

                {<canvas
                    className='basketballCourt'
                    ref={canvas}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseOut={handleMouseOut}>
                </canvas>}
                <IconContext.Provider value={{color: "blue", size: '35px'}}>
                    <div className="canvasButtons">
                        <button onMouseDown={PreviousFormation}><BsFillArrowLeftCircleFill/>
                        </button>
                        <button onMouseDown={saveToLocal}><BsFillPlusCircleFill/>
                        </button>
                        <button onMouseDown={NextFormation}><BsFillArrowRightCircleFill/>
                        </button>
                        <button>
                            <BsFillTrashFill/>
                        </button>
                        <button>{counter + " of " + total}</button>
                        <button onMouseDown={play}>
                            <BsPlayBtn/>
                        </button>

                    </div>
                </IconContext.Provider>
            </div>

        </div>
    )
}
export default PlayMaker;
