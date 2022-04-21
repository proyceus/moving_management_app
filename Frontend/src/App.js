import "./App.css";
import { useState } from "react";
import {
  AddInventoryPage,
  Profile,
  InventoryPage,
  LoginPage,
  SignupPage,
} from "./Components";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./images/Moova.png";

function App() {
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState("");
  const [box, setBox] = useState("");
  const [moveName, setMoveName] = useState("");
  const [moveList, setMoveList] = useState([]);
  const [moveDate, setMoveDate] = useState("");
  const [token, setToken] = useState();

  //can remove this later
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddItem = (e) => {
    e.preventDefault();

    const itemInfo = {
      name: item,
      boxNumber: box,
      moveName: moveName,
      dateAdded: Date(),
    };

    setItemList((prevState) => [...prevState, itemInfo]);
  };

  const handleAddMove = (e) => {
    e.preventDefault();

    const moveInfo = {
      name: moveName,
      date: moveDate,
    };

    setMoveList((prevState) => [...prevState, moveInfo]);
  };

  const toggleLogin = () => {
    if (isLoggedIn === true) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  if (!token) {
    return <SignupPage setToken={setToken} />;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo"></img>
        <div className="navbarlinks">
          {isLoggedIn ? (
            <>
              <Link to="/" className="navlinks">
                Home
              </Link>
              <Link to="additem" className="navlinks">
                Add Items
              </Link>
              <Link to="inventory" className="navlinks">
                My Inventory
              </Link>
            </>
          ) : (
            <>
              <Link to="login" className="navlinks">
                Login
              </Link>
              <Link to="signup" className="navlinks">
                Sign Up
              </Link>
            </>
          )}
          <button onClick={toggleLogin}>Toggle</button>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Profile
              setMoveName={setMoveName}
              setMoveDate={setMoveDate}
              handleAddMove={handleAddMove}
              moveList={moveList}
              itemList={itemList}
            />
          }
        />
        <Route
          path="/additem"
          element={
            <AddInventoryPage
              setItem={setItem}
              setBox={setBox}
              items={itemList}
              handleAddItem={handleAddItem}
              moveList={moveList}
              setMoveName={setMoveName}
              moveName={moveName}
            />
          }
        />
        <Route
          path="/inventory"
          element={<InventoryPage itemList={itemList} moveList={moveList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
