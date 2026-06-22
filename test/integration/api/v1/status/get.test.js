test("GET to api/v1/status should be 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  const postgresVersion = responseBody.dependencies.database.postgres_version;
  expect(postgresVersion).toBeDefined();
  expect(postgresVersion).toBe("16.14");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toBeDefined();
  expect(typeof maxConnections).toBe("number");

  const activeConnections =
    responseBody.dependencies.database.active_connections;
  expect(activeConnections).toBeDefined();
  console.log(activeConnections);
  expect(typeof activeConnections).toBe("number");
  expect(activeConnections).toBe(1);
});

test.skip("SQL Injection test (desativado pois não vamos enviar parametros na requisição.)", async () => {
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName=local_database",
  );
  await fetch("http://localhost:3000/api/v1/status?databaseName=';");
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
  );
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName=local_database",
  );
});
