const express=require('express');
require('dotenv').config();
const sequelize=require('./models'); 
const userRoutes=require('./User/userRoutes');

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app=express(); 

app.use(express.json()); 


app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use('/api',userRoutes); 
const PORT=process.env.PORT || 3000;
 

(async()=>{
    try {
        await sequelize.authenticate(); 
        await sequelize.sync(); 
        console.log("DB connected");
        
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
            
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();



