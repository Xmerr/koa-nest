import pgp from 'pg-promise';
import dotenv from 'dotenv';
import humps from 'humps';
dotenv.config();

const camelizeColumnNames = (data:any) => {
  var names = Object.keys(data[0]);

  var camels = names.map(n=> {
      return humps.camelize(n);
  });

  data.forEach((d:any) => {
      names.forEach((n, i)=> {
          var c = camels[i];
          if (!(c in d)) {
              d[c] = d[n];
              delete d[n];
          }
      });
  });
}

export const db = pgp({
  receive: camelizeColumnNames
})({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_URL || 'localhost',
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  user: process.env.DATABASE_USER,
});

export default db;