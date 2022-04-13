import "./InventoryPage.css";

const InventoryPage = ({moveList}) => {

    return (
        <div className="inventoryPage">
            <h1>My Inventory</h1>
            {moveList.length > 1 && 
              <div className="inventoryFilter">
              <p>Filter:</p>
              <select name="moves" className="moveListDropdown">
                <option value=""></option>
                <option value="pierre">Pierre</option>
              </select>
              </div>}

            <div className="inventoryTable">
                <table>
                    <tr>
                        <th>Move name</th>
                        <th>Item name</th>
                        <th>Box number</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default InventoryPage;