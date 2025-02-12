import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {

    const [buds, setBuds] = useState([]);

    useEffect(() => {
        fetch('https://cs571.org/rest/f24/hw5/buds', {
            headers: {
                "X-CS571-ID": "bid_fa7b6e58f1e6e815b24f65eb00bee192a12b3ae27a632ad5cb809b460752b68e"
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats)
            })
    }, []);

    console.log("Check from API", buds)

    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            <BadgerBudsDataContext.Provider value={buds}>
                <Outlet />
            </BadgerBudsDataContext.Provider>
        </div>
    </div>
}