import LineChart from './components/LineChart';
import QuadStats from './components/QuadStats';
import Table from './components/Table';
import Layout from './layouts/Layout'
function App() {
  
  return (
    <Layout>
      <LineChart/>
      <QuadStats/>
      <Table title="Example Table"/>
    </Layout>
  );
}

export default App;
