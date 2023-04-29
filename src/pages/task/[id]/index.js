import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Confirm, Grid, GridColumn, GridRow } from "semantic-ui-react";

const TaskDetail = ({ task, error }) => {
  const { query, push } = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);
  const deleteTask = async () => {
    //Destructuramos el id del query para despues hacer una peticion "DELETE" y asi eliminar la tarea
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };
  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask();
    close();
    push("/");
  };
  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title="Task not found" />;
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={1}
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </GridColumn>
      </GridRow>
      <Confirm
        header="Borrar tarea?"
        content="Desea borrar la tarea"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      ></Confirm>
    </Grid>
  );
};

export default TaskDetail;

//del context destructuramos el query, y del query extraemos el id
export async function getServerSideProps({ query: { id } }) {
  console.log(id);
  const res = await fetch(`http://localhost:3000/api/task/${id}
  `);
  //Consulta la tarea, y si esta tarea existe la convertimos a json
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }
  return {
    props: {
      error: {
        statusCode: 404,
        message: "Task not found",
      },
    },
  };
}
