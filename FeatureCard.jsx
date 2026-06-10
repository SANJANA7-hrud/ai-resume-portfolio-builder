export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="text-slate-200 mt-2">
        {description}
      </p>
    </div>
  );
}