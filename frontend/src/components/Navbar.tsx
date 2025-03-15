import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-2 py-2 bg-slate-950 shadow-emerald-900 shadow-lg mb-12">
      <div className="flex items-center justify-center gap-2">
        <img src={logo} alt="Kabootar_logo" className="w-10 h-10 rounded-xl" />
        <div className="flex items-center gap-0 justify-center">
          <h2 className="font-bold text-3xl animate-bounce">K</h2>
          <h2 className="font-bold text-xl">ab</h2>
          👀
          <h2 className="font-bold text-xl">tar</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
