var conn = require('../inc/db');
var users = require('../inc/users');
var alunos = require('../inc/alunos');
var admin = require('./../views/inc/admin');
var express = require('express');
var moment = require("moment");
var router = express.Router();

moment.locale("pt-BR");

router.use(function(req, res, next){

  if(['/login'].indexOf(req.url) === -1 && !req.session.user){
    res.redirect("/login");
  }else{
    next();
  }

});

router.use(function(req, res, next){
  req.menus = admin.getMenus(req);
  next();
});

router.get("/logout", function(req, res, next){
  delete req.session.user;
  res.redirect("/login");
});

/* GET home page. Pagina reponsavel por criação das rotas das views*/
router.get('/', function(req, res, next) {
  admin.dashboard().then(data => {
    res.render("index", admin.getParams(req, {
      data 
    }));
  }).catch(err => {
    console.error(err);
  });
});

router.post("/login", function(req, res, next){
  if(!req.body.email){
    users.render(req, res, "Preencha o campo E-mail!");
  } else if (!req.body.senha){
    users.render(req, res, "Preencha o campo Senha!");
  }else{
    users.login(req.body.email, req.body.senha).then(user => {
      req.session.user = user;
      res.redirect("/");
    }).catch(err => {
      users.render(req, res, err.message || err);
    });
  }

});

router.get('/login', function(req, res, next){
  users.render(req, res, null);
});

router.get('/', function(req, res, next){
  admin.dashboard().then(data => {
    res.render("index", admin.getParams(req, {
      data 
    }));
  }).catch(err => {
    console.error(err);
  });
});


router.get('/alunos', function(req, res, next){
  alunos.getAlunos().then(data => {
    res.render('alunos', admin.getParams(req, {
      data,
      moment 
    }));
  });
});

router.post("/alunos", function(req, res, next){
  alunos.save(req.fields, req.files).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

//  res.send(req.fields);
  // console.log(req.fields);
});

router.delete("/alunos/:id", function(req, res, next){
  alunos.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/users', function(req, res, next){

  users.getUsers().then(data => {
    res.render('users', admin.getParams(req, {
      data
    }));
  });

});

router.post('/users', function(req, res, next){

  users.save(req.fields).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

});

router.delete("/users/:id", function(req, res, next){
  
  users.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

});
module.exports = router;
