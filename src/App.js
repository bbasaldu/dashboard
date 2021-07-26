import { useDispatch } from 'react-redux';
import classes from './App.module.css'
import Main from './components/main/Main'
import SideBar from './components/sidebar/SideBar'
import { resizeActions } from './store/resizeSlice';

function App() {
  const dispatch = useDispatch()
  window.onresize = () => {
    dispatch(resizeActions.setResized(true))
    dispatch(resizeActions.setResized(false))
  }
  
  
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
