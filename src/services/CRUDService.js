import bcrypt from 'bcryptjs'; //hash password
import db from '../models/index';//db

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('ok create a new user successed!');
        } catch (e) {
            reject(e)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)

        } catch (e) {
            reject(e)
        }

    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
                //raw ở đây là dữ liệu gốc
            });
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })

}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }

        } catch (e) {
            reject(e);
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                const user = await db.User.update(data, {
                    where: {
                        id: data?.id
                    }
                })
                resolve(user);
            } else {
                resolve('User not found, can not update !');
            }

        } catch (e) {
            console.log(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                // x <- y
            })
            console.log(user);
            if (user) {
                await db.User.destroy({
                    where: {
                        id: userId
                    }
                });
            }
            else {

                resolve('User not found, can not delete !');
            }
            resolve('delete user success');
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}