import bcrypt from "bcrypt";

// hashing plain text password using bcrypt
export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 10);
};
