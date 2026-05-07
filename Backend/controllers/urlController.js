import Url from "../models/urlModel.js";
import response from "../utils/responseHandler.js";
import generateCode from "../utils/generateCode.js";

const createUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    const shortCode = await generateCode();
    const url = await Url.create({ longUrl, shortCode, userId: req.user._id });
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    return response(res, 201,true, "URL created successfully", { url, shortUrl });
  } catch (error) {
    next(error);
  }
};

export { createUrl };