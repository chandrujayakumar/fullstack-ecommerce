const { pool } = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendMail")
const validator = require("validator")
const errorHandler = require("../utils/errorHandler")
const { sendToken } = require("../utils/jwtToken")

//generate uuid

const generate_uuid = () => {
  return uuidv4();
};

//generate random 6 digit otp

const generate_otp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

//validate fullname

const validateFullname = (fullname) => {
    // Fullname should only contain letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(fullname);
};


//send otp to target mail

exports.sendOTP = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body

    if(!validator.isEmail(email)){
        return next(new errorHandler("Invalid Email", 400))
    }

    const OTP = generate_otp()
    const subject = "Login/Signup OTP"
    const message = `Your OTP is ${OTP}`
    const [existingOTP] = await pool.execute('SELECT otp from userotps WHERE email = ?', [email])


    if(existingOTP.length > 0){
        await pool.execute("UPDATE userotps SET otp = ? WHERE email = ?" ,[OTP, email])
    }else{
        const uuid = generate_uuid()
        if(email){
            await pool.execute("INSERT INTO userotps VALUES(?, ?, ?)", [uuid, email, OTP])
        }
    }

    try{
        sendEmail({
            email,
            subject,
            message
        })

        res.status(200).json({
            success: true,
            message: `OTP sent to ${email}.`
        })
    }catch(err){
        return next(new errorHandler(err.message, 500))
    }
});


// login/signup using only email

exports.loginsignup = catchAsyncErrors(async(req, res, next) => {
    const { email, otp } = req.body

    if(!otp){
        return next(new errorHandler("Enter the OTP", 400))
    }

    const [db_otp] = await pool.execute('SELECT otp FROM userotps WHERE email = ?', [email])

    if(otp === db_otp[0].otp){
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
        
        if(existingUser.length > 0 && existingUser[0].fullname !== null){
            sendToken(existingUser, 201, res)
        }else if(existingUser.length === 0){
            const uuid = generate_uuid()
            await pool.execute('INSERT INTO users (id, email) VALUES(?, ?)', [uuid, email])

            const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])

            res.status(201).json({
                success: true,
                message: "user created without fullname",
                user
            })
        }else{
            res.status(200).json({
                success: true,
                message: "user exists without fullname",
                existingUser
            })
        }
    }else{
        return next(new errorHandler("Invalid OTP", 400))
    }
})

//get user's full name if he/she is a new user

exports.signupNewUser = catchAsyncErrors(async(req, res, next) => {
    const { email, fullname } = req.body
    
    if(!fullname){
        return next(new errorHandler("Enter fullname", 400))
    }

    const trimmedFullname = fullname.trim()
    const validation = validateFullname(trimmedFullname)

    try{
        if(validation){
            await pool.execute('UPDATE users SET fullname = ? WHERE email = ?', [trimmedFullname, email])
            
            const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    
            sendToken(user, 201, res)
        }else{
            return next(new errorHandler("Invalid Fullname", 400))
        }
    }catch(err){
        return next(new errorHandler("Something Went Wrong. Try Again.", 400))
    }

})


//logout

exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie("AUTHCOOKIE", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

//get user details (dashboard)

exports.getuserdetails = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.user[0][0]

    try{
        const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])

        if(user.length > 0){
            res.status(200).json({
                success: true,
                user
            })
        }else{
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    }catch(err){
        return next(new errorHandler(`Something Went Wrong\n${err}`, 500))
    }
})




//update user 

exports.updateUser = catchAsyncErrors(async(req, res, next) => {

})