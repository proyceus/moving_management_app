import './App.css';
import {useState} from 'react';
import {AddInventoryPage, Home} from './Components';
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
      </nav>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/additem" element={
          <AddInventoryPage 
            setItem={setItem}
            setBox={setBox}
            items={itemList}
            handleAddItem={handleAddItem}
           />
        } />
      </Routes>
    </div>
  );
}

export default App;
