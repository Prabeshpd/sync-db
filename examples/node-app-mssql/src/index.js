const _db = require('@leapfrogtechnology/sync-db/lib/util/db');
const _config = require('@leapfrogtechnology/sync-db/lib/config');

(async () => {
  try {
    // Getting db connection
    const db = await getDbConnection();

    // Demonstrations of functions, procedures and views that were generated using sync-db

    // view/vw_table_names
    const tables = await db.raw('SELECT * FROM utils.vw_table_names');

    process.stdout.write('List of table names in the database\n');
    tables.map((table) => process.stdout.write(table.name));

    // view/vw_user_names
    const users = await db.raw('SELECT * FROM utils.vw_user_names');

    process.stdout.write('List of user names in the database\n');
    users.map((user) => process.stdout.write(user.name + '\n'));

    // function/calc_multipy
    const a = 6,
      b = 7;

    const multiply = await db.raw('SELECT utils.calc_multiply(' + a + ', ' + b + ') AS result;');

    process.stdout.write(a + ' X ' + b + ' = ' + multiply[0].result + ' \n');

    // procedure/print_date
    const date = await db.raw('EXEC utils.get_date;');

    process.stdout.write(date[0].result + '\n');

    process.exit(0);
  } catch (err) {
    process.stdout.write(err);
    process.exit(-1);
  }
})();

/**
 * Returns instance of database connection
 * by extracting the first db configuration from a file.
 *
 */
async function getDbConnection() {
  // Extracts list of database connections from a json file
  const connections = await _config.resolveConnections();

  // Creates db instance first connection
  const db = await _db.createInstance(connections[0]);

  return db;
}
