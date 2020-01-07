let conn = require("./db");
let path = require("path");

module.exports = {
    getAlunos(){
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_alunos order by nome_aluno;
            `, (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

        save(fields, files){
            return new Promise((resolve, reject) => {

                fields.doc = `images/${path.parse(files.imagem_aluno.path).base}`;

                let  query, params;

                if (parseInt(fields.id_aluno) > 0){

                    query = `
                    UPDATE tb_alunos SET nome_aluno = ?,
                                        genero_aluno = ?,
                                        nome_pai = ?,
                                        nome_mae = ?,
                                        data_nascimento = ?,
                                        pais_aluno = ?,
                                        estado_aluno = ?,
                                        cidade_aluno = ?,
                                        serie_conclusao = ?,
                                        dispensa_aluno = ?,
                                        descricao_dispensa = ?,
                                        imagem_aluno = ?,
                                        regime_dependencia= ? 
                                        WHERE id_aluno = ? 
                    `;
                    params = [
                        fields.nome_aluno,
                        fields.genero_aluno,
                        fields.nome_pai,
                        fields.nome_mae,
                        fields.data_nascimento,
                        fields.pais_aluno,
                        fields.estado_aluno,
                        fields.cidade_aluno,
                        fields.serie_conclusao,
                        fields.dispensa_aluno,
                        fields.descricao_dispensa,
                        fields.doc,
                        fields.regime_dependencia,
                        fields.id_aluno
                    ];

                }else{

                    query=`
                        INSERT INTO tb_alunos(nome_aluno, genero_aluno, nome_pai, nome_mae, data_nascimento, pais_aluno, estado_aluno, cidade_aluno, serie_conclusao, dispensa_aluno, descricao_dispensa, imagem_aluno, regime_dependencia)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    params = [
                        fields.nome_aluno,
                        fields.genero_aluno,
                        fields.nome_pai,
                        fields.nome_mae,
                        fields.data_nascimento,
                        fields.pais_aluno,
                        fields.estado_aluno,
                        fields.cidade_aluno,
                        fields.serie_conclusao,
                        fields.dispensa_aluno,
                        fields.descricao_dispensa,
                        fields.doc,
                        fields.regime_dependencia
                    ];

                    
                }
                conn.query(query, params, (err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

    delete(id){

        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_alunos where id_aluno = ?
            `, [
                id
            ], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });

    }

}