import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieTableCombo from './components/PieTableCombo';
import QuadStats from './components/QuadStats';
import Table from './components/Table';
import Layout from './layouts/Layout'
function App() {
  
  return (
    <Layout>
      <LineChart/>
      <QuadStats/>
      <PieTableCombo/>
      <Table title="Example Table"/>
      <BarChart/>
    </Layout>
  );
}

export default App;
