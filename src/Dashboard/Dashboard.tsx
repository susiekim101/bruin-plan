import Sidebar from './components/Sidebar/Sidebar.tsx'
import Header from './Header/Header.tsx'
import Quarters from './Quarters/Quarters.tsx'

function Dashboard () {
    return (
    <div className="w-full h-screen flex">
        <div className="w-full">
            <Header/>
            <div className="flex flex-row ">
                <Quarters />
                <Quarters />
                <Quarters />
                <Quarters />
            </div>
        </div>
        <div>
            <Sidebar /> 
        </div>
    </div>
    )
}

export default Dashboard