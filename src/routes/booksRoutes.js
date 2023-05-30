const {Router} = require('express');
const bookRouter = Router()

bookRouter.get('/',(req,res)=>{
    res.send('estan funcionando las rutas')
})

module.exports = bookRouter