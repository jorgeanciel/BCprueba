const searchAndFormatMovie = (movies, id) => {
  const movie = movies.find((movie) => movie.id === id);
  const categorias = movie.categorias?.map((categoria) => categoria.id) || [];
  const tipos = movie.tipos?.map((tipos) => tipos.id) || [];
  const subcategorias =
    movie.subcategorias?.map((subcategorias) => subcategorias.id) || [];

  return { ...movie, categorias, tipos, subcategorias };
};

export default searchAndFormatMovie;
