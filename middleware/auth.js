import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    console.log('token', token)
    if (!token) {
        return res.json({
            success: false,
            message: "Unauthorized access, token not provided",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid or expired token" });
    }
};
