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
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const [userProfile, setUserProfile] = useState();

  const searchUser = async () => {
    // console.log("searched");
    // await fetch("http://localhost:3001/me", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${userToken.token}`,
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((profile) => {
    //     setUserProfile(profile);
    //     setMoveList(profile.move);
    //     let total = 0;
    //     for (let i = 0; i < profile.move.length; i++) {
    //       total = profile.move[i].boxNumberTotal + total;
    //     }
    //     setAccountTotalBoxes(total);
    //     let fullItemList = [];
    //     //will refactor this code later. works for now.
    //     for (let i = 0; i < profile.move.length; i++) {
    //       for (let j = 0; j < profile.move[i].boxes.length; j++) {
    //         for (let k = 0; k < profile.move[i].boxes[j].items.length; k++) {
    //           fullItemList.push(profile.move[i].boxes[j].items[k]);
    //         }
    //       }
    //     }
    //     setItemList(fullItemList);
    //   });
    await fetch(`http://localhost:3001/me?email=${user.email}}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((profile) => console.log(profile));

    console.log(user);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    const itemInfo = {
      name: item,
      boxNumber: box,
      moveName: moveName,
      _id: userProfile._id,
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

    await fetch("http://localhost:3001/addmove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moveInfo),
    }).then((data) => data.json());

    searchUser();
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated");
    }
  });

  const handleTest = async () => {
    await fetch("http//localhost:3001/test?email=test@hotmail.com", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((x) => console.log(x));
  };

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
              <button type="submit" onClick={() => console.log(userProfile)}>
                Profile
              </button>
              <button type="submit" onClick={searchUser}>
                Search
              </button>
              <button type="submit" onClick={() => console.log(moveList)}>
                Move List
              </button>
              <button type="submit" onClick={() => logout()}>
                Logout
              </button>
              <button type="submit" onClick={handleTest}>
                Test
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
