// importar a dependencia do sqlite3
const sqlite3 = require("sqlite").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas opracoes
db.serialize(() => {
	
	// // 1 - criar uma tabela
	// db.run(`
	// 	CREATE TABLE IF NOT EXISTS places (
	// 		id INTEGER PRIMARY KEY AUTOINCREMENTE,
	// 		name TEXT,
	// 		idade INTEGER
		
	// 	);
	// `)

	// // 2 - Inserir dados na tabela
	// const query = `
	// 	INSERTE INTO places (name, idade)
	// 	VALUES(?,?);
	// 	`
	// const values = []

	// function afterInsertDate(err) {
	// 	if(err) {
	// 		return console.log(err)
	// 	}
		
	// 	console.log("Cadastrado")
	// }
	
	// db.run(query, values, afterInsertDate) 

	// // 3 - Consultar os dados da tabela
	// db.all(`SELECT name FROM places`, function(err, rows){
	// 	if(err) {
	// 		return console.log(err)
	// 	}
		
	// 	console.log("Dados")
	// 	console.log(rows)
	// }) 

	// // 4 - Deletar um dado da tabela
	// db.run(`DELETE FROM places WHERE id = ?`, [], function(err){
	// 	if(err){
	// 		return console.log(err)
	// 	}

	// 	console.log("Deletado")
	// })
	
})