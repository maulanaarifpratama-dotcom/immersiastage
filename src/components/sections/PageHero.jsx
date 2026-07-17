export default function PageHero({ label, title, className }) {
  return (
    <header className={className || "pagehero"}>
      <div className="wrap">
        <small>{label}</small>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
