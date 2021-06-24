import React from 'react';
import logo from './logo.svg';
import './App.css';

const { exec } = window.require('child_process');

const App = () => {
  const [shellResponse, setShellResponse] = React.useState([]);

  React.useEffect(() => {
    const runCommand = () => {
      exec("docker images --format \"{{json .}}\"", (error, stdout, stderr) => {
        if (error) {
          setShellResponse(error.message);
        }
        if (stderr) {
          setShellResponse(stderr);
        }

        setShellResponse(() => {
          let array = stdout.split("\n");
          let aux = array.filter(element => { if (element !== "") return element });
          return [aux[0]];
        });
      });
    };

    runCommand();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {shellResponse.map((response) => (
        <p key={response}>
          {response}
        </p>
      ))}
    </div>
  );
}

export default App;
