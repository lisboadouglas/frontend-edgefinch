import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Hero from "./components/Hero";
function App() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <Header />
            <Hero />
            <Form />
            <Footer />
        </div>
    );
}

export default App;