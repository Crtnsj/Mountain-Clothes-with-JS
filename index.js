import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';

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

app.use('/cart', cartRouter);
app.use('/user', userRouter);

app.get('/', function(req, res){
    connection.query('SELECT * FROM orders',(err, result, fields) => {
        res.render('pages/index', {products: result})
    })

});//Récupération des données de la table orders pour les proposer à l'index à l'aide de la variable "products"

app.post('/', function(req, res, next){
  let data = req.body;
  connection.query(`INSERT INTO panier (id, idProduct, nameProduct, price) VALUES (NULL, '${data.idProduct}', '${data.nameProduct}', '${data.price}');`,(err, result, fields) => {});
  connection.query('SELECT * FROM orders',(err, result, fields) => {   
      res.render('pages/index', {products: result})
  }) 
});//Insertion des données de l'article dans la table `panier` et redirection vers la page d'accueil avec mise a disposition
//la table 'orders' afin de rafficher les cartes articles

app.listen(3000);//définition du port d'écou