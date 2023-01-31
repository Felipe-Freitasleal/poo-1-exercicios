import knex from "knex";

///////   ATIVIDADE DIA 1
// export const db = knex({
//     client: "sqlite3",
//     connection: {
//         filename: "./src/database/poo-1-exercicios.db",
//     },
//     useNullAsDefault: true,
//     pool: {
//         min: 0,
//         max: 1,
//         afterCreate: (conn: any, cb: any) => {
//             conn.run("PRAGMA foreign_keys = ON", cb)
//         }
//     }
// })

///// ATIVIDADE DIA 2
export abstract class BaseDatabase {
  //atributos
  //metodos
  protected static connection = knex({
    client: "sqlite3",
    connection: {
      filename: "./src/database/poo-1-exercicios.db",
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}
