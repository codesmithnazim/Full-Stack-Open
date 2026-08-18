const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

// module.exports = { info, error }
export default { info, error };
// export default logger
