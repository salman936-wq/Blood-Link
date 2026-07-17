// Signature element: a heartbeat / vital-line motif that recurs across the site,
// literal to the subject (blood, pulse, vitals) rather than a generic gradient blob.
export default function PulseDivider({ className = "" }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" className="w-full h-16 vital-line" preserveAspectRatio="none">
        <path
          d="M0 40 L280 40 L320 10 L360 70 L400 40 L440 40 L460 20 L480 40 L1200 40"
          fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="animate-pulseline"
        />
      </svg>
    </div>
  );
}
