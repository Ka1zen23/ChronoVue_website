import { useContext } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { RouterContext, RouterProvider } from './router';
import { installMockFetch, makePatients } from './mockApi';
import { flagDischargeCandidates } from '../utils/dischargeHeuristic';
import Sidebar from '../components/Sidebar';
import CommandCentrePage from '../components/CommandCentrePage';
import BedManagementPage from '../components/BedManagementPage';
import PatientManagementPage from '../components/PatientManagementPage';
import CensusPage from '../components/CensusPage';
import CscCensusPage from '../components/CscCensusPage';
import WardCensusPage from '../components/WardCensusPage';
import DischargeWorkflowPage from '../components/DischargeWorkflowPage';

installMockFetch();

const DISCHARGE_PATIENTS = flagDischargeCandidates(makePatients());

function PageRouter() {
  const { currentPath } = useContext(RouterContext);

  if (currentPath === '/' || currentPath === '/command-centre') return <CommandCentrePage />;
  if (currentPath === '/bed-management') return <BedManagementPage />;
  if (currentPath === '/patients') return <PatientManagementPage />;
  if (currentPath === '/ward-census') return <WardCensusPage />;
  if (currentPath === '/csc-census') return <CscCensusPage />;
  if (currentPath === '/discharge-workflow') return <DischargeWorkflowPage patients={DISCHARGE_PATIENTS} />;

  // Stub pages
  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container">
        <p className="section-label">FLOW Demo</p>
        <h1 className="mt-3 text-2xl font-semibold text-[#1F2937]">Coming soon</h1>
        <p className="mt-2 text-sm text-[#94A3B8]">This section is not included in the demo.</p>
      </div>
    </main>
  );
}

export default function DemoApp() {
  return (
    <AuthProvider>
      <RouterProvider initialPath="/">
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans">
          <Sidebar />
          <div className="ml-16 flex-1 overflow-y-auto">
            <PageRouter />
          </div>
        </div>
      </RouterProvider>
    </AuthProvider>
  );
}
