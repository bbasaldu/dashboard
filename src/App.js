import LineChart from './components/LineChart';
import QuadStats from './components/QuadStats';
import Layout from './layouts/Layout'
function App() {
  
  return (
    <Layout>
      <LineChart/>
      <QuadStats/>
      <LineChart/>
    </Layout>
  );
}

export default App;
