import "./App.css";
import Portal from "./components/Portal";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ui/theme'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Portal />
      </div>
    </ThemeProvider>

  );
}

export default App;
