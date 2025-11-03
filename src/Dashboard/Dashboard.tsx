import Sidebar from './components/Sidebar/Sidebar.tsx'
import Header from './Header/Header.tsx'
function Dashboard () {
    return (
    <div className="w-full h-screen flex">
        <div className="w-full">
            <Header year={1}/>
        </div>
        
        <div>
            <Sidebar /> 
        </div>
    </div>
    )
}

export default Dashboard