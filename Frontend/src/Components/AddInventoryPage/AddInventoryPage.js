import "./AddInventoryPage.css";

const AddInventoryPage = ({
  setItem,
  setBox,
  items,
  handleAddItem,
  moveList,
  setMoveName,
  moveName,
}) => {
  return (
    <div className="addInventory">
      <div className="addItemForm">
        <h1>Add items</h1>
        <div className="addInventoryInputs">
          <p>Item name:</p>
          <input type="text" onChange={(e) => setItem(e.target.value)} />
          <p>Box number:</p>
          <input type="text" onChange={(e) => setBox(e.target.value)} />
          <p>Select move:</p>
          <select
            required
            name="moves"
            className="moveListDropdown"
            onChange={(e) => {
              setMoveName(e.target.value);
            }}
          >
            {moveList.map((item) => {
              return (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          {moveName ? (
            <button onClick={handleAddItem} className="moveSubmit">
              Submit
            </button>
          ) : (
            <p className="error">
              Need to create a move on homepage in order to add items
            </p>
          )}
        </div>
      </div>

      <div className="itemlist">
        <h1>Recently added</h1>
        <ul>
          {items &&
            items.slice(items.length - 10, items.length).map((item) => (
              <li className="recentlyAdded" key={item.name}>
                <span>{item.name}</span> added to{" "}
                <span>box {item.boxNumber}</span> for the{" "}
                <span>{item.moveName}</span> move on{" "}
                {new Date(item.dateAdded).toLocaleDateString()}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AddInventoryPage;
