const mongoose  = require("mongoose");
//const File = mongoose.model("file");


const fileSchema = new mongoose.Schema({
    meta_data:{}
});

mongoose.model("file",fileSchema);