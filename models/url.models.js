const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    url:{type:"String", required:"true"},
    shortenUrl:String
})
const urlModel = mongoose.model("URL",urlSchema)

module.exports = {urlModel}
