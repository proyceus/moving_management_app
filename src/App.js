import './App.css';
import {useState} from 'react';
import AddInventoryPage from './Components/AddInventoryPage/AddInventoryPage';


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
      <p>Testing</p>
      <AddInventoryPage 
        setItem={setItem}
        setBox={setBox}
        items={itemList}
        handleAddItem={handleAddItem}
       />
    </div>
  );
}

export default App;
