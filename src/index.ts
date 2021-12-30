import data from "./db.json";
import fs from "fs";
const { users, transactions }: any = data.database;

export function findById(collection: string, _id: number) {
  if (Object.keys(data.database).includes(collection)) {
    const db: any = data.database;
    const [result]: any = db[collection].filter(
      (element: any) => element._id === _id
    );
    return result;
  }
}

export function find(collection: string) {
  if (Object.keys(data.database).includes(collection)) {
    const db: any = data.database;
    return db[collection];
  }
  return null;
}

export function findOne(collection: string, selector: any): any {
  let result = null;
  if (Object.keys(data.database).includes(collection)) {
    const database: any = data.database;

    const col: any = database[collection];

    col.forEach((element: any, index: number) => {
      let validation = 0;

      for (let key of Object.keys(selector)) {
        if (element[key] === selector[key]) {
          validation++;
        }
      }

      if (validation === Object.keys(selector).length) {
        result = element;
      }
    });
  }

  return result;
}

export function insert(collection: string, doc: any) {
  if (Object.keys(data.database).includes(collection)) {
    const database: any = data.database;
    database[collection] = [...database[collection], doc];
    console.log(database[collection]);
    const update = { database };
    fs.writeFileSync("./src/db.json", JSON.stringify(update));
    return true;
  }
  return false;
}

export function update(collection: string, selector: any, update: any) {
  if (Object.keys(data.database).includes(collection)) {
    const database: any = data.database;

    const col: any = database[collection];

    let validation = 0;
    let docIndex = -1;

    col.forEach((element: any, index: number) => {
      for (let key of Object.keys(selector)) {
        if (element[key] === selector[key]) {
          validation++;
        }
      }
      if (validation === Object.keys(selector).length) {
        docIndex = index;
      }
    });

    if (docIndex > -1) {
      Object.keys(update).forEach((key) => {
        col[docIndex][key] = update[key];
      });

      database[collection] = col;

      const updated = { database };
      fs.writeFileSync("./src/db.json", JSON.stringify(updated));

      return true;
    }
  }

  return false;
}

export function remove(collection: string, selector: any) {
  if (Object.keys(data.database).includes(collection)) {
    const database: any = data.database;

    const col: any = database[collection];
    let validation = 0;
    let docIndex = -1;
    col.forEach((element: any, index: number) => {
      for (let key of Object.keys(selector)) {
        if (element[key] === selector[key]) {
          validation++;
        }
      }

      if (validation === Object.keys(selector).length) {
        docIndex = index;
      }
    });

    if (validation === Object.keys(selector).length) {
      col.splice(docIndex, 1);
      database[collection] = col;

      const updated = { database };
      fs.writeFileSync("./src/db.json", JSON.stringify(updated));

      return true;
    }
  }

  return false;
}

export function lookUp(
  main: string,
  sub: string,
  subKey: string,
  newKey: string
) {
  if (
    Object.keys(data.database).includes(main) &&
    Object.keys(data.database).includes(sub)
  ) {
    const db: any = data.database;
    return db[main].map((element: any) => {
      return {
        ...element,
        [newKey]: db[sub].filter(
          (subElement: any) => subElement[subKey] === element._id
        ),
      };
    });
  }
}

export function createCollection(collection: string) {
  if (!Object.keys(data.database).includes(collection)) {
    const database: any = data.database;
    database[collection] = [];
    const update = { database };
    fs.writeFileSync("./src/db.json", JSON.stringify(update));
    console.log(`${collection} collection created !`);
  }
}

export function deleteCollection(collection: string) {
  if (Object.keys(data.database).includes(collection)) {
    const database: any = data.database;
    delete database[collection];
    const update = { database };
    fs.writeFileSync("./src/db.json", JSON.stringify(update));
    console.log(`${collection} collection deleted !`);
    return true;
  }
  return false;
}

console.log(lookUp("users", "transactions", "user", "user_transactions"));
