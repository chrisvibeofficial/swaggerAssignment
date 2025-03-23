require('dotenv').config();
require('./config/database')
const express = require('express');
const PORT = process.env.PORT || 3412;
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');


app.use(express.json());
app.use(cors());
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);


const swaggerJsdoc = require("swagger-jsdoc");
const swagger_UI = require("swagger-ui-express")

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BASE_URL: https://swaggerassignment.onrender.com',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
           bearerFormat: "JWT"
        }
      }
    }, 
    security: [{ BearerAuth: [] }]
  },
  apis: ["./routes/*.js"] // Ensure this points to the correct path
};


const openapiSpecification = swaggerJsdoc(options);
app.use("/documentation", swagger_UI.serve, swagger_UI.setup(openapiSpecification))




app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`)
});