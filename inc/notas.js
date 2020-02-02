
let conn = require("./db");
var Pagination = require("./../inc/Pagination");

module.exports = {

    getNotas(req){
        return new Promise((resolve, reject) => {
           
            let page = req.query.page;
            let nomeAluno = req.query.filtro_nome_aluno;
            let matriculaAluno = req.query.filtro_matricula;
            if (!page) page = 1;

            let query;
            let params = [];

            if (nomeAluno && matriculaAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno
                        WHERE tb_alunos.nome_aluno LIKE ?
                        AND tb_historico_alunos.id_aluno = ?
                        order by tb_alunos.nome_aluno LIMIT ?, ?
                    `;
                params.push(`%${nomeAluno}%`, matriculaAluno);
                
            } else if (nomeAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno
                        WHERE tb_alunos.nome_aluno LIKE ?
                        order by tb_alunos.nome_aluno LIMIT ?, ?
                    `;
                params.push(`%${nomeAluno}%`);

            }else if (matriculaAluno){

                query = `
                        SELECT SQL_CALC_FOUND_ROWS *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno
                        AND tb_historico_alunos.id_aluno = ?
                        order by tb_alunos.nome_aluno LIMIT ?, ?
                    `;
                params.push(matriculaAluno)

            }else{
                query = `
                        SELECT SQL_CALC_FOUND_ROWS *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno 
                        order by tb_alunos.nome_aluno LIMIT ?, ?
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

    getNomesAlunos(){
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

    saveNotas(fields){
        return new Promise((resolve, reject) => {

            let  query, params;

            if (parseInt(fields.id_nota) > 0){

                query=`
                 UPDATE tb_historico_alunos SET id_serie = ?, 
                                                dias_letivos = ?, 
                                                estabelecimento = ?, 
                                                resultado = ?, 
                                                ano = ?, 
                                                cidade = ?, 
                                                estado = ?, 
                                                nota_protugues = ?, 
                                                nota_ingles = ?, 
                                                nota_estudosS = ?, 
                                                nota_historia = ?,
                                                nota_geografia = ?,
                                                nota_ciencias = ?,
                                                nota = ?,
                                                nota_matematica = ?,
                                                nota_artes = ?,
                                                nota_religiao = ?,
                                                nota_edFisica = ?,
                                                nota_informatica = ?,
                                                nota_espanhol = ?
                                                WHERE id_nota = ?  
            `;
            params = [
                fields.id_serie,
                fields.dias_letivos,
                fields.estabelecimento,
                fields.resultado,
                fields.ano,
                fields.cidade,
                fields.estado,
                fields.nota_protugues,
                fields.nota_ingles,
                fields.nota_estudosS,
                fields.nota_historia,
                fields.nota_geografia,
                fields.nota_ciencias,
                fields.nota,
                fields.nota_matematica,
                fields.nota_artes,
                fields.nota_religiao,
                fields.nota_edFisica,
                fields.nota_informatica,
                fields.nota_espanhol,
                fields.id_nota
            ];
                
            }else{
                query=`
                    INSERT INTO tb_historico_alunos (id_serie, 
                                                    id_aluno, 
                                                    dias_letivos, 
                                                    estabelecimento, 
                                                    resultado, 
                                                    ano, 
                                                    cidade, 
                                                    estado, 
                                                    nota_protugues, 
                                                    nota_ingles, 
                                                    nota_estudosS, 
                                                    nota_historia,
                                                    nota_geografia,
                                                    nota_ciencias,
                                                    nota,
                                                    nota_matematica,
                                                    nota_artes,
                                                    nota_religiao,
                                                    nota_edFisica,
                                                    nota_informatica,
                                                    nota_espanhol)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `;
                params = [
                    fields.id_serie,
                    fields.id_aluno,
                    fields.dias_letivos,
                    fields.estabelecimento,
                    fields.resultado,
                    fields.ano,
                    fields.cidade,
                    fields.estado,
                    fields.nota_protugues,
                    fields.nota_ingles,
                    fields.nota_estudosS,
                    fields.nota_historia,
                    fields.nota_geografia,
                    fields.nota_ciencias,
                    fields.nota,
                    fields.nota_matematica,
                    fields.nota_artes,
                    fields.nota_religiao,
                    fields.nota_edFisica,
                    fields.nota_informatica,
                    fields.nota_espanhol
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
            DELETE FROM tb_historico_alunos WHERE id_serie = ?
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