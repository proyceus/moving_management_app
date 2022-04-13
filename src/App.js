import './App.css';
import {useState} from 'react';
import {AddInventoryPage, Profile, InventoryPage} from './Components';
import {Routes, Route, Link} from 'react-router-dom';
import logo from './images/Moova.png';


function App() {

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState('');
  const [box, setBox] = useState('');
  const [moveName, setMoveName] = useState('');
  const [moveList, setMoveList] = useState([]);
  const [moveDate, setMoveDate] = useState('');


  const handleAddItem = (e) => {
    e.preventDefault();

    const itemInfo = {
      name: item,
      boxNumber: box
    }

    setItemList((prevState) => 
      [...prevState, itemInfo]
    )
  }

  const handleAddMove = (e) => {
    e.preventDefault();

    const moveInfo = {
      name: moveName,
      date: moveDate
    }

    setMoveList((prevState) => 
      [...prevState, moveInfo]
    )
  }

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo"></img>
        <div className="navbarlinks">
          <Link to="/" className="navlinks">Home</Link>
          <Link to="additem" className="navlinks">Add Items</Link>
          <Link to="inventory" className="navlinks">My Inventory</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={ 
          <Profile
            setMoveName={setMoveName}
            setMoveDate={setMoveDate}
            handleAddMove={handleAddMove}
            moveList={moveList}
           /> 
        } />
        <Route path="/additem" element={
          <AddInventoryPage 
            setItem={setItem}
            setBox={setBox}
            items={itemList}
            handleAddItem={handleAddItem}
           />
        } />
        <Route path="/inventory" element={<InventoryPage items={itemList} />} />
      </Routes>
    </div>
  );
}

export default App;
