// Character creation sheet, this data will persist throughout the game

import React, {useState, useEffect} from "react"
import {apiStates, useApi} from "./Hooks/useApi";
import AttributeList from "./AttributeList";
import TextInput from "./TextInput";

function CharacterInput() {
    // API Data
    const [data, state, error] = useApi("https://swapi.dev/api/species/");
    // Character Attributes
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [species, setSpecies] = useState({})
    const [eyeColor, setEyeColor] = useState("")
    const [skinColor, setSkinColor] = useState("")
    const [hairColor, setHairColor] = useState("")
    // Index associated with that spcies in the API data
    const [speciesIndex, setSpeciesIndex] = useState(0)

    const handleSubmit = (e) => {
        // Check if all attribute fields have a value
        if(eyeColor === "" || skinColor === "" || hairColor === "") {alert("One or more fields not chosen")}
        // Submit data for game start
        else {alert("Success!")}
        e.preventDefault()
    }

    // Change the species when the species index is updated from the species names list
    useEffect( () => { 
        setSpecies(data[speciesIndex])
        // When a species changes from the drop down the other attribute values should be reset
        // This way data from other spcies does not get submitted accidently
        setEyeColor("")
        setSkinColor("")
        setHairColor("") 
    }, [data, speciesIndex])

    switch (state) {
        case apiStates.ERROR: 
            return <p>ERROR: {error || 'General Error'}</p>
        case apiStates.SUCCESS:
            return (
            <div>
                <form className="character-form" onSubmit={handleSubmit}>
                    <TextInput 
                        text="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <TextInput 
                        text="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <AttributeList
                        name={"Species"}
                        value={speciesIndex}
                        onChange={e => setSpeciesIndex(parseInt(e.currentTarget.value))}
                        list={data.map(d => d.name)} 
                    />
                    <AttributeList 
                        name={"Eye Color"}
                        value={eyeColor}
                        text="Eye Colors"
                        onChange={e => setEyeColor(e.currentTarget.value)}
                        list={species && (species.eye_colors).split(",")}
                    />
                    <AttributeList
                        name={"Skin Color"}
                        value={skinColor}
                        text="Skin Colors"
                        onChange={e => setSkinColor(e.currentTarget.value)}
                        list={species && (species.skin_colors).split(",")}
                    />
                    <AttributeList 
                        name={"Hair Color"}
                        value={hairColor}
                        text="Hair Colors"
                        onChange={e => setHairColor(e.currentTarget.value)}
                        list={species && (species.hair_colors).split(",")}
                    />
                    <button type="submit">Create</button>
                    </form>
                </div>
            )
        default: 
            return <h1>Loading...</h1>
    }
}

export default CharacterInput