import React from 'react'
import "../App.css";
import { database } from "../config/firebase-config";

const ManageProfile = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [region, setRegion] = useState("");
    const [bio, setBio] = useState("");
    const [sport1, setSport1] = useState("");
    const [sport2, setSport2] = useState("");
    const [sport3, setSport3] = useState("");
    const [sport4, setSport4] = useState("");
    const [sport5, setSport5] = useState("");
    const [sport6, setSport6] = useState("");
    const [sport7, setSport7] = useState("");
    const [sportOthers, setSportOthers] = useState("");

    return (
        <form className="form">
            <h1>Manage Your Profile</h1>

            <div>
                <p>
                    <label for="name">Name </label>
                    <input id="name" type="text" placeholder="Enter your name" required value={name}
                        onChange={(e) => setName(e.target.value)}></input>
                </p>
                <p>
                    <label for="age">Age </label>
                    <input id="age" type="number" placeholder="Enter your age" min="0" max="120" step="2" value={age}
                        onChange={(e) => setAge(e.target.value)}></input>
                </p>
                <p>
                    <label for="Region">Region </label>
                    <input id="Region" type="text" placeholder="Enter your region" required value={region}
                        onChange={(e) => setRegion(e.target.value)}></input>
                </p>

                <label>Bio</label>
                <textarea placeholder="Introduce yourself" value={bio}
                    onChange={(e) => setBio(e.target.value)}></textarea>

                <br />
                <br />

                <p>
                    Please select all sports you would like to look for matches with:
                </p>
                <p>
                    <input type="radio" id="Basketball" value={sport1}
                        onChange={(e) => setSport1(e.target.value)}></input>
                    <label for="Basketball">Basketball</label>
                </p>
                <p>
                    <input type="radio" id="Swimming" value={sport2}
                        onChange={(e) => setSport2(e.target.value)}></input>
                    <label for="Swimming">Swimming</label>
                </p>
                <p>
                    <input type="radio" id="Weight_Lifting" value={sport3}
                        onChange={(e) => setSport3(e.target.value)}></input>
                    <label for="Weight_Lifting">Weight Lifting</label>
                </p>
                <p>
                    <input type="radio" id="Jogging" value={sport4}
                        onChange={(e) => setSport4(e.target.value)}></input>
                    <label for="Jogging">Jogging</label>
                </p>
                <p>
                    <input type="radio" id="Table_Tennis" value={sport5}
                        onChange={(e) => setSport5(e.target.value)}></input>
                    <label for="Table_Tennis">Table Tennis</label>
                </p>
                <p>
                    <input type="radio" id="Tennis" value={sport6}
                        onChange={(e) => setSport6(e.target.value)}></input>
                    <label for="Tennis">Tennis</label>
                </p>
                <p>
                    <input type="radio" id="Badminton" value={sport7}
                        onChange={(e) => setSport7(e.target.value)}></input>
                    <label for="Badminton">Badminton</label>
                </p>
                <p>
                    <input type="radio" id="Others" value={sportOthers}
                        onChange={(e) => setSportOthers(e.target.value)}></input>
                    <label for="Others">Others: </label>
                    <input id="Others" type="text" placeholder="Please specify the sport"></input>
                </p>
                <br />
                <p>
                    <label for="personality">Please select what you think best describes you: </label>
                    <br />
                    <select name="personality" id="personality">
                        <option value="" selected>--Prefer not to answer--</option>
                        <option value="Very_Extro">Very Extrovert</option>
                        <option value="Somehow_Extro">Somehow Extrovert</option>
                        <option value="Intermedium">Intermedium</option>
                        <option value="Somehow_Intro">Somehow Introvert</option>
                        <option value="Very_Intro">Very Introvert</option>
                    </select>
                </p>

                <br />

                <button>Save</button>
            </div>

        </form>
    )
}

export default ManageProfile
