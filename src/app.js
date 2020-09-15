const express = require('express');
const bodyParser = require('body-parser');

const AdminUserRoutes = require('./routes/AdminUserRoutes');
const AndressRoutes = require('./routes/AndressRoutes');
const UserImageRoutes = require('./routes/UserImageRoutes');
const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const ProductImageRoutes = require('./routes/ProductImageRoutes');

require('./database/connection');

const app = express();
const Port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/admin", AdminUserRoutes);
app.use("/andress", AndressRoutes);
app.use("/image", UserImageRoutes);
app.use("/", UserRoutes);
app.use("/", CategoryRoutes);
app.use("/", ProductRoutes);
app.use("/", ProductImageRoutes);

app.listen(Port, ()=>{
    console.log(`Aplicação rodando na porta ${Port}`);
})