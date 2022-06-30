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
  // CategoryController,
  // ProductController,
  // OrderController,
 } = require("../app/controllers/api/v1");

 const authenticationController = new AuthenticationController();
//  const categoryController = new CategoryController();
//  const productController = new ProductController();
//  const orderController = new OrderController();


appRouter.post("/api/v1/auth/register", authenticationController.handleRegister);


/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
// apiRouter.get("/api/v1/posts", controllers.api.v1.post.list);
// apiRouter.post("/api/v1/posts", controllers.api.v1.post.create);
// apiRouter.put(
//   "/api/v1/posts/:id",
//   controllers.api.v1.post.setPost,
//   controllers.api.v1.post.update
// );
// apiRouter.get(
//   "/api/v1/posts/:id",
//   controllers.api.v1.post.setPost,
//   controllers.api.v1.post.show
// );
// apiRouter.delete(
//   "/api/v1/posts/:id",
//   controllers.api.v1.post.setPost,
//   controllers.api.v1.post.destroy
// );

// apiRouter.get("/api/v1/errors", () => {
//   throw new Error(
//     "The Industrial Revolution and its consequences have been a disaster for the human race."
//   );
// });


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

appRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
appRouter.get("/docs", (req, res) => res.send(swaggerDocument));

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
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