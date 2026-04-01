const sanitizeValue = (value) => {
  if (typeof value !== "string") return value;      // removes numbers or booleans
  let clean = value.trim();                 // remove leading and trailing spaces
  clean = clean.replace(/<[^>]*>/g, "");    // remove any HTML tags like <script>, <img>, <div> etc.
  return clean;

};

// this sanitizeBody loops over every field in req.body and cleans it
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      req.body[key] = sanitizeValue(req.body[key]);         // clean every field
    }
  }
  next();      // pass to next middleware
};

module.exports = sanitizeBody;
