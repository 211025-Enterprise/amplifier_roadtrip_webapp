import { NavigationBar, Account, Trips, WaypointComponent, Home, Login, Register, PrivateRoute } from "./components/index";
import { Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import { useState, useEffect } from "react";
import { getUserByToken } from "./services/api/userAPI";


function App() {
  const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    sessionStorage.getItem('jwt') ? getUserByToken().then(res => {
      if (res.status === 200) {
        setAuthUser(res.data);
      } else {

        console.log("Invalid or Bad Login Token!");
        sessionStorage.clear();
        setAuthUser(null);
      }
    }) : setAuthUser(null);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar authUser={authUser} setAuthUser={setAuthUser} />}>
        <Route path="" element={<PrivateRoute authUser={authUser} />}>
          <Route path="Account" element={<Account authUser={authUser} setAuthUser={setAuthUser} />} />
          <Route path="Trips" element={<Trips authUser={authUser} />} />
          <Route path="Waypoints" element={<WaypointComponent />} />
        </Route>
        <Route path="Home" element={<Home />} />
        <Route path="Login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="Register" element={<Register setAuthUser={setAuthUser} />} />
      </Route>
    </Routes>
  );
}

export default App;
