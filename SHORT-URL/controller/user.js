const User = require("../model/user");

const { setUSer } = require("../services/auth");
async function handlePostSignIn(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}

async function handlePostLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); 
  if (!user)
    return res.render("login", { error: " Invalid Email or Password" });

  const token = setUSer(user);
  res.cookie("uid", token);
  return res.redirect("/");
}
module.exports = { handlePostSignIn, handlePostLogin };
