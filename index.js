var express = require("express");
require("dotenv").config();
const { affinidiProvider } = require("@affinidi/passport-affinidi");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {
  app.get("/", function (req, res, next) {
    res.json({ success: "Express" });
  });

  await affinidiProvider(app, {
    id: "affinidi",
    issuer:
      "https://fc045363-4259-4719-9fab-5f2fb1c0508f.apse1.login.affinidi.io",
    client_id: "421d7684-10bb-497f-9f50-720379b56dfa",
    client_secret: "_PQMZeHmRvtU6V5HFkY4H68n6T",
    redirect_uris: ["https://affinidi-capstone-five.vercel.app/auth/callback"],
    handleCredential: (credential) => {
      console.log("Received credential:", credential);
    },
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

initializeServer();
