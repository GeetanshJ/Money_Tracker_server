import express from "express";
import { status } from "../../utils/status_code.js";
import { model_list } from "../../models/model_list.js";
import bcrypt, { hash } from "bcrypt";
import validator from "validator"
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/signup_submit", (req, res) => {
    const { signup_name, signup_email, signup_password } = req.body;
    if (!validator.isEmail(signup_email)) {
        return res.status(status.BAD_REQUEST).json({ message: "Email is invalid!!!" });
    }

    if (!validator.isStrongPassword(signup_password, {
        minLowercase: 1,
        minLength: 6,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })) {
        return res.status(status.BAD_REQUEST).json({ message: "Password is invalid!!!" });
    }

    const saltRounds = 8;

    (async () => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPass = await bcrypt.hash(signup_password, salt);
        const [user, created] = await model_list.user.findOrCreate({
            where: {
                email: signup_email
            },

            defaults: {
                name: signup_name, email: signup_email, password: hashPass
            }
        })

        return !created ? res.status(status.BAD_REQUEST).json({ message: "User Already present!!" }) : res.status(status.SUCCESS).json({ message: "User Created" });
    })();
})


router.post("/login_submit", (req, res) => {
    const { login_email, login_password } = req.body;
    if (!validator.isEmail(login_email)) {
        return res.status(status.BAD_REQUEST).json({ message: "Email format is invalid!!!" });
    }

    if (!validator.isStrongPassword(login_password, {
        minLowercase: 1,
        minLength: 6,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })) {
        return res.status(status.BAD_REQUEST).json({ message: "Password format is invalid!!!" });
    }


    (async () => {
        const user = await model_list.user.findOne({
            where: { email: login_email },
        });

        if (!user) {
            return res.status(status.BAD_REQUEST).json({ message: "User not found!!" });
        }

        const isPasswordMatch = await bcrypt.compare(login_password, user.password);

        if (isPasswordMatch) {
            const token = jwt.sign({ login_email }, process.env.SECRETKEY, { expiresIn: "1h" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "strict",
                maxAge: 60 * 60 * 1000 
            });

            return res.status(status.SUCCESS).json({ message: "User Logged" });
        } else {
            return res.status(status.BAD_REQUEST).json({ message: "Password did not match!!" });
        }
    })();

})

router.post("/check", (req, res) => {
    console.log(req?.cookies?.token);
    
    // const token = req.cookies.token;
    // if (!token) return res.json({ authenticated: false });

    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) return res.json({ authenticated: false });
    //     res.json({ authenticated: true, user: decoded });
    // });
});

export default router;