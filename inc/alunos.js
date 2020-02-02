let conn = require("./db");
let path = require("path");
var Pagination = require("./../inc/Pagination");

module.exports = {
    
    getAlunos(req){

        return new Promise((resolve, reject) => {

            let page = req.query.page;
            let nomeAluno = req.query.filtro_nome_aluno;
            let matriculaAluno = req.query.filtro_matricula;
            if (!page) page = 1;

            let query;
            let params = [];

            if (nomeAluno && matriculaAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS * 
                        FROM tb_alunos
                        WHERE nome_aluno LIKE ? 
                        AND id_aluno = ?
                        order by nome_aluno LIMIT ?, ?
                    `;
                params.push(`%${nomeAluno}%`, matriculaAluno);
                
            } else if (nomeAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS * 
                        FROM tb_alunos
                        WHERE nome_aluno LIKE ?
                        order by nome_aluno LIMIT ?, ?
                    `;
                params.push(`%${nomeAluno}%`);

            }else if (matriculaAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS * 
                        FROM tb_alunos
                        WHERE id_aluno = ?
                        order by nome_aluno LIMIT ?, ?
                    `;
                params.push(matriculaAluno)

            }else{
                query = `
                        SELECT SQL_CALC_FOUND_ROWS * 
                        FROM tb_alunos
                        order by nome_aluno LIMIT ?, ?
                    `;
            };

            let pag = new Pagination(
                query, 
                params
            );

            pag.getPage(page).then(data => {
                resolve({
                    data,
                    links: pag.getNavigation(req.query)
                });
            });
         });
    },

    save(fields, files){

            return new Promise((resolve, reject) => {

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
                        fields.regime_dependencia,
                        fields.id_aluno
                    ];

                }else{

                    query=`
                        INSERT INTO tb_alunos(nome_aluno, genero_aluno, nome_pai, nome_mae, data_nascimento, pais_aluno, estado_aluno, cidade_aluno, serie_conclusao, dispensa_aluno, descricao_dispensa, regime_dependencia)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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