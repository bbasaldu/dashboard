import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieTableCombo from './components/PieTableCombo';
import QuadStats from './components/QuadStats';
import TableCard from './components/TableCard';
import Layout from './layouts/Layout'
// TODO:
// Should've made chart components have a card version that includes Card component
// with an optional title, like "LineChartCard", and have another version like "LineChart"
// which is just the chart itself which fills some container 100%, this would've been more modular
// basically what i did for the PieChart component...
// but I'm too lazy to go back for now
// It's not a huge issue since for this project since I'm not using the charts as super deep sub components
// but it'd be better practice to do so
function App() {
  
  return (
    <Layout>
      <LineChart/>
      <QuadStats/>
      <PieTableCombo/>
      <TableCard/>
      <BarChart/>
    </Layout>
  );
}

export default App;
