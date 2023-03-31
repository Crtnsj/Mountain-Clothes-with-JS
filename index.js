import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password:'root',
    database: 'mydatabase'
    
});//création d'une constante pour la connexion à la base de donné

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    connection.query('SELECT * FROM orders',(err, result, fields) => {
        res.render('pages/index', {products: result})
    })

});//Récupération des données de la table orders pour les proposer à l'index à l'aide de la variable "products"

app.get('/connexion', function(req, res){
        res.render('pages/connexion')
});//accès à la page connexion

app.get('/panier',function(req,res){
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
    res.render('pages/panier', {panier: result})
})
});//accès à la page panier et met à disposition la table `panier` de la BDD à l'aide de la variable "panier" 

app.post('/', function(req, res, next){
    let data = req.body;
    connection.query(`INSERT INTO panier (id, idProduct, nameProduct, price) VALUES (NULL, '${data.idProduct}', '${data.nameProduct}', '${data.price}');`,(err, result, fields) => {});
    connection.query('SELECT * FROM orders',(err, result, fields) => {   
        res.render('pages/index', {products: result})
    }) 
});//Insertion des données de l'article dans la table `panier` et redirection vers la page d'accueil avec mise a disposition
//la table 'orders' afin de rafficher les cartes articles

app.post('/panier', function (req,res,next){
    let data = req.body;
    connection.query(`DELETE FROM panier WHERE panier.id = '${data.id}';`)
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
        res.render('pages/panier', {panier: result})
    })
})//Action après une requete post vers 'panier' -> supprime l'article selectionner et retourne sur la page panier

app.get('/purgeOK', function(req,res,next){
    connection.query('DELETE FROM `panier`');
    res.render('pages/purgeOK')
});//requete de purge de la table `panier` et redirection vers la page "purgeOK"

app.get('/create_account', function(req,res,next){
    res.render('pages/create_account');
});

app.post('/page_user', function(req,res,next){
    let data = req.body;
    console.log(data);
    res.render('/page_user')
})


app.listen(3000);//définition du port d'écoute 