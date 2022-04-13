import "./AddInventoryPage.css";

const AddInventoryPage = ({setItem, setBox, items, handleAddItem, moveList, setMoveName}) => {


    return (
        <div>
          <div className="addinventory">
            <input type="text" placeholder="Add an item..." onChange={(e) => setItem(e.target.value)} />
            <input type="text" placeholder="Box number..." onChange={(e) => setBox(e.target.value)} />
            <select name="moves" className="moveListDropdown" onChange={setMoveName}>
                <option value=""></option>
                {moveList.map((item) => {
                    return (
                        <option value={item.name}>{item.name}</option>
                    )
                })}
            </select>
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