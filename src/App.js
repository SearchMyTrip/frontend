import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { isAuthPage, redirectIfNotLoggedIn } from "./utils/helper";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [authPath, setAuthPath] = useState(true);
  const [isDashboardPage, setIsDashboardPage] = useState(false);

  useEffect(() => {
    redirectIfNotLoggedIn();

    setAuthPath(isAuthPage());

    if (window.location.pathname === "/dashboard") {
      setIsDashboardPage(true);
    } else {
      setIsDashboardPage(false);
    }
  }, []);

  return (
    <div>
      {authPath ? "" : <Header />}

      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/signup" component={Signup} exact></Route>
        <Route path="/dashboard" component={Dashboard} exact></Route>
        <Route component={() => <h1>404 ! Page not found.</h1>}></Route>
      </Switch>

      {isDashboardPage || authPath ? "" : <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
