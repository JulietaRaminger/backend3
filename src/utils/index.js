import bcryptjs from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const createHash = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

export const passwordValidation = async (user, password) =>
  bcryptjs.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;