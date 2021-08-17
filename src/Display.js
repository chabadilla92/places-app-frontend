import React from "react";

const Display = (props) => {

    console.log('props-', props.places)
    const loaded = () => (
        <div style={{textAlign: "center"}}>
        {props.places.map((place) => (
            <div>
                <img src={place.img} alt="alt"/>
                <h1>{place.name}</h1>
                <h3>{place.description}</h3>
                <button
                    onClick={() => {
                        props.selectPlace(place);
                        props.history.push("/edit");
                    }}
                    >Edit</button>
                <button
                    onClick={() => {
                        props.deletePlace(place);
                    }}
                    >Delete</button>
            </div>
        ))}
        </div>
);

const loading = <h1>Loading..</h1>

return props.places.length > 0 ? loaded() : loading;
};

export default Display;