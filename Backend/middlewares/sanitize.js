const sanitizeValue = (value) => {

  if (typeof value !== "string") return value;

  // remove leading and trailing spaces
  let clean = value.trim();

  // remove any HTML tags like <script>, <img>, <div> etc.
  clean = clean.replace(/<[^>]*>/g, "");

  return clean;

};

// this sanitizeBody loops over every field in req.body and cleans it
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      req.body[key] = sanitizeValue(req.body[key]);
    }
  }
  next();
};

module.exports = sanitizeBody;