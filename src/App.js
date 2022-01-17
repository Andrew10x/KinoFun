import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Genres from "./pages/Genres";
import FindFilm from "./pages/FindFilm";
import FilmPage from "./pages/FilmPage";
import ActorPage from "./pages/ActorPage";
import FindActor from "./pages/FindActor";
import AdminPage from "./pages/AdminPage";
import EditDelActor from "./admin/EditDelActor";
import EditDelGenre from "./admin/EditDelGenre";
import EditDelCountry from "./admin/EditDelCountry";
import WatchDelComments from "./admin/WatchDelComments";
import EditDelUser from "./admin/EditDelUser";
import EditFilm from "./admin/EditDelFilm/EditFilm";
import AddFilm from "./admin/AddFilm";
import EditDelFilm from "./admin/EditDelFilm";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import axios from "axios";
import './styles.scss';


function App() {
  const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        const config = {
            headers: {'Authorization': "bearer " + localStorage.token}
        };
        if(localStorage.token)
        axios.get('http://localhost:4000/getRole', config)
        .then(({data}) => setUserRole(data.rolename))
    })
  return (
    <Router>
        <Header />
        <div className="main">
        <Routes>
          <Route exact path="/"  element={<MainPage />} />
          <Route path="/genres"  element={<Genres />} />
          <Route path="/findFilm" element={<FindFilm />} />
          <Route path="/findActor" element={<FindActor />} />
          <Route path="/actor" element={<ActorPage />} />
          <Route path="/film" element={<FilmPage/>} />
          <Route path="/findFilm/film" element={<FilmPage/>} />
          <Route path="findActor/actor" element={<ActorPage />} />
          {
            localStorage.token &&
          <Route path="/editFilm" element={<EditFilm />} />
          }
          {
            localStorage.token &&
          <Route path="/admin" element={<AdminPage />} />
          }
          {
            localStorage.token &&
          <Route path="/editDelActor" element={<EditDelActor />} />
          }
          {
            localStorage.token && userRole === 'admin' &&
          <Route path="/editDelGenre" element={<EditDelGenre />} />
          }
          {
            localStorage.token && userRole === 'admin' &&
          <Route path="/editDelCountry" element={<EditDelCountry />} />
          }
          {
            localStorage.token &&
          <Route path="/watchDelComments" element={<WatchDelComments />} />
          }
          {
            localStorage.token &&
          <Route path="/addFilm" element={<AddFilm />} />
          }
          {
            localStorage.token &&
          <Route path="/editDelFilm" element={<EditDelFilm />} />
          }
          {
            localStorage.token && userRole === 'admin' &&
          <Route path="/editDelUser" element={<EditDelUser />} />
          }
        </Routes>
        </div>
        <Footer />
    </Router>
  
  );
}

export default App;
