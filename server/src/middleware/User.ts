import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Access token not found");
  }
  try {
    const decode: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    );

    req.userID = decode.userID; // userID để truyền vào các thằng kia để tìm userID để render ra đúng thằng
    // sigin ở phía client
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Token");
  }
};
export default verifyToken;
