import TotalUnits from './components/TotalUnits/TotalUnits.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'

function Dashboard () {
    return (
    <>
        <TotalUnits units={15} />
        <Sidebar />
    </>
    )
}

export default Dashboard