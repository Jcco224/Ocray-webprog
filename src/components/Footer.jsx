import { Link } from 'react-router-dom';
 
function Footer() {
  return (
<footer className="mt-10 border-t-2 border-zinc-900 bg-zinc-100 px-4 py-8 sm:px-6 lg:px-8">
<div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
<div>
<h2 className="text-xl font-bold text-zinc-900">React Articles</h2>
<p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
            A simple article website that shares beginner-friendly lessons about React,
            components, routing, props, and other useful front-end topics.
</p>
</div>
 
        <div>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Quick Links
</p>
<div className="mt-3 flex flex-col gap-2 text-sm text-zinc-700">
<Link to="/" className="hover:underline">Home</Link>
<Link to="/about" className="hover:underline">About</Link>
<Link to="/articles" className="hover:underline">Articles</Link>
</div>
</div>
 
        <div>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Contact
</p>
<p className="mt-3 text-sm text-zinc-700">reactarticles@email.com</p>
<p className="mt-1 text-sm text-zinc-700">Manila, Philippines</p>
</div>
</div>
 
      <div className="mx-auto mt-8 max-w-6xl border-t border-zinc-300 pt-4 text-center text-sm text-zinc-500">
        © 2026 React Articles. All rights reserved.
</div>
</footer>
  );
}
 
export default Footer;