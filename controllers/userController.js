import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, mesage: "User Already Exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save()

        const token = generateToken(user._id);
        res.json({
            success: true, message: 'user created successfully', token
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY , { expiresIn: "1h" });
}


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        const token = generateToken(user._id);
        res.json({
            success: true, token
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}