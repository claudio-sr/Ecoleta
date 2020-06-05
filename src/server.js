const express = require('express')
const server = express()

const port = 3000

// Pegar o banco de dados
const db = require("./database/db")

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

// configuracao da pasta publica
server.use(express.static("public"))

// utilizando templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {

    
    return res.render("index.html", {title:"Titulo"})
})

server.get('/create-point', (req, res) => {
    return res.render("create-point.html")
})

server.post("/sevepoint", (req, res) => {

    // Inserir dodos no banco de dados
    const query = `
		INSERTE INTO places (name, idade)
		VALUES(?,?);
		`
	const values = [
        {name, idade} = req.body
    ]

	function afterInsertDate(err) {
		if(err) {
			return console.log(err)
		}
		
		console.log("Cadastrado")
        
        return res.send("ok")
	}
	
	db.run(query, values, afterInsertDate) 


})

server.get('/search-results', (req, res) => {
    
    // pegar os dados do banco de dados
    db.all(`SELECT name FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }
        
        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows})
    })
     
})


server.listen(port, () => console.log(`Server run on ${port}` ))