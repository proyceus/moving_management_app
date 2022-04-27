import "./App.css";
import { useEffect, useState } from "react";
import {
  AddInventoryPage,
  Profile,
  InventoryPage,
  LoginPage,
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

  const [userToken, setUserToken] = useState({});

  const [userProfile, setUserProfile] = useState();

  const searchUser = async () => {
    console.log("searched");
    await fetch("http://localhost:3001/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    })
      .then((data) => data.json())
      .then((profile) => setUserProfile(profile));
  };

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

  const handleAddMove = async () => {
    const moveInfo = {
      moveName,
      moveDate,
      //stuck here, the program isn't moving the user info into state right after login for some reason...need to fix this
      _id: userProfile._id
    }

    await fetch("http://localhost:3001/addmove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moveInfo),
    }).then((data) => data.json());
  };

  const handleLogoutSubmit = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }).then((data) => data.json());

    setUserProfile({});
    setUserToken({});
  };

  useEffect(() => {
    if (userToken.token && userToken.token.length > 1) {
      searchUser();
    }
  }, []);

  if (!userToken.token) {
    return (
      <LoginPage
        userToken={userToken}
        setUserToken={setUserToken}
        searchUser={searchUser}
      />
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo"></img>
        <div className="navbarlinks">
          {userToken ? (
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
              <button type="submit" onClick={() => console.log(userToken)}>
                Clicky
              </button>
              <button type="submit" onClick={() => console.log(userProfile)}>
                Profile
              </button>
              <button type="submit" onClick={searchUser}>
                Search
              </button>
              <button type="submit" onClick={handleLogoutSubmit}>
                Logout
              </button>
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
              userProfile={userProfile}
              searchUser={searchUser}
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
