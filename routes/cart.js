import express from 'express';
import mysql from 'mysql2';
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password:'root',
    database: 'mydatabase'
      
  });
  
router.get('/',function(req,res){
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
    res.render('pages/panier', {panier: result})
})
});//accès à la page panier et met à disposition la table `panier` de la BDD à l'aide de la variable "panier" 

router.post('/', function (req,res,next){
    let data = req.body;
    connection.query(`DELETE FROM panier WHERE panier.id = '${data.id}';`)
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
        res.render('pages/panier', {panier: result})
    })
})//Action après une requete post vers 'panier' -> supprime l'article selectionner et retourne sur la page panier

router.get('/purgeOK', function(req,res,next){
    connection.query('DELETE FROM `panier`');
    res.render('pages/purgeOK')
});//requete de purge de la table `panier` et redirection vers la page "purgeOK"



export default router;