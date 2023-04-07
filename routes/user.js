import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const router = express.Router();//Création d'un nouvel objet routeur

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'root',
  database: 'mydatabase'
});//Connexion à la database

router.get('/auth', function(req, res, next) {
  res.render('pages/connexion');
});//Route servant à l'accès de la page de connexion

router.post('/auth', function(req, res, next) {
    let coderr = 0b0000;
    // Initialisation d'un code erreur avec la valeur 0 
    let data = req.body;
    //Initialisation de la variable "data" qui va contenir les informations du formulaire
    connection.query(`SELECT * FROM users WHERE users.email='${data.email}';`, (err, result, fields) => {
      //Recherche d'un "user" correspondant à l'email indiqué dans le formulaire
      if (err) {
        //S'il y une erreur lors de la requête alors passer à l'instruction suivante
        next();
      }
      if (result.length === 0) {
        //Si le resultat de la requête est strictement égal à 0 alors "coderr" = 15 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à la variable "coderr"
        coderr = 0b1111;
        return res.render('pages/acces_denied', { coderr: coderr });
      }
    bcrypt.compare(data.pswd, result[0].password)
    //comparaison entre le mot de passe du formulaire et le hash du mot de passe correspondant à l'email dans la base de données
        .then(valid => {
          //si la comparaison s'est réalisé avec succès alors initialiser la fonction nommée "valid" qui reçoit la valeur de la comparaison, ça sera un booléen
            if (valid) {
              //si "true" (résultat de la comparaison) alors rendre la page "page_user" avec l'objet "user" qui correspond au prénom de l'utilisateur
                res.render('pages/page_user', { user: result[0].firstname });
            } else {
              //sinon "coderr" = 15 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr"
                coderr = 0b1111;
                res.render('pages/acces_denied', { coderr: coderr });
            }
        });
    });
});//Route servant à l'authentification

router.get('/signup', function(req, res, next) {
  res.render('pages/signup');
});//Route servant à l'accès de la page "signup"

router.post('/signup', function(req, res, next) {
  let coderr = 0b0000;
  // Initialisation d'un code erreur avec la valeur 0 
  let data = req.body;
  //Initialisation de la variable "data" qui va contenir les informations du formulaire
  const age = parseInt(data.age);
  //Initialisation de la constante "age" qui correspond aux chiffres de la variable "data.age"
  if (age < 18) {
    //Si l'age est inférieur à 18 alors "coderr" = 1 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr" 
    coderr = 0b0001;
    res.render('pages/acces_denied', { coderr: coderr });
  }
  connection.query('SELECT email FROM users', (err, result, fields) => {
    //Import de la colonne "email" de la table "user"
    let verifemail = 0
    //Initialisation de la variable "verifemail" pour vérifier si "data.emai"l est une adresse mail
    for (let i= 0; i<data.email.length; i++){
      //Pour chaque caractère de "data.email", si le caractère correspond à "@" incrémenter "vérifemail" de 1
        if (data.email[i]==="@"){
            verifemail += 1
        }
    }
    if (verifemail !== 1){
      //Si "verifemail" n'est pas strictement égal à 1 alors "coderr" = 2 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr"
        coderr = 0b0010;
        res.render('pages/acces_denied', { coderr: coderr });
    }
    for (let i = 0; i < result.length; i++) {
      //Pour chaque email de la table "user"... 
      if (result[i].email == data.email) {
        //si "data.email" correspond à l'email de la table alors "coderr" = 2 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr"
        coderr = 0b0010;
        res.render('pages/acces_denied', { coderr: coderr });
      };
    };
  });
  if (data.pswd.length < 8) {
    //si le mot de passe du formulaire contient moins de 8 caractères alors "coderr" = 8 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr"
    coderr = 0b1000;
    res.render('pages/acces_denied', { coderr: coderr });
  }else if (data.pswd.length > 20) {
    //Sinon si le mot de passe du formulaire contient plus de 20 caractères alors "coderr" = 8 et rendre la page "acces_denied" avec l'objet "coderr" qui correspond à "coderr"
    coderr = 0b1000;
    res.render('pages/acces_denied', { coderr: coderr });
  }else {
    //sinon...
    bcrypt.hash(data.pswd, 10)
    //utiliser l'algorithme "bcrypt 10 fois sur le mot de passe afin de créer un hash
      .then(hash => {
        //si le hash a été realisé avec succès alors initialiser la fonction nommée "hash" qui reçoit le résultat du hash.
        data.pswd = hash
        //réattribution de la variable "data.pswd", son contenu devient le résultat du hash
        if (coderr !== 0b0000) {
          //Si "coderr" n'est pas strictement égal à 0 alors rendre la "page acces_denied" avec l'objet "coderr" qui correspond à "coderr"
          res.render('pages/acces_denied', { coderr: coderr });
        } else {
          //sinon insérer les données dans la table "users", récupérer le prénom de l'utilisateur et rendre la page "page_user" avec l'objet user qui correspond au prénom de l'utilisateur
            connection.query(`INSERT INTO users (id, email, age, lastname, firstname, password) VALUES (NULL, '${data.email}', '${data.age}', '${data.lastname}', '${data.firstname}', '${data.pswd}');`)
            connection.query(`SELECT * FROM users WHERE users.firstname = '${data.firstname}'`, (err, result, fields) => {
            res.render('pages/page_user', { user: result[0].firstname });
            });
            
        }
      })
  }
});//Route servant à la création d'un compte

router.get('/ownpage', function(req, res, next) {//en cours de création
  res.render('pages/ownpage');
});

export default router;//export des routes 