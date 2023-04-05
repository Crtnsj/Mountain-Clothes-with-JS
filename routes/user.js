import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'root',
  database: 'mydatabase'
});

router.get('/auth', function(req, res, next) {
  res.render('pages/connexion');
});

router.post('/auth',function(req, res, next){
    let coderr = 0b0000;
    let data = req.body;
    connection.query(`SELECT * FROM users WHERE users.email='${data.email}';`,(err,result,fields) => {
        bcrypt.compare(data.pswd,result[0].password)
            .then(valid =>{
                if (valid) {
                    connection.query(`SELECT * FROM users WHERE users.email='${data.email}';`,(err,result,fields) => {
                    res.render('pages/page_user', { user: result[0].firstname });
                    });
                }else if(!valid){
                    coderr = 0b1111;
                    res.render('pages/acces_denied', { coderr: coderr });

                };
            });
    });
});

router.get('/signup', function(req, res, next) {
  res.render('pages/signup');
});

router.post('/signup', function(req, res, next) {
  let coderr = 0b0000;
  let data = req.body;
  const age = parseInt(data.age);
  if (age < 18) {
    coderr = 0b0001;
    res.render('pages/acces_denied', { coderr: coderr });
  }
  connection.query('SELECT email FROM users', (err, result, fields) => {
    let verifemail = 0
    for (let i= 0; i<data.email.length; i++){
        if (data.email[i]==="@"){
            verifemail += 1
        }
    }
    if (verifemail === 1){
        console.log('type email OK')
    }else{
        coderr = 0b0010;
        res.render('pages/acces_denied', { coderr: coderr });
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].email == data.email) {
        coderr = 0b0010;
        res.render('pages/acces_denied', { coderr: coderr });
      };
    };
  });
  let password = data.pswd
  if (password.length < 8) {
    coderr = 0b1000;
    res.render('pages/acces_denied', { coderr: coderr });
  } else {
    bcrypt.hash(data.pswd, 10)
      .then(hash => {
        data.pswd = hash
        if (coderr !== 0b0000) {
          res.render('pages/acces_denied', { coderr: coderr });
        } else {
            connection.query(`INSERT INTO users (id, email, age, lastname, firstname, password) VALUES (NULL, '${data.email}', '${data.age}', '${data.lastname}', '${data.firstname}', '${data.pswd}');`)
            connection.query(`SELECT * FROM users WHERE users.firstname = '${data.firstname}'`, (err, result, fields) => {
            res.render('pages/page_user', { user: result[0].firstname });
            });
            
        }
      })
  }
});

router.get('/ownpage', function(req, res, next) {
  res.render('pages/ownpage');
});

export default router;