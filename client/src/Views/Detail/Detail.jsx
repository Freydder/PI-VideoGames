// import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { filterByDetail } from "../../redux/action";

// function Detail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const detail = useSelector((state) => state.detail);

//   useEffect(() => {
//     dispatch(filterByDetail(id));
//   }, [dispatch, id]);

//   if (!detail) {
//     return (
//       <div>
//         <div>Cargando...</div>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <Link to="/home">
//           <button>Home</button>
//         </Link>
//         <div>
//           <p>
//             <b>ID: </b>
//             {detail.id}
//           </p>
//           <p>
//             <b>Nombre: </b>
//             {detail.name}
//           </p>
//           <p>
//             <b>Imagen: </b>
//             <img src={detail.background_image} alt="Background" />
//           </p>
//           <p>
//             <b>Plataformas: </b>
//             {detail.platforms
//               .map((platform) => platform.platform.name)
//               .join(", ")}
//           </p>
//           <p>
//             <b>Descripción: </b>
//             {detail.description}
//           </p>
//           <p>
//             <b>Fecha de Lanzamiento: </b>
//             {detail.released}
//           </p>
//           <p>
//             <b>Rating: </b>
//             {detail.rating}
//           </p>
//           <p>
//             <b>Géneros: </b>
//             {detail.genres.map((genre) => genre.name).join(", ")}
//           </p>
//         </div>
//       </div>
//     );
//   }
// }

// export default Detail;

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterByDetail } from "../../redux/action";

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
    return (
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <div>
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
            {detail.background_image ? (
              <img src={detail.background_image} alt="Background" />
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
