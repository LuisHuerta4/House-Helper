import { Hero, Footer, AllCategories, Subscribe, HowItWorks } from "./sections";
import Nav from "./components/Nav";
const App = () => (
  <main className="relative">
    <Nav/>
    <section className="xl:padding-l wide:padding-r padding-b">
      <Hero/>
    </section>
    <section className="padding">
      <HowItWorks/>
    </section> 
    <section className="padding">
      <AllCategories/>
    </section>
    <section className="padding-x sm:py-32 py-16 w-full">
      <Subscribe/>
    </section>
    <section className="bg-black padding-x padding-t pb-8">
      <Footer/>
    </section>
  </main>
);

export default App;