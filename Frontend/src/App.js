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

// const setToken = (userToken) => {
//   sessionStorage.setItem('token', JSON.stringify(userToken))
// }

// const getToken = () => {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function App() {
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState("");
  const [box, setBox] = useState("");
  const [moveName, setMoveName] = useState("");
  const [moveList, setMoveList] = useState([]);
  const [moveDate, setMoveDate] = useState("");

  const [userToken, setUserToken] = useState();



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

  if (!token) {
    return <LoginPage userToken={userToken} setUserToken={setUserToken} />;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo"></img>
        <div className="navbarlinks">
          {token ? (
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
              <button type="submit" onClick={() => console.log(token)}>Clicky</button>
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
