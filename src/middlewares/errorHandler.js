export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
  
    console.error({
      message: error.message,
      stack: error.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query
    });
  
    res.status(status).json({
      status: 'error',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) 
    });
  };
  