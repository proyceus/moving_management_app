import "./Profile.css";
import { useEffect } from "react";

const Profile = ({
  setMoveName,
  setMoveDate,
  handleAddMove,
  moveList,
  itemList,
  userProfile,
  searchUser,
  accountTotalBoxes,
}) => {
  return (
    <div className="profilePage">
      <div className="profileTitle">
        <h1 className="profileTitle">Profile Page</h1>
        <div className="userInfo">
          <p>Welcome back, {userProfile && userProfile.email}</p>
          <div className="userData">
            <p>Current items in inventory: {itemList.length}</p>
            <p>Total number of boxes: {accountTotalBoxes}</p>
          </div>
        </div>
      </div>
      <div className="recentAdd">
        <h1 className="recentAddTitle">Recently added items</h1>
        <div className="recentsTable">
          <table>
            <thead>
              <tr>
                <th>Move</th>
                <th>Item</th>
                <th>Box #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Royce's</td>
                <td>Chair</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="createMove">
        <h1 className="createMoveTitle">Create a move</h1>
        <div className="createMoveInfo">
          <p>Move name:</p>
          <input
            type="text"
            onChange={(e) => {
              setMoveName(e.target.value);
            }}
          ></input>
          <p>Date of move (MM/DD/YYYY):</p>
          <input
            type="text"
            onChange={(e) => {
              setMoveDate(e.target.value);
            }}
          ></input>
          <br />
          <button type="submit" className="moveSubmit" onClick={handleAddMove}>
            Submit
          </button>
        </div>
      </div>
      <div className="moveList">
        <h1 className="moveListTitle">Move list</h1>
        <div className="moveListTable">
          <table>
            <thead>
              <tr>
                <th>Move name</th>
                <th>Date</th>
                <th># of current boxes</th>
              </tr>
            </thead>
            <tbody>
              {moveList &&
                moveList.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{new Date(item.moveDate).toLocaleDateString()}</td>
                      <td>{item.boxNumberTotal}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
