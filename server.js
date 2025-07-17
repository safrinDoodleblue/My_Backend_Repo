const express=require('express');
require('dotenv').config();
const sequelize=require('./models'); 
const userRoutes=require('./User/userRoutes');

const app=express(); 

app.use(express.json()); 


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



