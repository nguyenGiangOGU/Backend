import bcrypt from 'bcryptjs'; //hash password
import db from '../models/index' ;//db

const salt = bcrypt.genSaltSync(10);

let createNewUser =async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await  hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ?true : false,
                roleId: data.roleId,
            })

            resolve('ok create a new user successed!');


        } catch (e) {
            reject(e)
            
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
            
        } catch (e) {
            reject(e)
        }
        
})
}

let getAllUser = () => {
    return new Promise(async(resolve, reject)=> {
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
    return new  Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id : userId},
                raw : true,
            })
            if (user){
                resolve(user)
            }else{
                resolve({})
            }

        } catch (e) {
            reject(e);
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id : data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    })
}

let deleteUserById = (userId) => { 
    return new Promise( async(resolve, reject)=> {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                // x <- y
            })
        

            if (user) {
                await user.destroy();
            }
            resolve(); // return ma k tra ra kq gi
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