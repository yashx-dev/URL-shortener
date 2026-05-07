import Url from "../models/URL.js";

const generateCode = async () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let number = 0; number < 8; number++) {
    const index = Math.floor(Math.random() * chars.length);
    code += chars[index];
  }
  const existing = await Url.findOne({ shortCode: code });
  if (existing) {
    return generateCode();
  }
  return code;
};

export default generateCode