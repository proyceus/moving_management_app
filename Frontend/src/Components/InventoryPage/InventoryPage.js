import "./InventoryPage.css";

const InventoryPage = ({ moveList, itemList }) => {
  return (
    <div className="inventoryPage">
      <h1>My Inventory</h1>
      {moveList.length > 1 && (
        <div className="inventoryFilter">
          <p>Filter:</p>
          <select name="moves" className="moveListDropdown">
            <option value=""></option>
            {moveList.map((item) => {
              return <option value={item.name}>{item.name}</option>;
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
            {itemList &&
              itemList.map((item) => {
                return (
                  <tr>
                    <td>{item.moveName}</td>
                    <td>{item.name}</td>
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
