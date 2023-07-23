const express = require("express");
const cors = require("cors");
const Cryptr = require('cryptr');
const random = require("random-string-generator");

const { connection } = require("./config/db");
const { urlModel } = require("./models/url.models");

const PORT = process.env.PORT;

const cryptr = new Cryptr('myTotallySecretKey');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Base Api" });
});

app.post("/shortUrl", async (req, res) => {
  const { url, length, alias } = req.body;
  const encryptedUrl = cryptr.encrypt(url)
  let shortenUrl;
  if (alias) {
    const existingUrl = await urlModel.findOne({ shortenUrl: alias });
    if (existingUrl) {
      return res.status(409).send({ msg: "Alias already in use" });
    }
    shortenUrl = alias;
    const url_constructor = new urlModel({ url: encryptedUrl, shortenUrl });
    await url_constructor.save();
    return res.status(201).send({ short_url: shortenUrl });
  } else {
    if (length) {
      shortenUrl = random(length, "lower");
      const existingUrl = await urlModel.findOne({ shortenUrl: alias });
      if (existingUrl) {
        shortenUrl = random(length, "lower");
      }
    } else {
      shortenUrl = random(6, "lower");
      const existingUrl = await urlModel.findOne({ shortenUrl: alias });
      if (existingUrl) {
        shortenUrl = random(6, "lower");
      }
    }
  }

  try {
    const url_constructor = new urlModel({ url: encryptedUrl, shortenUrl });
    await url_constructor.save();
    res.status(201).send({ short_url: shortenUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});

app.get("/:shortenUrl", async (req, res) => {
  const { shortenUrl } = req.params;

  let find_shorten = await urlModel.findOne({ shortenUrl });

  if (find_shorten) {
    const decryptedUrl = cryptr.decrypt(find_shorten.url);
    return res.redirect(decryptedUrl);
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
