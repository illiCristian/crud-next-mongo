import "semantic-ui-css/semantic.min.css";
import "@/styles/globals.css";
import { Layout } from "@/components/Layout";
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
//Envolvemos nuestra aplicación en un componente Layout que contiene el header y el footer.