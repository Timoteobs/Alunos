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
    }
}