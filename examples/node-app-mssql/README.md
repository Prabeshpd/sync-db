# Node MSSQL Example (JavaScript)

Sample project for Microsoft SQL Server.

## Running

Install dependencies.

```bash
$ yarn
```

Configure database connection(s).

```bash
$ cp connections.sync-db.json.example connections.sync-db.json
```

Edit your `connections.sync-db.json` with the db creds.

Synchronize all database objects (views, functions, procedures, schemas, etc)

```
$ yarn sync
```

Run the node application.

```
$ yarn start
```

**Output**

```
List of table names in the database.
[ 'table1',
  'table2',
  'table3' ]
List of user names in the database.
[ 'user1',
  'user2',
  'user3' ]
Calculations: 
 { 'Sum of 6 and 7 is': 13,
  'Product of 6 and 7 is': 42,
  'Square of 6 is': 36 }
Current date time is  2019-08-02T08:50:59.430Z
```
