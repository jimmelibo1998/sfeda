import React, { Fragment, useState } from "react";
import AdminMainNav from "../admin/AdminMainNav";
import MedRepNavBar from "../medicalRep/MedRepNavBar";

import "./NavBar.css";

const Navbar = () => {
  const [user] = useState("medrep");

  const setUser = () => {
    if (user === "admin") return <AdminMainNav />;
    if (user === "medrep") return <MedRepNavBar />;
  };
  return <Fragment>{setUser()}</Fragment>;
};

export default Navbar;
