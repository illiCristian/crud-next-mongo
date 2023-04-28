import React, { useState } from "react";
import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

export default function New() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Al momento de validar si no hay un titulo o una descripcion vamos a setear esos errores en el state
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    await saveTask();
  };
  const handleChange = async (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
    console.log(newTask);
  };

  const saveTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1> Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              error={errors.title ? { content: errors.title } : null}
            />
            <FormTextArea
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              error={
                errors.description ? { content: errors.description } : null
              }
            />
            <Button primary>Save</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
