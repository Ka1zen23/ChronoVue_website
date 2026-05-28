export default function DashboardPreview() {
  return (
    <div
      className="rounded-t-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.08]"
      style={{ height: '88vh' }}
    >
      <iframe
        src="/command-centre"
        title="FLOW Command Centre Preview"
        scrolling="no"
        className="w-full h-full border-0 block"
      />
    </div>
  );
}
