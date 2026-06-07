import { useState } from 'react';
import { NavLink } from '../demo/router';
import { useAuth } from '../context/AuthContext';
import { canAccessPage } from '../utils/roleAccess';

const superAdminSections = [
  {
    title: 'Core',
    items: [
      { label: 'Command Centre', to: '/', icon: DashboardIcon },
      { label: 'Patients', to: '/patients', icon: PatientsIcon }
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'Bed Management', to: '/bed-management', icon: BedManagementIcon },
      { label: 'Ward Census', to: '/ward-census', icon: AnalyticsIcon },
      { label: 'CSC Census', to: '/csc-census', icon: AnalyticsIcon },
      { label: 'Discharge Workflow', to: '/discharge-workflow', icon: WorkflowIcon }
    ]
  }
];

const roleSections = {
  admin: superAdminSections,
  user: [
    {
      title: 'Core',
      items: [
        { label: 'Command Centre', to: '/', icon: DashboardIcon }
      ]
    },
    {
      title: 'Operations',
      items: [
        { label: 'Bed Management', to: '/bed-management', icon: BedManagementIcon },
        { label: 'Ward Census', to: '/ward-census', icon: AnalyticsIcon },
        { label: 'Discharge Workflow', to: '/discharge-workflow', icon: WorkflowIcon }
      ]
    }
  ]
};

function formatRoleLabel(role = '') {
  return role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getUserInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('') || 'RC';
}

function getSectionsForRole(role) {
  const sections = role === 'super_admin' ? superAdminSections : (roleSections[role] ?? roleSections.user);
  return sections
    .map((section) => ({ ...section, items: section.items.filter((item) => canAccessPage(role, item.to)) }))
    .filter((section) => section.items.length > 0);
}

function SidebarText({ open, children }) {
  return (
    <span className={['overflow-hidden whitespace-nowrap transition-all duration-200', open ? 'ml-3 max-w-[10rem] opacity-100' : 'ml-0 max-w-0 opacity-0'].join(' ')}>
      {children}
    </span>
  );
}

function Sidebar() {
  const { user } = useAuth();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;
  const isSuperAdmin = user?.role === 'super_admin';
  const sidebarSubtitle = isSuperAdmin ? 'Super Admin' : formatRoleLabel(user?.role ?? 'user');
  const sections = getSectionsForRole(user?.role);

  return (
    <aside
      className={['fixed inset-y-0 left-0 z-30 flex h-screen flex-col overflow-hidden border-r border-[#E5E7EB] bg-[#F8FAFC] px-1.5 py-2 transition-all duration-200', open ? 'w-56 shadow-[0_20px_45px_rgba(15,23,42,0.08)]' : 'w-16'].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div>
          <div className={['flex items-center rounded-xl border border-[#E5E7EB] bg-white/90 px-2 py-2 transition-all duration-200', open ? 'justify-start' : 'justify-center'].join(' ')}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#1F2937] text-sm font-semibold text-white">
              CV
            </div>
            <div className={['overflow-hidden transition-all duration-200', open ? 'ml-3 max-w-[7rem] opacity-100' : 'ml-0 max-w-0 opacity-0'].join(' ')}>
              <p className="whitespace-nowrap text-sm font-semibold text-[#1F2937]">FLOW</p>
              <p className="whitespace-nowrap text-xs text-[#94A3B8]">{sidebarSubtitle}</p>
            </div>
            {open && (
              <button
                type="button"
                onClick={() => setPinned((p) => !p)}
                aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar open'}
                aria-pressed={pinned}
                className="ml-auto rounded-md p-1 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#1F2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#475569] focus-visible:ring-offset-1"
              >
                <ChevronIcon pinned={pinned} className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto pr-1" aria-label="Main navigation">
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div key={section.title} className={['space-y-1.5', index > 0 ? 'border-t border-[#E5E7EB] pt-3' : ''].join(' ')}>
                <p className={['overflow-hidden px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#94A3B8] transition-all duration-200', open ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'].join(' ')}>
                  {section.title}
                </p>
                {section.items.map(({ icon: Icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    title={label}
                    className={({ isActive }) => [
                      'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#475569] focus-visible:ring-offset-1',
                      open ? 'justify-start' : 'justify-center',
                      isActive ? 'bg-[#E2E8F0] text-[#1F2937]' : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]'
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <SidebarText open={open}>{label}</SidebarText>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="mt-4 border-t border-[#E5E7EB] pt-3">
          <div className={['flex items-center rounded-xl border border-[#E5E7EB] bg-white px-2 py-2 transition-all duration-200', open ? 'justify-start' : 'justify-center'].join(' ')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-xs font-semibold tracking-[0.08em] text-[#334155]">
              {getUserInitials(user?.name)}
            </div>
            <div className={['overflow-hidden transition-all duration-200', open ? 'ml-3 max-w-[8.75rem] opacity-100' : 'ml-0 max-w-0 opacity-0'].join(' ')}>
              <p className="whitespace-nowrap text-sm font-semibold text-[#1F2937]">{user?.name ?? 'Demo User'}</p>
              <p className="whitespace-nowrap text-xs text-[#94A3B8]">{sidebarSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { window.location.href = '/'; }}
            title="Back to site"
            className={['mt-2 flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#475569] transition duration-200 hover:bg-[#F1F5F9] hover:text-[#1F2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#475569] focus-visible:ring-offset-1', open ? 'justify-start' : 'justify-center'].join(' ')}
          >
            <LogoutIcon className="h-5 w-5 shrink-0" />
            <SidebarText open={open}>Back to site</SidebarText>
          </button>
        </div>
      </div>
    </aside>
  );
}

function ChevronIcon({ pinned, className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {pinned
        ? <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function DashboardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="4" rx="1.5" />
      <rect x="13" y="10" width="7" height="10" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function AnalyticsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 18L9 12l4 3 7-8" /><path d="M4 20h16" />
    </svg>
  );
}
function PatientsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M16 19a4 4 0 0 0-8 0" /><circle cx="12" cy="9" r="3" />
      <path d="M20 19a3 3 0 0 0-3-3" /><path d="M4 19a3 3 0 0 1 3-3" />
    </svg>
  );
}
function BedManagementIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 12h16v5H4z" /><path d="M6 12V8.5A1.5 1.5 0 0 1 7.5 7h3A1.5 1.5 0 0 1 12 8.5V12" />
      <path d="M4 17v3" /><path d="M20 17v3" />
    </svg>
  );
}
function WorkflowIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M5 6h6v4H5z" /><path d="M13 14h6v4h-6z" /><path d="M8 10v4h8" />
    </svg>
  );
}
function LogoutIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M10 17l5-5-5-5" /><path d="M15 12H4" />
      <path d="M20 19v-2a2 2 0 0 0-2-2h-1" /><path d="M20 5v2a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}

export default Sidebar;
