// esta funcion obtiene la fecha para mostrarla en el formato correcto
export const date = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-ES", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
  });
};

// esta funcion obtiene la hora para mostrarla en el formato correcto
export const hour = (hour: string) => {
  const hourObject = new Date(hour);
  return hourObject.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    hourCycle: "h12",
    minute: "2-digit",
  });
};
