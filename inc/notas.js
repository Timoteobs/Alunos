
let conn = require("./db");

module.exports = {

    getNotas(id = ''){
        return new Promise((resolve, reject) => {

            if(id < 0){

            }else{
                conn.query(`
                SELECT *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno 
                        order by tb_alunos.nome_aluno;
                `, (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
            }
            
        });
    },

    getNomesAlunos(){
        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT *, tb_alunos.nome_aluno FROM tb_historico_alunos inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno order by tb_alunos.nome_aluno;
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

            if (parseInt(fields.filtro_matricula) > 0){

                conn.query(`
                        SELECT *, tb_alunos.nome_aluno 
                        FROM tb_historico_alunos 
                        inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno 
                        WHERE  tb_historico_alunos.id_aluno = ?;
                `, fields.filtro_matricula, 
                (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });

                // query=`
                // SELECT *, tb_alunos.nome_aluno 
                //     FROM tb_historico_alunos 
                //     inner join tb_alunos ON tb_alunos.id_aluno = tb_historico_alunos.id_aluno 
                //     WHERE  tb_historico_alunos.id_aluno = ?;
                // `; params = [
                //     fields.filtro_matricula
                // ]
                
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
                conn.query(query, params, (err, results) => {
                    if (err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });
            }    
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