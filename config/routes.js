const express = require("express");
const { ProductBuyerController } = require("../app/controllers/api/v1");
const controllers = require("../app/controllers")
const YAML = require('yamljs');

const appRouter = express.Router();
const apiRouter = express.Router();

const swaggerUI=require("swagger-ui-express");
// const swaggerDocument=YAML.load("../docs/swagger.yaml");
const swaggerDocument=require("../docs/swagger.json");

const productBuyer = new ProductBuyerController();
/** Mount GET / handler */
// appRouter.get("/", controllers.main.index);
// appRouter.post("/api/v1/auth/login", authenticationController.handleLogin);
// appRouter.get("/api/v1/auth/logout", authenticationController.handleLogout);
// appRouter.get("api/v1/seller/product/all", authenticationController.handleAuthorize(), ProductController.handleGetAll());

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
apiRouter.get(
  '/api/v1/product/all', productBuyer.handleGetAll
);
apiRouter.get(
  '/api/v1/buyer/product/:id', productBuyer.handleGetById
)
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