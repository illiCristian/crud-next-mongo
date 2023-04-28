import { Schema, model, models } from "mongoose";
//Creo un esquema de datos para guardar en la base de datos
const taskSchema = new Schema(
  { //defino los campos que voy a guardar y los tipo de datos, si son requeridos o no
    title: {
      type: String,
      requered: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Title must be less than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [200, "Description must be less than 500 characters"],
    },
  },
  {
    timestamps: true, //al titulo de la descripcion le agrega la fecha de creacion y actualizacion
    versionKey: false, //no agrega la version
  }
);
//Si el modelo de tareas fue creado utilizalo, caso contrario crea un modelo nuevo de tareas
export default models.Task || model("Task", taskSchema);