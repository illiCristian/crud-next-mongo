import { dbConnect } from "@/utils/mongoose";
import Task from "@/models/Task";
//request query, para capturar el id dinamico
dbConnect();
export default async (req, res) => {
  //Destructuro el method, body y de query el id que viene en la url
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(400).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json(error, { msg: "Error" });
      }

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, {
          //Con esto le digo a mongo que despues de actualizar me devuelva el objeto actualizado
          new: true,
        });
        if (!task) return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json(error, { msg: "Error" });
      }
      break;
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(400).json({ msg: "Task not found" });
        return res.status(200).json(deletedTask);
      } catch (error) {
        return res.status(500).json(error, { msg: "Error" });
      }
    default:
      return res.status(400).jso({ msg: "Error" });
  }
};
