import Canvas from "./canvas/index";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";

function App() {
  return (
    <main className="app transition-all ease-in overflow-hidden">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}

export default App;
