function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    let bundleErr = [];
    for (const key in err.errors) {
      bundleErr.push(err.errors[key].message);
    }
    res.status(400).json({
      code: 400,
      message: bundleErr,
    })
  } else {
    res.status(500).json({
      code: 500,
      message: 'Internal server error :(',
      dev_message: JSON.stringify(err, null, 2),
    })
  }
  console.log(err);
}

module.exports = errorHandler;