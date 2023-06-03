export const handleErrors = (code) => {

  if(!code){
    return{
      status: 500,
      message: "Error del servidor, codigo desconocido"
    }
  };

  switch (code) {
    case "22P02":
      return {
        status: 400,
        message: "Formato no válido",
      };
    case "400":
      return {
        status: 404,
        message: "Campos Incompletos",
      };
    case "404":
      return {
        status: 404,
        message: "El registro no existe",
      };
    default:
      return {
        status: 500,
        message: "Error del servidor",
      };
  }
};
