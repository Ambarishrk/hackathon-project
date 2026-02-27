
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-xl">MyApp</a>
        <div>
          <a href="/" className="px-3 hover:text-gray-300">Home</a>
          <a href="/profile" className="px-3 hover:text-gray-300">Profile</a>
          <a href="/login" className="px-3 hover:text-gray-300">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;