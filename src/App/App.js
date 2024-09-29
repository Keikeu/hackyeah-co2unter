import { Outlet } from "react-router-dom";
import React from "react";
import Logo from "commons/components/Logo";

function App() {
  return (
    <>
      <Logo />
      <Outlet />
    </>
  );
}

export default App;
