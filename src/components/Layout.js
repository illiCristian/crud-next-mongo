import NavBar from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
//Nuestro layout va a renderizar el compoente que le pasemos y los children son  los componentes hijos de nuestro layout