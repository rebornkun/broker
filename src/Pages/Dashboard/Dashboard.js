import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './Dashboard.css'
import Deposit from './Pages/Deposit/Deposit';
import Overview from './Pages/Overview/Overview';
import Plans from './Pages/Plans/Plans';
import Settings from './Pages/Settings/Settings';
import Withdraw from './Pages/Withdraw/Withdraw';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <Topbar />
            <section>
                <Routes>
                    <Route index element={<Navigate to="overview" replace={true} />} />
                    <Route path="overview/*" element={<Overview />} />
                    <Route path="deposit/*" element={<Deposit />} />
                    <Route path="withdraw/*" element={<Withdraw />} />
                    <Route path="settings/*" element={<Settings />} />
                    <Route path="plans" element={<Plans />} />
                </Routes>
            </section>
        </div>
    );
}

export default Dashboard;