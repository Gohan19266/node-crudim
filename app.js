const express = require('express');
const mysql = require('mysql');
const upload = require('./libs/storage');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 3050;

const app = express()

app.use(bodyParser.json());
app.use('/public',express.static(`${__dirname}/storage/imgs`))


//Conenction 

var connection = mysql.createConnection({
  host     : 'birvxmqrxnbzpdvm0ogz-mysql.services.clever-cloud.com',
  user     : 'uysv9t18xsovpgmn',
  password : 'lqXoWZythDxqtkIJbcOp',
  database : 'birvxmqrxnbzpdvm0ogz'
});
 

//Route

app.get('/',(req,res)=>{
    res.send('Welcome to my API!');
});

//All customers
app.get('/read',(req,res)=>{
    const sql = 'SELECT * FROM imagen';
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else {
            res.send('Not results')
        }
    });
    
});


app.post('/add',upload.single('image'),(req,res)=>{
    const sql = 'INSERT INTO imagen SET ?';

    const imagenObj = {
        url: req.file.path,
        idproducto: req.body.idproducto
    }
connection.query(sql, imagenObj,error => {
    if(error) throw error;
    res.send('Imagen creada')
})
    
});

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    const {url,idproducto} = req.body;
    const sql = `UPDATE imagen SET url = '${url}' , idproducto = '${idproducto}' where idimagen='${id}'`;
    connection.query(sql,error => {
        if(error) throw error;
        res.send('Imagen updated')
    })
});

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM imagen where idimagen = ${id}`;
     connection.query(sql,error => {
        if(error) throw error;
        res.send('Imagen deleted')
    })
});

app.get('/read/:id',(req,res)=>{
const {id} = req.params
const sql = `SELECT * FROM imagen WHERE idimagen = ${id}`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else {
            res.send('Not results')
        }
    });
});

//Connection if
connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
})


app.use(morgan('dev'));
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));


