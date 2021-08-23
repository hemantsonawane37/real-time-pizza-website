const Menu = require("../../../app/models/manu");

function homecontroller() {
  return {
    async index(req, res) {
      const pizza = await Menu.find();
      res.render("home", {pizza:pizza});
    },
  };
}

module.exports = homecontroller;
