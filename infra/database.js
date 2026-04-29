import { Client } from "pg";

async function query(objectQuerry) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  client.connect();
  const result = await client.query(objectQuerry);
  await client.end;
  return result;
}

export default {
  query: query,
};
