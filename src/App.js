import './App.css';
import {useState} from 'react';
import {AddInventoryPage, Profile, InventoryPage} from './Components';
import {Routes, Route, Link} from 'react-router-dom';


function App() {

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState('');
  const [box, setBox] = useState('');


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

  return (
    <div className="App">
      <h1>My Moving App</h1>
      <nav className="navbar">
        <Link to="/" className="navlinks">Home</Link>
        <Link to="additem" className="navlinks">Add Items</Link>
        <Link to="inventory" className="navlinks">My Inventory</Link>
      </nav>
      <Routes>
        <Route path="/" element={ <Profile /> } />
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
