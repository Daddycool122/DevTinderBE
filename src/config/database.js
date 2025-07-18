const mongoose = require('mongoose');

const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://drillbit819:VVpBdjjvZAGdfrj6@namastenode.mnwqo48.mongodb.net/DevTinder');

}

module.exports = {connectDb};


