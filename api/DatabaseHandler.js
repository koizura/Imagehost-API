const sqlite3 = require("sqlite3").verbose();

class DatabaseHandler {
  static dest = "./db/uploads.db";
  static init() {
    this.db = new sqlite3.Database(this.dest, sqlite3.OPEN_READWRITE, (err) => {
      if (err && err.code == "SQLITE_CANTOPEN") {
        this.createDatabase();
        return;
      } else if (err) {
        console.log("Getting error " + err);
        return;
      }
      console.log("Connected to the uploads database.");
      this.printTable();
      //this.removeFile("test34.png");
      // this.updateFile(
      //   "test2.png",
      //   "My Title Modified",
      //   "My Description",
      //   "0003-01-01 01:01:01"
      // );
    });
  }

  static createDatabase() {
    this.db = new sqlite3.Database(this.dest, (err) => {
      if (err) {
        console.log("Getting error " + err);
        return;
      }

      this.db.exec(
        `
        CREATE TABLE uploads (
          filename varchar(50) NOT NULL PRIMARY KEY,
          title varchar(50),
          description varchar(300),
          timestamp datetime
        );
      `,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      console.log("database not found. initializing new database");
    });
  }

  static insert(filename, title, description, timestamp) {
    this.db.run(
      `
      INSERT INTO uploads (filename, title, description, timestamp)
        VALUES ($filename, $title, $description, $timestamp)
      `,
      {
        $filename: filename,
        $title: title,
        $description: description,
        $timestamp: timestamp,
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  static getFile(filename) {
    return new Promise((res, rej) => {
      this.db.get(
        `
        SELECT filename, title, description, timestamp
        FROM uploads
        WHERE filename = $filename`,
        { $filename: filename },
        (err, row) => {
          if (err) rej(err);
          res(row);
        }
      );
    });
  }
  static removeFile(filename) {
    this.db.run(`DELETE FROM uploads WHERE filename = ?`, filename, (err) => {
      if (err) console.log(err);
    });
  }
  static updateFile(filename, title, description) {
    this.db.run(
      "UPDATE uploads SET title = $title, description = $description WHERE filename = $filename",
      {
        $filename: filename,
        $title: title,
        $description: description,
      },
      (err) => console.log(err)
    );
  }

  static getAll() {
    return new Promise((res, rej) => {
      this.db.all(`SELECT * FROM uploads`, (err, rows) => {
        if (err) rej(err);
        res(rows);
      });
    });
  }

  static printTable() {
    this.db.all(
      `SELECT filename, title, description, timestamp FROM uploads`,
      (err, rows) => {
        if (err) console.log(err);

        rows.forEach((row) => {
          console.log(
            row.filename +
              "\t" +
              row.title +
              "\t" +
              row.description +
              "\t" +
              row.timestamp
          );
        });
      }
    );
  }
}

module.exports = DatabaseHandler;
