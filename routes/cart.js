import express from 'express';
import mysql from 'mysql2';

const router = express.Router();//Création d'un nouvel objet routeur

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password:'root',
    database: 'mydatabase'    
});//Connexion à la database

router.get('/',function(req,res){
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
    //Récupère les données de la table "panier" et rends la page "panier" avec l'objet panier qui correspond au résultat de la requête
    res.render('pages/panier', {panier: result})
    })
});//Route servant à l'accès au panier

router.post('/', function (req,res,next){
    let data = req.body;
    //Initialisation de la variable "data" qui va contenir les informations du formulaire
    connection.query(`DELETE FROM panier WHERE panier.id = '${data.id}';`)
    //Supprime l'article qui correspond à l'id du formulaire 
    connection.query('SELECT * FROM panier',(err,result,fields)=>{//
    //Récupère les données de la table "panier" et rends la page "panier" avec l'objet panier qui correspond au résultat de la requête  
        res.render('pages/panier', {panier: result})
    })
});//Route servant à l'accès au panier avec les requêtes "post" de la suppresion d'un article

router.get('/purgeOK', function(req,res,next){
    connection.query('DELETE FROM `panier`');
    //Supprime tout dans la table "panier" et rends la page "purgeOK"
    res.render('pages/purgeOK')
});//Route servant à la redirection vers la page "purgeOK"

export default router;//export des routes