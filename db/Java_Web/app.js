require('dotenv').config();
const {MongoClient} = require("mongodb")
const URL = process.env.URL;
const fs = require("fs");
const path = require('path');

const minValues = [];
const maxValues = [];
const avgValues = [];
const filePath = path.join(__dirname, 'data.json');
const data = {
    minValues,
    maxValues,
    avgValues,
};

const client = new MongoClient(URL);
async function run(){

    try{


        
        await client.connect();
        const database = client.db('db');
        const DB_Value = database.collection('input');
        

        const value = await DB_Value.find({}).toArray();
        for (const obj of value) {
            const { min, max, avg } = obj.value;
            minValues.push(min);
            maxValues.push(max);
            avgValues.push(avg);
            
        }
        // console.log(minValues);
        // console.log(maxValues);
        // console.log(avgValues);
        fs.writeFileSync(filePath, JSON.stringify(data));
        console.log("True");

    }finally{
        
        await client.close();
    }
}
  


run().catch(console.dir);
