const express = require("express");
const cors = require("cors");
const EncryptRsa = require('encrypt-rsa').default
const random = require("random-string-generator");



const { connection } = require("./config/db");
const { urlModel } = require("./models/url.models");

const PORT = process.env.PORT;

const encryptRsa = new EncryptRsa();
const { privateKey, publicKey } = encryptRsa.createPrivateAndPublicKeys();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Base Api" });
});

app.post("/shortUrl", async (req, res) => {
  const { url, length, alias } = req.body;
  const encryptedUrl = encryptRsa.encrypt(url, publicKey);
  let shortenUrl;
  if (alias) {
    shortenUrl = alias;
    const url_constructor = new urlModel({ url:encryptedUrl, shortenUrl });
    await url_constructor.save();
    return res.status(201).send({ short_url: shortenUrl });
  } else {
    if(length){
        shortenUrl = random(length, "lower");
    }else{
        shortenUrl = random(6, "lower");
    }
  }
  let find_shorten = await urlModel.findOne({ shortenUrl });
  if (find_shorten) {
    shortenUrl = random(length, "lower");
  }

  try {
    const url_constructor = new urlModel({ url:encryptedUrl, shortenUrl });
    await url_constructor.save();
    res.status(201).send({ short_url: shortenUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});

app.get("/redirect", async (req, res) => {
  const { shortenUrl } = req.query;
  let find_shorten = await urlModel.findOne({ shortenUrl });
  console.log(find_shorten.url)
  if (find_shorten) {
    const decryptedUrl = encryptRsa.decrypt(find_shorten.url, privateKey);
    return res.redirect(decryptedUrl)
  } else {
    res.send("no link asociated with this  link please check again");
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DataBase");
  } catch (error) {
    console.log("something wrong with db connection");
    console.log(error);
  }
  console.log(`Listening on PORT ${PORT}`);
});
