import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Todos from "./components/Todos/Todos";
function App() {
  return (
    <div className="App">
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Todos />} path="/" exact />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
