import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "semantic-ui-react";

export default function Home({ data }) {
  //Destructuramos los datos que vienen de props { data } y los podemos usar en el front

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {data.map((task) => (
          <Card key={task._id}>
            <CardContent>
              <CardHeader>{task.title}</CardHeader>
              <p>{task.description}</p>
            </CardContent>
            <CardContent extra>
              <Button primary>View</Button>
              <Button primary>Edit</Button>
            </CardContent>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

//Primero se ejecuta la funcion getServerSideProps y despues se ejecuta el componente Home
//getServerSideProps solo se ejecuta en el lado del servidor
export const getServerSideProps = async (context) => {
  //Hacemos un fetch a nuestro backend y obtenemos los datos
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
// En resumen primero pasamos por el backend, pido los datos y esos datos los envio al front como props
