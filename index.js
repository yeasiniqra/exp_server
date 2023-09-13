const express = require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
var cors = require('cors')
const phones = require('./phones.json')
const port = 8000 

/*
    crud_opration
    8ULr51rmF4KWwXmo
*/ 

//middleware 
app.use(cors())
app.use(express.json())

// app.get('/phones', (req,res) => {
//     res.send(phones)
// })

// app.get('/phones/:id', (req, res) => {
//     const id = parseFloat(req.params.id)
//     const phone = phones.find(p => p.id == id)
//     res.send(phone)
// })


const uri = "mongodb+srv://crud_opration:8ULr51rmF4KWwXmo@cluster0.lsvtkkf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true,}});

async function run() {
    const crudCollection = client.db("crudapps").collection("crudapp");
  try {
    app.post('/crudapp', async(req, res) => {
        const user = req.body
        const result = await crudCollection.insertOne(user)
        res.send(result)
    })
    app.get('/crudapp', async(req, res) => {
        const query = {}
        const cursor = crudCollection.find(query)
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/crudapp/:id', async(req, res) => {
        const {id} = req.params
        const filte = { _id : new ObjectId(id)}
        const result = await crudCollection.findOne(filte)
        res.send(result)
    })

    app.delete('/crudapp/:id', async(req,res) => {
        const {id} = req.params
        const del =  { _id : new ObjectId(id)}
        const result = await crudCollection.deleteOne(del)
        res.send(result)
    })

    app.patch('/crudapp/:id', async(req,res) => {
        const {id} = req.params
        const filte = {_id : new ObjectId(id)}
        const user = req.body
        const updateDoc = {
            $set : {
                name : user.name,
                designation : user.designation,
                salary : user.salary,
            }
        }
        const result = await crudCollection.updateOne(filte,updateDoc)
        res.send(result)
    })

  } finally {
    
  }
}
run().catch(err => console.log(err));



app.get('/',(req,res) => {
    res.send("Hello Express I am back!!!!!!")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})