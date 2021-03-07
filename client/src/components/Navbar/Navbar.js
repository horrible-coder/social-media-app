import React, { useState } from "react";
import "./Navbar.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import StatusModal from "../StatusModal/StatusModal";

const LS_PREFIX = "status-share-";

function Navbar() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarItemsLeft">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              format="dd MMM, yyyy"
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="navbarItemsCenter">
          <div className="addStatus" onClick={() => setStatusModalOpen(true)}>
            <AddIcon />
            <p>Add status</p>
          </div>
        </div>
        <div className="navbarItemsRight">
          <ul>
            <li>{localStorage.getItem(LS_PREFIX + "fullName")}</li>
            <ExitToAppIcon onClick={handleLogout} />
          </ul>
        </div>
      </div>

      <StatusModal
        show={statusModalOpen}
        onHide={() => setStatusModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
