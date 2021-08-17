import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from './Display';
import Form from './Form';
import './App.css';




function App() {
const url = "https://favorite-places-ca.herokuapp.com";
const [places, setPlaces] = useState([]);

// EMPTY PLACE
const emptyPlace = {
  img: "",
  name: "",
  description: ""
}

const [selectedPlace, setSelectedPlace] = useState(emptyPlace)
  
const getPlaces = () => {
  fetch(url + "/places")
   .then((response) => response.json())
   .then((data) => {
    setPlaces(data);
    });
  };
  
useEffect(() => getPlaces(), []);

// handleCreate for creating new places
const handleCreate = (newPlace) => {
  fetch(url + "/places", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlace),
  }).then(() => {
    getPlaces();
  });
};

// handleUpdate for updating places
const handleUpdate = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(place),
  }).then(() => {
    getPlaces();
  });
};

const selectPlace = (place) => {
  setSelectedPlace(place)
}

// delete
const deletePlace = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "delete",
  }).then(() => {
    getPlaces();
  });
};

  return (
    <div className="App">
      <h1>PLACES LISTING SITE</h1>
      <hr />
      
    <Link to="/create">
    <button>Add Place</button>
    </Link>
      <main>
      <Switch>
          <Route exact path="/" render={(rp) => (<Display {...rp} places={places} selectPlace={selectPlace} deletePlace={deletePlace}/>)} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>

          {/* <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          /> */}

      </main>
    </div>
  );
}

export default App;
