import { Client } from "pg";

export function getPostgresConnection() {
    const db = new Client({
        host: "localhost",
        user: "pg-dev-user",
        port: 5432,
        password: "pg-dev-password",
        database: "pg-dev-database"
    })

    db.connect()
        .then(() => console.log("Postgres connected"))
        .catch((err) => console.error("Error connecting to Postgres", err.stack))
    return db
}
