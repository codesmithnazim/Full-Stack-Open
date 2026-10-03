const info = (...info) => {
  if (process.env.NODE_ENV !== "TEST") console.log(...info);
};

const error = (...error) => {
  if (process.env.NODE_ENV !== "TEST") console.error(...error);
};

export default { info, error };
