import bcrypt from "bcrypt";

// generate hashpassword
export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 10);
};
