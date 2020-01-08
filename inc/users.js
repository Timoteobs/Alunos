var conn = require("./db");


module.exports = {

    render(req, res, error){
        res.render('login', {
            title: 'Login - Simple Form',
            body: req.body,
            error
          });
    },

    login(email, senha){
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_usuarios WHERE email_usuario = ?
            `,[
                email
            ], (err, results) => {
                if(err){
                    reject(err);
                }else{

                    if(!results.length > 0){
                        reject("Usuário ou senha incorretos!");
                    }else{
                        let row = results[0];
                        if(row.senha_usuario !== senha){
                            reject("Usuário ou senha incorretos!");
                        }else{
                            resolve(row);
                        }
                    }
                }
            }
            )
        });
    },

    getUsers() {
		return new Promise((resolve, reject) => {
			conn.query(`
                SELECT * FROM tb_usuarios ORDER BY nome_usuario
            `, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	},

	save(fields) {
		return new Promise((resolve, reject) => {

			let query, params;

			if (parseInt(fields.id_usuario) > 0) {

				query = `
                    UPDATE tb_usuarios SET nome_usuario = ?,
                                        email_usuario = ?
                                        WHERE id_usuario = ? 
                    `;
				params = [
					fields.nome_usuario,
                    fields.email_usuario,
                    fields.id_usuario
				];

			} else {

				query = `
                INSERT INTO tb_usuarios(nome_usuario, email_usuario, senha_usuario)
                VALUES (?, ?, ?)
                    `;
				params = [
					fields.nome_usuario,
					fields.email_usuario,
					fields.senha_usuario
                ];
                
			}
			conn.query(query, params, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	},

	delete(id) {

		return new Promise((resolve, reject) => {
			conn.query(`
                DELETE FROM tb_usuarios WHERE id_usuario = ?;
            `, [
				id
			], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});

	}
}