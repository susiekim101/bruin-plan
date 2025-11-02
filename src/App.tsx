import './App.css'
import TotalUnits from './TotalUnits/TotalUnits'
import Sidebar from './Sidebar/Sidebar'
//import Share from './Share/Share'

function App() {

  return (
    <>
      <TotalUnits units={10} />
      <Sidebar />
      {/* <Share />*/}
    </>
  )
}

export default App
