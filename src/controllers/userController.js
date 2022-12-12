import userService from "../services/userService"
import usersAdmin from "./../services/CRUDService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        })
    }

    let userData = await userService.handelUserLogin(email, password)


    return res.status(200).json({

        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id // lấy all users hoặc single user
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            users: [],
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users,
    })
}
const getAllUser = async (req, res) => {
    const users = await usersAdmin.getAllUser()
    return res.json({ users })
}
const createUser = async (req, res) => {
    const result = await usersAdmin.createNewUser(req.body)
    return res.json(result)
}
const getUserById = async (req, res) => {
    const result = await usersAdmin.getUserInfoById(req.params?.id)
    return res.json(result)
}
const deleteUser = async (req, res) => {
    const result = await usersAdmin.deleteUserById(req.params?.id)
    return res.json(result)
}
const updateUser = async (req, res) => {
    const result = await usersAdmin.updateUserData(req.body)
    return res.json(result)
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers.apply,
    // Export function getAllUser ra
    getAllUser: getAllUser,
    createUser: createUser,
    getUserById: getUserById,
    deleteUser: deleteUser,
    updateUser: updateUser
}