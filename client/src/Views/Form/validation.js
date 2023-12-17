export function validateName(name) {
  if (name.length < 4 || name.length > 50) {
    return "El nombre debe tener entre 4 y 50 caracteres";
  }
  return "";
}

export function validateDescription(description) {
  if (description.length > 50) {
    return "La descripción no puede tener más de 50 caracteres";
  }
  return "";
}

export function validateReleased(released) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Cambiado el regex para el nuevo formato
  if (!dateRegex.test(released)) {
    return "Ingrese la fecha de lanzamiento en el formato yyyy-MM-dd"; // Mensaje ajustado
  }
  return "";
}

export function validateRating(rating) {
  const parsedRating = parseFloat(rating);
  if (isNaN(parsedRating) || parsedRating < 0.1 || parsedRating > 5.0) {
    return "El rating debe ser un número entre 0.1 y 5.0";
  }
  return "";
}
