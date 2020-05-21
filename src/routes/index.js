const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//Ya puedes usar los archivos de views pq lo configuramos en el app.js
router.get('/', async (req, res) => {
    const tasks = await Task.find(); //con esto mandamos a buscar a la base de datos
    // console.log(tasks) con esto vemos las tareas que han sido guardadas
    res.render('index', {
        tasks // == tasks:tasks
    });
})
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
})

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
})

router.post('/edit/:id',async(req,res) =>{
    const {id} = req.params;
    await Task.update({_id:id},req.body);
    res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
    // console.log(req.params) con esta funcion vemos el id 
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/');
})



module.exports = router;