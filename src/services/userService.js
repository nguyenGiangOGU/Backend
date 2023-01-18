import db from '../models/index';
import bcrypt from 'bcryptjs';

let handelUserLogin = (email,password)  =>{
    return new Promise(async(resolve,reject)=> {
        try {
            let userData = {};

            let isExist =  await checkUserEmail(email);
            if (isExist){
                //user da ton tai => kiem tra password

                let user = await db.User.findOne({
                    where : {email: email},
                    attributes : ['email', 'roleId', 'password'],
                    raw : true,
                });
                if (user) {
                    // kiem tra password (thu vien da lam cho roi)
                    let check = bcrypt.compareSync(password, user.password); // false
                    if (check){
                        userData.errCode = 0 ;
                        userData.errMessage ='ok',
                        delete user.password ;
                        userData.user = user;

                    }else{
                        userData.errCode = 3 ;
                        userData.errMessage ='Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage ='user is not found';
                    
                }
                
            }else{
                //return error
                userData.errCode = 1;
                userData.errMessage ='your user email is not exits in your sytem '
                
            }
            resolve(userData)

        } catch (e) {
            reject(e);
        }
    })

}


let checkUserEmail = (userEmail) => {
    // hàm được thực thi tự động khi new promise được tạo ra
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({ 
                where : {email: userEmail}
            })
            if (user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
// lấy ra Allusers
let getAllUsers = (userId) => { 
    return new Promise(async(resolve, reject) => {
        try {
            let users ='';
            if (userId === 'All'){
                users = await db.User.findAll({
                    // thuoc tinh
                    attributes : {
                        exclude : ['password'] // Loại trừ password 
                                               // và password sẽ k hiện ra ở bên postman
                    }
                })
            }
            if(userId && userId!== 'All'){
                users = await db.User.findOne({
                    where  : {
                        id : userId, // userId truyền vào phải bằng với cột id trong db
                    }
                })
            }
            resolve(users)


        } catch (e) {
            reject(e)  // bắt exception
        }
    })
}

let getAllCodeService = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let res = {};
            let allcode = await db.Allcode.findAll();
            res.errCode=0;
            res.data= allcode;
            resolve(data);
        } catch (e) {
            reject(e) 
        }
    })
}
module.exports = {
    handelUserLogin : handelUserLogin,
    getAllUsers : getAllUsers,
    getAllCodeService: getAllCodeService
}