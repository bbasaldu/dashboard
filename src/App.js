import { useDispatch } from 'react-redux';
import classes from './App.module.css'
import Main from './components/main/Main'
import SideBar from './components/sidebar/SideBar'
import { resizeActions } from './store/resizeSlice';
import useMediaQuery from './hooks/useMediaQuery'
function App() {
  const dispatch = useDispatch()
  window.onresize = () => {
    dispatch(resizeActions.setResized(true))
    dispatch(resizeActions.setResized(false))
  }
  
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <div className={classes.App}>
      <div className={classes.layout}>
        {!matches && <SideBar/>}
        <Main/>
      </div>
    </div>
  );
}

export default App;
