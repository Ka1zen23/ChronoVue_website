import CommandCentre from '../pages/CommandCentre';

const SCALE = 0.9;

export default function DashboardPreview() {
  return (
    <div
      className="relative overflow-hidden rounded-t-2xl border border-white/[0.08] shadow-2xl shadow-black/50"
      style={{ height: '90vh' }}
    >
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
          width: `${(100 / SCALE).toFixed(2)}%`,
          height: '100vh',
        }}
      >
        <CommandCentre />
      </div>
    </div>
  );
}
