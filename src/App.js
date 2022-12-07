import "./App.css";
// import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import HomePageTodos from "./components/Todos/HomePageTodos";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<HomePageTodos />} path="/" exact />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
