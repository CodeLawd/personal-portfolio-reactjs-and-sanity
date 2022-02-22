import {
  About,
  Footer,
  Header,
  Skills,
  Testimonial,
  Work,
  Articles,
} from "./containers";

import { Navbar } from "./components";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Articles />
      <Footer />
    </div>
  );
};

export default App;
