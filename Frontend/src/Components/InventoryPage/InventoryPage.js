import "./InventoryPage.css";
import { useState } from "react";

const InventoryPage = ({ moveList, itemList }) => {
  const [filteredSelect, setFilteredSelect] = useState("");
  return (
    <div className="inventoryPage">
      <h1>My Inventory</h1>
      {moveList.length > 1 && (
        <div className="inventoryFilter">
          <p>Filter:</p>
          <select
            name="moves"
            className="moveListDropdown"
            onChange={(e) => {
              setFilteredSelect(e.target.value);
            }}
          >
            <option value="">All Moves</option>
            {moveList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className="inventoryTable">
        <table>
          <thead>
            <tr>
              <th>Move name</th>
              <th>Item name</th>
              <th>Box number</th>
            </tr>
          </thead>
          <tbody>
            {filteredSelect === ""
              ? itemList &&
                itemList.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.moveName}</td>
                      <td>{item.itemName}</td>
                      <td>{item.boxNumber}</td>
                    </tr>
                  );
                })
              : itemList
                  .filter((word) => word.moveName === filteredSelect)
                  .map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.moveName}</td>
                        <td>{item.itemName}</td>
                        <td>{item.boxNumber}</td>
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
