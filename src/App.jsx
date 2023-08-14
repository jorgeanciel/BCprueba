import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home, Subcategorias, Tipos, MovieDetail } from "./pages";
import { LoadingScreen, NavBar, Notification } from "./components";
import { useEffect } from "react";
import { getCategoriasThunk } from "./store/slices/genres.slice";
import { useDispatch, useSelector } from "react-redux";
import { getTiposThunk } from "./store/slices/tipos.slice";
import { getSubcategoriasThunk } from "./store/slices/subcategorias.slice";
import { getMoviesThunk } from "./store/slices/movies.slice";
import MovieForm from "./pages/MovieForm";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch(getCategoriasThunk());
    dispatch(getTiposThunk());
    dispatch(getSubcategoriasThunk());
    dispatch(getMoviesThunk());
  }, []);

  return (
    <HashRouter>
      <div className="educational-purposes">
        Front-end made by Academlo instructors for educational purposes
      </div>
      <NavBar />
      <Notification />
      {isLoading && <LoadingScreen />}
      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/subcategorias" element={<Subcategorias />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/add" element={<MovieForm />} />
          <Route path="/movies/update/:id" element={<MovieForm />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
