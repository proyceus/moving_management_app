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
import loadingGif from "./images/loading.gif";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState("");
  const [box, setBox] = useState("");
  const [moveName, setMoveName] = useState("");
  const [moveList, setMoveList] = useState([]);
  const [moveDate, setMoveDate] = useState("");
  const [accountTotalBoxes, setAccountTotalBoxes] = useState(0);
  const [userToken, setUserToken] = useState({});
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();

  const [userProfile, setUserProfile] = useState();

  const searchUser = async () => {
    await fetch(`http://localhost:3001/user?email=${user.email}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((profile) => {
        setUserProfile({
          email: profile.email,
          move: profile.move,
          updatedAt: profile.updatedAt,
        });
        setMoveList(profile.move);
        let total = 0;
        for (let i = 0; i < profile.move.length; i++) {
          total = profile.move[i].boxNumberTotal + total;
        }
        setAccountTotalBoxes(total);
        let fullItemList = [];
        //will refactor this code later. works for now.
        for (let i = 0; i < profile.move.length; i++) {
          for (let j = 0; j < profile.move[i].boxes.length; j++) {
            for (let k = 0; k < profile.move[i].boxes[j].items.length; k++) {
              fullItemList.push(profile.move[i].boxes[j].items[k]);
            }
          }
        }
        setItemList(fullItemList);
      });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    const itemInfo = {
      name: item,
      boxNumber: box,
      moveName: moveName,
      email: userProfile.email,
      dateAdded: new Date(),
    };

    await fetch("http://localhost:3001/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemInfo),
    }).then((data) => data.json());

    searchUser();
  };

  const handleAddMove = async () => {
    const moveInfo = {
      name: moveName,
      moveDate,
      email: user.email,
      boxNumberTotal: 1,
    };

    setMoveList((original) => [...original, moveInfo]);

    await fetch(`http://localhost:3001/addmove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moveInfo),
    })
      .then((data) => data.json())
      .then((user) => console.log(user));

    // searchUser();
  };

  useEffect(() => {
    if (isAuthenticated) {
      searchUser();
      console.log("loading details");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadingGif} alt="loading" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        userToken={userToken}
        setUserToken={setUserToken}
        searchUser={searchUser}
        loginWithRedirect={loginWithRedirect}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo"></img>
        <div className="navbarlinks">
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
            <button onClick={() => console.log(itemList)}>Items</button>
          </>
        </div>
        <button type="submit" onClick={logout} className="logoutButton">
          Logout
        </button>
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
              accountTotalBoxes={accountTotalBoxes}
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
