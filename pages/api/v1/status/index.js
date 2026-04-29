import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as rows;");
  console.log(result.rows);
  res.status(200).json({
    chave: "teste de api",
  });
}

export default status;
