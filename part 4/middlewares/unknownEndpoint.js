const unknownEndpoints = (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
};

export default unknownEndpoints
