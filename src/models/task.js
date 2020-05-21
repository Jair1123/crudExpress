const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Este es un nuevo esquema almacenado en una constante llamado TaskSchema
const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        // Aqui  lo que hago es hacer que por defecto el status de una nueva tarea sea falso
        type: Boolean,
        default: false
    }
});

//Para poder utilizarlo necesitamos pasarlo a un metodo de mongoose llamado model que funciona .model('Nombre del esquema ',llamamos al esquema que hicimos)
module.exports = mongoose.model('tasks',TaskSchema);
