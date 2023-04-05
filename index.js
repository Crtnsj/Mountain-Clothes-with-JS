import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import cartRouter from './routes/cart.js';//import du routeur "cart" depuis "cart.js"
import userRouter from './routes/user.js';//import du routeur "user" depuis "user"

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

app.use('/cart', cartRouter);//pour toutes les routes "/cart" utiliser "cartRouter"
app.use('/user', userRouter);//pour toutes les routes "/user" utiliser "userRouter"

app.get('/', function(req, res){
    connection.query('SELECT * FROM orders',(err, result, fields) => {
      //Récupère la table "orders" et rends la page "index" avec l'objet "product" qui correspond au résultat de la requête
        res.render('pages/index', {products: result})
    })
});//Route servant à l'affichage de l'index

app.post('/', function(req, res, next){
  let data = req.body;
  //Initialisation de la variable "data" qui va contenir les informations du formulaire
  connection.query(`INSERT INTO panier (id, idProduct, nameProduct, price) VALUES (NULL, '${data.idProduct}', '${data.nameProduct}', '${data.price}');`,(err, result, fields) => {});
  //Insertion de l'article selectionné dans la table "panier" avec les informations du formulaire
  connection.query('SELECT * FROM orders',(err, result, fields) => {
    //Récupère la table "orders" et rends la page "index" avec l'objet "product" qui correspond au résultat de la requête
      res.render('pages/index', {products: result})
  }) 
});//Route servant à l'ajout des articles au panier

app.listen(3000);//définition du port d'écoute