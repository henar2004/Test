import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

  function MulticolorText({ text }) {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    return (
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {text.split("").map((char, i) => (
          <span key={i} style={{ color: colors[i % colors.length] }}>
            {char}
          </span>
        ))}
      </p>
    );
  }

  function handleClick() {
    fetch("/api/hello")
      .then(r => r.json())
      .then(d => console.log("Respuesta serverless:", d));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>

        <div className="text-center mt-5">
          <MulticolorText text="Hola, React!" />

          <button
            className="btn btn-primary mt-3"
            onClick={handleClick}
          >
            Probar API
          </button>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
