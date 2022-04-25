import React, {useCallback, useEffect, useRef, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {listUserPlays} from "../graphql/queries";
import {Button, Card} from 'react-bootstrap';

function UserListComp({viewCircles, onClick}) {

    const [plays, setPlays] = useState([]);
    const formationArray = useRef([]);
    const frameCount = useRef(0);
    const [selected, setSelected] = useState(0);


    const fetchUserPlays = useCallback(async () => {

        try {
            const userPlayData = await API.graphql(graphqlOperation(listUserPlays));
            const userPlayList = userPlayData.data.listUserPlays.items;
            console.log('Play List', userPlayList);
            localStorage.setItem('plays', JSON.stringify(userPlayList));
            setPlays(userPlayList);


        } catch (error) {
            console.log('error fetching data', error);
        }

    }, []);


    useEffect(() => {
        //if
        if (localStorage.getItem('plays') === true) {
            setPlays(JSON.parse(localStorage.getItem('plays')));
        }
        fetchUserPlays()
            .catch(console.error);

    }, [fetchUserPlays]);

    const getSelectedPlay = () => {

        let dbString = (plays[selected].formations);

        //let dbCircles=[];
        formationArray.current = dbString.split(";");
        let result = formationArray.current;
        console.log(result);
        /*const formation = JSON.parse(formationArray.current[0]);
        for (let i = 0; i < formation.length; i++) {
            dbCircles[i] = formation[i];
        }
        console.log('MY circles', dbCircles);*/
        return result;
    };

    const handleOnClick = () => {
        let dbResult = getSelectedPlay();
        console.log();
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
                                <Button class='btn btn-link' onClick={function () {
                                    handleOnClick();
                                    setSelected(index);
                                }}>view{index + 1}</Button>
                            </div>
                        </Card>
                    </>


                })
            }
        </ul>


    )
}

export default UserListComp;


