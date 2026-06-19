import { useState } from "react";
import "./App.css";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div id="center">
        <h1>Welcome to React</h1>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
      <Footer />
    </>
  );
}

export default App;
