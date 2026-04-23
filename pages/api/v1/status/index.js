function status(req, res) {
  res.status(200).json({
    chave: "teste de api",
  });
}

export default status;
