import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Adoptame API",
      version: "1.0.0",
      description: "Adoptame API",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

export const specs = swaggerJSDoc(swaggerOptions);