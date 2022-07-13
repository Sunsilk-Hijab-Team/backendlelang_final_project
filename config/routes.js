const express = require("express");
const controllers = require("../app/controllers")
const YAML = require('yamljs');

const appRouter = express.Router();
const apiRouter = express.Router();

const swaggerUI=require("swagger-ui-express");
// const swaggerDocument=YAML.load("../docs/swagger.yaml");
const swaggerDocument=require("../docs/swagger.json");

const authorization = require("../app/middlewares/authorization");

const uploadFiles = require("../app/middlewares/multerUpload");

const { runValidation,
        checkName,
        checkEmail,
        checkPassword,
        checkCity,
        checkAddress,
        checkCategory,
        checkProductName,
        checkDescription,
        checkPrice,
        checkSearch,
        checkSlug
      } = require('../app/middlewares/validation');

const {
  AuthenticationController,
  CategoryController,
  ProductController,
  OrderController,
  NotificationController,
  ProductBuyerController,
  OrderBuyerController,
 } = require("../app/controllers/api/v1");

 const authenticationController = new AuthenticationController();
 const categoryController = new CategoryController();
 const productController = new ProductController();
 const orderController = new OrderController();
 const notificationController = new NotificationController();
 const productBuyerController = new ProductBuyerController();
 const orderBuyerController = new OrderBuyerController();

appRouter.post("/api/v1/auth/register", checkName, checkEmail, checkPassword, runValidation, authenticationController.handleRegister);
appRouter.post("/api/v1/auth/login",  checkEmail, checkPassword, runValidation, authenticationController.handleLogin);
appRouter.put("/api/v1/auth/update", authorization.checkToken, uploadFiles.single("image_url"), authenticationController.handleUpdate);
appRouter.get("/api/v1/auth/user/whoami", authorization.checkToken, authenticationController.handleGetCurrentUser);
// appRouter.get("/api/v1/auth/user/logout", authorization.checkToken, authenticationController.handleLogout);

appRouter.post("/api/v1/seller/category/add", authorization.checkToken, categoryController.handleAdd);
appRouter.put("/api/v1/seller/category/update/:id", checkCategory, runValidation, authorization.checkToken, categoryController.handleUpdate);
appRouter.delete("/api/v1/seller/category/delete/:id", authorization.checkToken, categoryController.handleDelete);
appRouter.get("/api/v1/seller/category/all", authorization.checkToken, categoryController.handleList);
appRouter.get("/api/v1/seller/category/getById/:id", authorization.checkToken, categoryController.handleGetById);

appRouter.post("/api/v1/seller/product/add",  authorization.checkToken, uploadFiles.array("image_url"), productController.handleAdd);
appRouter.get("/api/v1/seller/product/all", authorization.checkToken, productController.handleGetAll);
appRouter.delete("/api/v1/seller/product/delete/:id", authorization.checkToken, productController.handleDelete);
appRouter.put("/api/v1/seller/product/update/:id", authorization.checkToken, productController.handleUpdate);
appRouter.get("/api/v1/seller/product/:id", authorization.checkToken, productController.hadleGetById);
appRouter.put("/api/v1/seller/status/:id", authorization.checkToken, productController.handleUpdateStatus);
appRouter.get("/api/v1/seller/productSell", authorization.checkToken, productController.handleGetStatusSell);
appRouter.get("/api/v1/seller/productByCategory", checkSlug, runValidation, authorization.checkToken, productController.handleGetByCategory);

appRouter.get("/api/v1/product/search", checkSearch, runValidation, productController.handleSearch);

appRouter.get("/api/v1/seller/order/all", authorization.checkToken, orderController.handleGetAllOrder);
appRouter.get("/api/v1/seller/order/:id", authorization.checkToken, orderController.handleOrderByid);
appRouter.put("/api/v1/seller/order/update/:id", authorization.checkToken, orderController.handleUpdateStatusOrder);

appRouter.get("/api/v1/notification/all", authorization.checkToken, notificationController.handleGetAllNotification);
appRouter.get("/api/v1/notification/:id", authorization.checkToken, notificationController.handleGetNotificationById);
appRouter.put("/api/v1/notification/:id", authorization.checkToken, notificationController.handleUpdateNotificationReadStatus);

appRouter.get("/api/v1/product/search", productController.handleSearch);
apiRouter.get('/api/v1/product/all', productBuyerController.handleGetAll);

apiRouter.get('/api/v1/buyer/product/:id', productBuyerController.handleGetById)
apiRouter.post('/api/v1/buyer/order/buy', authorization.checkToken, orderBuyerController.handleAddOrder)
apiRouter.put('/api/v1/buyer/order/price-appeal/:id', authorization.checkToken, orderBuyerController.handleUpdateOrder)
apiRouter.get('/api/v1/buyer/order/all', authorization.checkToken, orderBuyerController.handleGetAll)
apiRouter.get('/api/v1/buyer/order/product/:id', authorization.checkToken, orderBuyerController.handleGetById)

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