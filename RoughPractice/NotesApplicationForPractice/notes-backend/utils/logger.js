const info = (...params) => {
  if (process.env.NODE_ENV !== "TEST") console.log(...params);
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "TEST") console.error(...params);
};

// module.exports = { info, error }
export default { info, error };
// export default logger
