require("dotenv").config(); //helps you load .env files
//the .env stores your credentials for your server
//we keep it seperate for security
//we dont' save our .env files to github
//your mysqlconfig.js is that file that read the .env
const express = require('express')
//library for pathes / routes
const bodyParser = require("body-parser")
//when we send data from the client to the server
//its a string this convers it to an object
const app = express()
//app is our server

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//config for the bodyParser


app.set('view engine', 'ejs')
//ejs is a file format for node //
//node file format but now its not required you can just use js
//one example javascript doesnt have require but node doesnt

app.use(express.static('public'))
//this will server all the files in the public folder to pathes
//client
//your webpage needs to get the css and js files, this will give it the webpage

const connection = require("./mysqlconfig")
//mysqlc mysqlconfig


//creates route /
app.get('/',(req, res) =>{
    console.log('here')
    //res.download("server.js") //lets user download the file at the end of the path
    //res.status(500).json({message: "Error"}) //sends status and json code for APIs
    //res.status(500).send('Hi') //sends status and a message
    //res.send('Hi') //sends message
    res.render('DandDNotes', {name: "Magic Gary"})
    //render means out put the browser and
    ///pass the variable name with value "magic gray"
})


//post means to receive database
app.post('/notes',(req, res) => {
    const id = req.query.id // localhost:3000/notes?id=XXX
    //req.body.id


    //if id is passed update, no id creates
    if(id){
        /*UPDATE table_name
        SET column1 = value1, column2 = value2, ...
        WHERE condition; */
        connection.query(`UPDATE dandd_notes
        SET note_name = "${req.query.note_name}", note_content = "${req.query.note_content}"
        WHERE id = ${id}`, (error, response) => {
            if(error)
                console.error(error)
            res.send(response)
        })
    }
    else{
    const retVal = connection.query(`INSERT INTO dandd_notes (note_name, note_content) VALUES ("${req.query.note_name}", "${req.query.note_content}")`)
    //console.log(retVal)
    res.send()
    }
})

//return data
app.get('/notes',(req, res) => {
    const retVal = connection.query("SELECT * from dandd_notes", (error, response) => {
        if(error)
            console.error(error)
        res.send(response)
    })
})

//starting the server listening on port
app.listen(3000, ()=>{
  console.log("server listening on port 3000")
})
