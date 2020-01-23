
var conn = require('../../inc/db');

module.exports = {

    dashboard(){

        return new Promise((resolve, reject) => {
            conn.query(`SELECT
            (SELECT COUNT(*) FROM tb_usuarios) AS nrusuarios,
            (SELECT COUNT(*) FROM tb_alunos) AS nralunos;`
            ,(err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results[0]);
                }
            });
        });
    },

    getParams( req, params ){
        return Object.assign({}, {
            title: 'Simple Form',
            menus: req.menus,
            user: req.session.user
        }, params);
    },

    getMenus(req){

        let menus = [
            {
                text:"Tela Inicial",
                href:"/",
                icon:"home",
                active:false
            },
            {
                text:"Alunos",
                href:"/alunos",
                icon:"user-plus",
                active:false
            },
            {
                text:"Notas",
                href:"/notas",
                icon:"calculator",
                active:false
            },
            {
                text:"Usuários",
                href:"/users",
                icon:"users",
                active:false
            },
        ];
        
        menus.map(menu => {

            if (menu.href === req.url) menu.active = true;

        });

        return menus;

    }

}