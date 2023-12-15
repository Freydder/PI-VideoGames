import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  const backgroundImageUrl =
    "https://media.gcflearnfree.org/content/5ccc48c7e5c6c4116cbd9df7_05_03_2019/consolasjuegos-01_xl.png";

  return (
    <div
      className={style.landing}
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
      <h1>Videogames</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Landing;
