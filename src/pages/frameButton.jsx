import {IconContext} from "react-icons";

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsFillPlusCircleFill,
    BsSave,
    BsPlayBtn
} from "react-icons/bs";
import React from "react";

export function FrameButton(props) {
    return <IconContext.Provider value={{color: "#007A33", size: "35px"}}>
        <div className="canvasButtons">
            <button class='btn btn-dark btn-outline-dark' onMouseDown={props.onMouseDown}><BsFillArrowLeftCircleFill/>
            </button>
            <button class='btn btn-dark' onMouseDown={props.onMouseDown1}><BsFillPlusCircleFill/>
            </button>
            <button class='btn btn-dark' onMouseDown={props.onMouseDown2}><BsFillArrowRightCircleFill/>
            </button>
            <button class='btn btn-dark' onMouseDown={props.onMouseDown4}>
                <BsSave/>
            </button>
            <button class='btn btn-dark'>{props.counter + " of " + props.total}</button>
            <button class='btn btn-dark' onMouseDown={props.onMouseDown3}>
                <BsPlayBtn/>
            </button>

        </div>
    </IconContext.Provider>;
}