import React, { Fragment, useState } from "react";
import AdminSideNav from "../admin/AdminSideNav";
import MedRepSideNav from "../medicalRep/MedRepSideNav";

const SideNav = () => {
  const [user] = useState("medrep");

  const setUser = () => {
    if (user === "admin") return <AdminSideNav />;
    if (user === "medrep") return <MedRepSideNav />;
  };
  return <Fragment>{setUser()}</Fragment>;
};

export default SideNav;
