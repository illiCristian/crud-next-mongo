import { dbConnect } from "@/utils/mongoose";
import Task from "@/models/Task";
//Cuando visitamos /api/task se va ejecuta la funcion que conecta a la base de datos
dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  //req nos da informacion de la peticion
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        //Creo el objeto para despues guardarlo en la base de datos
        const newTask = new Task(body);
        //lo guardo en la base de datos
        const savedTask = await newTask.save();
        return res.status(201).json({ savedTask, mesagge: "Saved Task" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ error: "Method not allowed" });
  }
}
