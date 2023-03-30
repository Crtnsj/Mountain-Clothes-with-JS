import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password:'root',
    database: 'mydatabase'
    
})

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    connection.query('SELECT * FROM orders',(err, result, fields) => {
        // console.log(result)
        res.render('pages/index', {products: result})
    })

});

app.get('/connexion', function(req, res){
        res.render('pages/connexion')
});

app.get('/panier',function(req,res){
    connection.query('SELECT * FROM panier',(err,result,fields)=>{
    res.render('pages/panier', {panier: result})
})
})

app.post('/', function(req, res, next){
    let data = req.body;
    connection.query(`INSERT INTO panier (id, idProduct, nameProduct, price) VALUES (NULL, '${data.idProduct}', '${data.nameProduct}', '${data.price}');`,(err, result, fields) => {});
    connection.query('SELECT * FROM orders',(err, result, fields) => {   
        res.render('pages/index', {products: result})
    })

    
});





app.listen(3000);