import Sidebar from "./Sidebar"
import Table from "./Table"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-900">
            {/*Project Table*/}
            <Table />
        </div>
    </div>
  )
}

export default Dashboard