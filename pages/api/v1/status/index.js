import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const postgresVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;

  const maxConnections = Number(
    (await database.query("SHOW max_connections;")).rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const activeConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        max_connections: maxConnections,
        active_connections: activeConnections.rows[0].count,
      },
    },
  });
}

export default status;
