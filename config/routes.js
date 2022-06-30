const express = require("express");
const controllers = require("../app/controllers");
const YAML = require('yamljs');


const appRouter = express.Router();
const apiRouter = express.Router();

const swaggerUI=require("swagger-ui-express");
// const swaggerDocument=YAML.load("../docs/swagger.yaml");
const swaggerDocument=require("../docs/swagger.json");

const {
  ApplicationController,
  AuthenticationController,
  CategoryController,
  // ProductController,
  // OrderController,
 } = require("../app/controllers/api/v1");

 const authenticationController = new AuthenticationController();
 const categoryController = new CategoryController();
//  const productController = new ProductController();
//  const orderController = new OrderController();


appRouter.post("/api/v1/auth/register", authenticationController.handleRegister);
appRouter.post("/api/v1/auth/login", authenticationController.handleLogin);
appRouter.put("/api/v1/auth/update/:id", authenticationController.handleUpdate);
// appRouter.get("/api/v1/auth/whoami", authenticationController.handleGetCurrentUser);

appRouter.post("/api/v1/category/add", categoryController.handleAdd);
appRouter.put("/api/v1/category/update/:id", categoryController.handleUpdate);
appRouter.get("/api/v1/category/list", categoryController.handleList);
appRouter.get("/api/v1/category/getById/:id", categoryController.handleGetById);
appRouter.get("/api/v1/category/delete/:id", categoryController.handleDelete);


/** Mount GET / handler */
// appRouter.get("/", controllers.main.index);
// appRouter.post("/api/v1/auth/login", authenticationController.handleLogin);
// appRouter.get("/api/v1/auth/logout", authenticationController.handleLogout);
// appRouter.get("api/v1/seller/product/all", authenticationController.handleAuthorize(), ProductController.handleGetAll());


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

appRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
appRouter.get("/docs", (req, res) => res.send(swaggerDocument));

appRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;