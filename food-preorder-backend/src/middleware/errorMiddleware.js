export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A resource with the same unique value already exists"
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: Object.values(err.errors).map((e) => e.message)
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};
