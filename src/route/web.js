import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.post('/api/get-all-users', userController.handleGetAllUsers);


    // Lấy tất cả users
    router.get('/users', userController.getAllUser)
    // Lất 1 user tùy ý
    router.get('/user/:id', userController.getUserById)
    // Tạo 1 user
    router.post('/user', userController.createUser)
    // Xóa 1 user 
    router.delete('/user/:id', userController.deleteUser)
    // Update 1 user
    router.put('/user', userController.updateUser)
    return app.use("/", router);


}

module.exports = initWebRoutes;