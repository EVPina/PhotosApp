export function Spinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}