import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 5,
    message: "Too many login attempts, please try again later.",
});
