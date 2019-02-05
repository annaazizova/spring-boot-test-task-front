const Hamoni = require("hamoni-sync");

let hamoni = new Hamoni("41eacaa1-9b87-4c0c-823c-0bdf7ee6036e", "1089a468da6f44e1ab9c80e50055d39f");
hamoni
  .connect()
  .then(response => {
    hamoni
      .createList("datagrid", [
        { name: "name1", brand: "brand1", price: "1", quantity:"1" },
        { name: "name2", brand: "brand2", price: "2", quantity:"2" },
        { name: "name3", brand: "brand3", price: "3", quantity:"3" }
      ])
      .then(() => console.log("create success"))
      .catch(console.log);
  })
  .catch(console.log);