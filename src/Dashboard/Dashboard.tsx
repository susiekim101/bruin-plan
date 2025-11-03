import TotalUnits from '../TotalUnits/TotalUnits.tsx'
import Sidebar from '../Sidebar/Sidebar.tsx'

function Dashboard () {
    return (
    <>
        <TotalUnits units={15} />
        <Sidebar />
    </>
    )
}

export default Dashboard