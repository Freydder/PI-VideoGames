import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../redux/action";
import NavBar from "../../Components/NavBar/NavBar";
import style from "./Form.module.css";
import {
  validateName,
  validateDescription,
  validateReleased,
  validateRating,
} from "./validation";

const Form = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "released") {
      const [year, month, day] = value.split("-");
      formattedValue = `${year}-${month}-${day}`;
    }
    setFormData({ ...formData, [name]: formattedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await dispatch(createGame(formData));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: validateName(formData.name),
      description: validateDescription(formData.description),
      released: validateReleased(formData.released),
      rating: validateRating(formData.rating),
    };

    Object.values(newErrors).forEach((error) => {
      if (error !== "") {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} className={style.div}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <span>{errors.name}</span>
        <br />
        <label>Image:</label>
        <br />
        <input
          type="text"
          name="background_image"
          value={formData.background_image}
          onChange={handleChange}
          required
        />
        <br />
        <label>Platforms:</label>
        <br />
        <input
          type="text"
          name="platforms"
          value={formData.platforms}
          onChange={handleChange}
          required
        />
        <br />
        <label>Description:</label>
        <br />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <span>{errors.description}</span>
        <br />
        <label>Fecha de Lanzamiento:</label>
        <br />
        <input
          type="date"
          name="released"
          value={formData.released}
          onChange={handleChange}
          required
        />
        <span>{errors.released}</span>
        <br />
        <label>Rating:</label>
        <br />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <span>{errors.rating}</span>
        <br />
        <label>Genres:</label>
        <br />
        <input
          type="text"
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Crear Juego</button>
      </form>
    </div>
  );
};

export default Form;
