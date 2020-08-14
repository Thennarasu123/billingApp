var express = require('express');
var router = express.Router();
const path = require("path");
var multer = require("multer");
const mongoose  = require("mongoose");
var util = require('util');
/* require("./model");
const File = mongoose.model("file"); */
const MongoClient = require('mongodb').MongoClient;

/*const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});*/

/* const storage = multer.diskStorage({
    destination: "./public/",
    filename: function(req, file, cb){
        //console.log('length '+file[0]);
        cb(null,"IMAGE-" + file.originalname +'-'+ Date.now() + path.extname(file.originalname));
    }
 }); */

/* var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}); */
 /* const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myFile");
 const obj =(req,res) => {
    upload(req, res, () => {
       console.log("Request ---", req.body);
       console.log("Request file ---", req.file);//Here you get file.
       const file = new File();
       file.meta_data = req.file;
       file.save().then(()=>{
       
       })
       file.remove();
       res.send(req.file.filename)
    });
 } */

router.delete('/',function (req, response, next) {
    console.log('delete req '+req);
    fs.unlink(app.get('file-path'), function (e) {
 
        if (e) {
 
            app.set('mess', e.message);
            next();
 
        } else {
 
            res.json({
 
                mess: 'file deleted',
                path: app.get('file-path')
 
            });
 
        }
 
    });
 
}, function (req, res) {
 
    res.json({
 
        mess: app.get('mess')
 
    });
})


router.get('/', function(req, res, next) {
    res.send('API is working correctly1121');
});
router.post('/', function(req, res, next) {
    res.send('API is working correctly1111');
});
router.post('/customers', function(req, res, next) {
    //console.log('testAPI2');
    res.send('API is working correctl');
    /* MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                console.log('Connected to Database')
                console.log('Connected to Database1')
                const db = client.db('Quotation')
                const quotesCollection = db.collection('CustomerDetails')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                console.log(result)
                })
                .catch(error => console.error(error))
      }) */
});
/* router.post('/userProfile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
}) */
router.post('/qoutation', function(req, res, next) {
    //console.log('testAPI2');
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                //console.log('Connected to Database')
                //console.log('Connected to Database1')
                const db = client.db('Quotation')
                const quotesCollection = db.collection('Quotation')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
      })
});
router.post('/supplier', function(req, res, next) {
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                const db = client.db('Quotation')
                const quotesCollection = db.collection('Supplier')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
      })
});
/* router.post('/userProfile', function(req, res, next) {
    console.log(req.body);
}); */
/* router.post("/userProfile",obj); */
router.get('/userProfile', function(req, res, next) {
    console.log(req.body);
});
router.get('/customers', function(req, res, next) {
    let custParams = {};
    let sendresult = {};
    res = res;
    if(req.query == null || req.query == undefined || req.query == ""){
        custParams = {};
    }else{
        custParams = req.query;
    }
    console.log('custParams '+JSON.stringify(custParams))
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("CustomerDetails").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
          console.log('custres '+custres)
    })/* .then(result => {
        console.log(sendresult)
    })
     */
    //res.send(sendresult);
    //console.log('req body '+JSON.stringify(req['params'].foo)+' '+JSON.stringify(req.params)+' '+JSON.stringify(req.query));
    
   /*  MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
            console.log('retreived to Database')
            const db = client.db('Quotation')
            const CustomerDetails = db.collection('CustomerDetails')
            const customerCursor = CustomerDetails.find({custParams},function(err, objs){
                var job;
                console.log('objs1234 '+objs);
                for(x=0;x<=Object.values(objs).length;x++){
                    console.log('objsx  '+objs[x]);
                }
            })
            console.log(customerCursor)
      }) */
});
router.post('/companyDetail',function(req,res, next){
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                const db = client.db('Quotation')
                const quotesCollection = db.collection('CompnayInfo')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
      })
})
router.post('/items',function(req,res, next){
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                const db = client.db('Quotation')
                const quotesCollection = db.collection('ItemMaster')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
      })
})
router.get('/items', function(req, res, next) {
    res = res;
    let sendresult = {};
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("ItemMaster").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })
});
router.get('/qoutation', function(req, res, next) {
    res = res;
    let sendresult = {};
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("Quotation").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })
});
/* {"category":"c1","supplier":"s1","tel":"2211234","fax":"123-456","email":"supplier1@abc.com","supplierName":"Senthil KUmar","address":"supplier sample address","supplierTel":"342212234","supplierVat":"99","preferredPayment":"COD","_id":{"$oid":"5f24e3c47cddc71eacf4a8e1"}} */
router.get('/supplier', function(req, res, next) {
    res = res;
    let sendresult = {};
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("Supplier").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })
});
router.get('/templates', function(req, res, next) {
    res = res;
    let sendresult = {};
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var dbo = db.db("Quotation");
        var custres = dbo.collection("templates").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })
});
router.post('/templates', function(req, res, next) {
    /* res = res;
    let sendresult = {};
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var dbo = db.db("Quotation");
        var custres = dbo.collection("templates").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    }) */
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return console.error(err)
                const db = client.db('Quotation')
                const quotesCollection = db.collection('templates')
                console.log(req.body)
                quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
      })
});

router.post('/customerReport', function(req, res, next) {
    res = res;
    let sendresult = {};
    /* console.log(req) */
    console.log('customerReport '+JSON.stringify(req.params)+' '+JSON.stringify(req.body.customer.key));
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("CustomerDetails").find({"customer":req.body.customer.key}).toArray(function(err, result) {
            if (err) throw err;
            //console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })


})

router.post('/monthlyReport', function(req, res, next) {
    res = res;
    let sendresult = {};
    console.log('monthlyReport '+req.body.MonthlyReportMonthStart+" "+JSON.stringify(req.params));
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("Quotation").find({"create_ts":{ $gte:req.body.MonthlyReportMonthStart, $lte:req.body.MonthlyReportMonthEnd}}).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })

    
})

router.post('/productReport', function(req, res, next) {
    res = res;
    let sendresult = {};
    console.log('productReport '+req.body.product.key);
    MongoClient.connect('mongodb+srv://lds:lds2020@ldsbilling.tqbsf.mongodb.net/test?authSource=admin&replicaSet=atlas-2vzch8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', function(err, db) {
        if (err) throw err;
        var query = {customer: 'Thennarasu'};
        var dbo = db.db("Quotation");
        var custres = dbo.collection("Quotation").find({items:{"DESCRIPTION":req.body.product.key}}/* {items:{key:req.body.product}} */).toArray(function(err, result) {
            if (err) throw err;
            console.log('res');
            console.log(result);
            console.log(result.length);
            sendresult = result;
            console.log(result);
            res.send(sendresult);
            db.close();
          });
    })

    
})
module.exports = router;