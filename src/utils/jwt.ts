import jwt, { Secret, SignOptions } from "jsonwebtoken";

// Define the types for environment variables
const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_ACCESS_TOKEN_EXPIRE: string = process.env
  .JWT_ACCESS_TOKEN_EXPIRE as string;
const JWT_REFRESH_TOKEN_EXPIRE: string = process.env
  .JWT_REFRESH_TOKEN_EXPIRE as string;

// Define the payload interface for the token data
interface TokenData {
  [key: string]: any;
}

// Function to create an access token
const createAccessToken = (data: TokenData = {}): string => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
  });
};

// Function to create a refresh token
const createRefreshToken = (data: TokenData = {}): string => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
  });
};

// Function to verify a token
const verifyToken = (token: string): TokenData | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenData;
  } catch (error) {
    return null;
  }
};

export { createAccessToken, createRefreshToken, verifyToken };
