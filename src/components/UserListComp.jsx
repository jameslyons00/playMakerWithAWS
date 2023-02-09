import React, {useCallback, useEffect, useRef, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {listUserPlays} from "../graphql/queries";
import {Button, Card} from 'react-bootstrap';

function UserListComp({viewCircles, onClick}) {

    const [plays, setPlays] = useState([]);
    const formationArray = useRef([]);
    const frameCount = useRef(0);
    const [selected, setSelected] = useState(0);


    const fetchUserPlays = useCallback(async () => {//optimizes re-render when passed as dependency in use effect hook

        try {
            const userPlayData = await API.graphql(graphqlOperation(listUserPlays));//imports the listUser play fn that we created
            const userPlayList = userPlayData.data.listUserPlays.items;//gets just the list of plays
            console.log('Play List', userPlayList);//to see the data
            setPlays(userPlayList);//set the state of the plays with the result using useState hook

        } catch (error) {//catch and display any potential errors
            console.log('error fetching data', error);
        }
    }, []);


    useEffect(() => {

        void fetchUserPlays()
        //  .catch(console.error);

    }, []);


    const getSelectedPlay = () => {

        let dbString = (plays[selected].formations);
        formationArray.current = dbString.split(";");
        let result = formationArray.current;
        console.log("I SELECTED THIS: " + selected);
        return result;
    };

    const handleOnClick = (index) => {
        console.log("This is the index: " + index)
        setSelected(index);
        console.log("Selected is now" + selected);
        let dbResult = getSelectedPlay();
        console.log("result from on click", dbResult);
        frameCount.current = formationArray.current.length;
        console.log(frameCount.current);
        onClick(dbResult);
    };


    return (


        <ul class='nav flex-column text-center text-success'>
            <li><h3>Saved Plays</h3></li>
            {
                plays.map((play, index) => {
                    return <>
                        <Card>

                            <div class='card-body'>
                                <li>{play.name}</li>
                                <li>owner: {play.owner}</li>
                                <Button class='btn btn-link'
                                        onClick={() => handleOnClick(index)}>view</Button>
                            </div>
                        </Card>
                    </>


                })
            }
        </ul>


    )
}

export default UserListComp;


