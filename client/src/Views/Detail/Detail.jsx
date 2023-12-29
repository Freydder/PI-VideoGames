import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterByDetail } from "../../redux/action";
import style from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(filterByDetail(id));
  }, [dispatch, id]);

  if (!detail) {
    return (
      <div>
        <div>Cargando...</div>
      </div>
    );
  } else {
    const backgroundImageUrl = "https://www.sopitas.com/wp-content/uploads/2017/08/controles-videojuegos.jpg";
    return (
      <div
        className={style.div}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div key={detail.id} className={style.container}>
          <Link to="/home">
            <button className={style.button}>Home</button>
          </Link>
          <p>
            <b>ID: </b>
            {detail.id}
          </p>
          <p>
            <b>Nombre: </b>
            {detail.name}
          </p>
          <p>
            <b>Imagen: </b>
            <br />
            <br />
            {detail.background_image ? (
              <img
                src={detail.background_image}
                alt="Background"
                className={style.img}
              />
            ) : (
              "No disponible"
            )}
          </p>
          <p>
            <b>Plataformas: </b>
            {Array.isArray(detail.platforms)
              ? detail.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")
              : detail.platforms}
          </p>
          <p>
            <b>Descripción: </b>
            {detail.description}
          </p>
          <p>
            <b>Fecha de Lanzamiento: </b>
            {detail.released}
          </p>
          <p>
            <b>Rating: </b>
            {detail.rating}
          </p>
          <p>
            <b>Géneros: </b>
            {Array.isArray(detail.genres)
              ? detail.genres.map((genre) => genre.name).join(", ")
              : detail.genres}
          </p>
        </div>
      </div>
    );
  }
}

export default Detail;
