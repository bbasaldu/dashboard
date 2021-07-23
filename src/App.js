import classes from './App.module.css'
import Main from './components/main/Main'
import SideBar from './components/sidebar/SideBar'

function App() {
  
  return (
    <div className={classes.App}>
      <div className={classes.layout}>
        <SideBar/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
