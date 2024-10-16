import { Surreal, RecordId, StringRecordId } from "surrealdb";

const db = new Surreal();

await db.connect("http://127.0.0.1:8000/rpc").then(() => {console.log("SURREALDB DATABASE CONNECTED")});
await db.signin({
    username: "root",
    password: "root"
}).then(() => {console.log("DATABASE SIGN IN SUCCESSFUL")});
await db.use({
    namespace: "company",
    database: "application"
}).then(() => {console.log("NAMESPACE AND DATABASE SELECTED")});

let createData = await db.create("user", {
    title: "Software Engineer",
    name: {
        first: "Gavin",
        middle: "R.",
        last: "Isgar"
    },
    age: 21,
    created_at: Date.now()
}).catch((err) => {
    console.log(err);
});
let updateUser = await db.patch(new RecordId("user", createData[0].id.id), [
    { op: 'add', path: '/name/full', value: `${createData[0].name.first} ${createData[0].name.middle} ${createData[0].name.last}`}
]);