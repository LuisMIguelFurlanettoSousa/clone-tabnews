import { Client } from "pg";

async function query(objectQuerry) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslValues(),
  });

  console.log("Credencias do postgres:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    client.connect();
    const result = await client.query(objectQuerry);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    // se der o erro e ele ser lançado, oque aconteceria aqui no finally ?
    await client.end();
  }
}

function getSslValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV !== "development";
}

export default {
  query: query,
};
