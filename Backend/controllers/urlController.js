import Url from "../models/URL.js";
import response from "../utils/responseHandler.js";
import generateCode from "../utils/generateCode.js";

const createUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    const shortCode = await generateCode();
    const url = await Url.create({ longUrl, shortCode, userId: req.user._id });
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    return response(res, 201, true, "URL created successfully", {
      url,
      shortUrl,
    });
  } catch (error) {
    next(error);
  }
};

const getUrls = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allUrl = await Url.find({ userId }).sort({ createdAt: -1 });
    if (!allUrl.length) {
      return response(res, 200, true, "No URLs found");
    }
    return response(res, 200, true, "URLs fetched successfully", { allUrl });
  } catch (error) {
    next(error);
  }
};

const redirect = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } },
    );
    if (!url) {
      return response(res, 404, false, "Url not found");
    }
    res.redirect(url.longUrl);
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const shortCode = req.params.shortCode;
    const removeUrl = await Url.findOneAndDelete({ userId, shortCode });
    if (!removeUrl) {
      return response(res, 404, false, "Url not found or already deleted");
    }
    return response(res, 200, true, "Url deleted successfully");
  } catch (error) {
    next(error);
  }
};
export { createUrl, getUrls, redirect, deleteUrl };
