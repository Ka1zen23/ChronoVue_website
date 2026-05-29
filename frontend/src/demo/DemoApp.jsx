import { useContext } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { RouterContext, RouterProvider } from './router';
import { installMockFetch } from './mockApi';
import Sidebar from '../components/Sidebar';
import CommandCentrePage from '../components/CommandCentrePage';
import BedManagementPage from '../components/BedManagementPage';
import PatientManagementPage from '../components/PatientManagementPage';
import CensusPage from '../components/CensusPage';
import CscCensusPage from '../components/CscCensusPage';
import WardCensusPage from '../components/WardCensusPage';
import DischargeWorkflowPage from '../components/DischargeWorkflowPage';

installMockFetch();

const DISCHARGE_PATIENTS = [
  { id: 'PT-0023', diagnosis: 'COPD exacerbation', ward: 'AMU', los: 7, expected: 'Today', assignedBed: 'AMU-B05', delay: '', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: true }, { key: 'pharmacy', completed: true }, { key: 'transportLogistics', completed: true }] },
  { id: 'PT-0044', diagnosis: 'Cellulitis', ward: 'AMU', los: 6, expected: 'Today', assignedBed: 'AMU-B11', delay: 'Awaiting transport', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: true }, { key: 'pharmacy', completed: true }, { key: 'transportLogistics', completed: false }] },
  { id: 'PT-0058', diagnosis: 'Electrolyte imbalance', ward: 'AMU', los: 3, expected: 'Today', assignedBed: 'AMU-B15', delay: '', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: true }, { key: 'pharmacy', completed: false }, { key: 'transportLogistics', completed: false }] },
  { id: 'PT-0061', diagnosis: 'Post-appendicectomy', ward: 'Surgical Ward', los: 2, expected: 'Today', assignedBed: 'SURG-B01', delay: '', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: true }, { key: 'pharmacy', completed: true }, { key: 'transportLogistics', completed: true }] },
  { id: 'PT-0064', diagnosis: 'Hernia repair', ward: 'Surgical Ward', los: 1, expected: 'Tomorrow', assignedBed: 'SURG-B04', delay: 'Pharmacy delay', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: true }, { key: 'pharmacy', completed: false }, { key: 'transportLogistics', completed: false }] },
  { id: 'PT-0091', diagnosis: 'Post-C-section', ward: 'O&G Ward', los: 2, expected: 'Tomorrow', assignedBed: 'OG-B01', delay: '', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: true }, { key: 'nurseClearance', completed: false }, { key: 'pharmacy', completed: false }, { key: 'transportLogistics', completed: false }] },
  { id: 'PT-0101', diagnosis: 'Febrile seizure', ward: 'Paediatrics', los: 1, expected: 'Today', assignedBed: 'PAEDS-B01', delay: '', status: 'READY',
    dischargeWorkflow: [{ key: 'doctorClearance', completed: false }, { key: 'nurseClearance', completed: false }, { key: 'pharmacy', completed: false }, { key: 'transportLogistics', completed: false }] },
];

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
