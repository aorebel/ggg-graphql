import { MongoClient } from "./deps.ts";
import { config } from "./deps.ts";

const { DB_NAME, DB_PASS, DB_USER, DB_HOST } = config();

const client = new MongoClient();
console.log(DB_HOST + " " + DB_NAME);
client.connectWithUri(
  "mongodb+srv://" +
    DB_USER +
    ":" +
    DB_PASS +
    "@" +
    DB_HOST +
    "/" +
    DB_NAME +
    "?retryWrites=true&w=majority",
);

const db = client.database(DB_NAME);
const users = db.collection("users");
const employees = db.collection("employees");
const carts = db.collection("cart");
const images = db.collection("images");
const products = db.collection("products");
const variants = db.collection("variants");
const stocks = db.collection("stocks");
const prices = db.collection("prices");
const stores = db.collection("stores");
const warehouses = db.collection("warehouses");
const sales = db.collection("sales");
const transactions = db.collection("transactions");
const inventories = db.collection("inventories");
const logs = db.collection("logs");
const contacts = db.collection("contact");
const address = db.collection("address");
const emails = db.collection("email");
const phones = db.collection("phone");
const stockUnits = db.collection("units");

//users.createIndexes({ "$**": "text" });

export {
  db,
  users,
  employees,
  carts,
  images,
  products,
  variants,
  stocks,
  prices,
  stores,
  warehouses,
  sales,
  transactions,
  inventories,
  logs,
  contacts,
  address,
  emails,
  phones,
  stockUnits,
};
