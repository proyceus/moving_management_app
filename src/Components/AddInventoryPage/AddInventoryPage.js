import "./AddInventoryPage.css";

const AddInventoryPage = ({setItem, setBox, items, handleAddItem}) => {


    return (
        <div>
          <div className="addinventory">
            <input type="text" placeholder="Add an item..." onChange={(e) => setItem(e.target.value)} />
            <input type="text" placeholder="Box number..." onChange={(e) => setBox(e.target.value)} />
            <button onClick={handleAddItem}>Submit</button>
          </div>
          <div className="itemlist">
              <ul>
                  {items && items
                    .map((item) => <li>Name: {item.name} Box: {item.boxNumber}</li>)}
              </ul>
          </div>
        </div>
        
    )
}

export default AddInventoryPage;