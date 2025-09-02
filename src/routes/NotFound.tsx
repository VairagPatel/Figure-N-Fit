import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container my-20 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="text-gray-600 mt-2">Sorry, we couldn’t find that page.</p>
      <NavLink to="/" className="btn btn-secondary mt-6">Back to Home</NavLink>
    </section>
  )
}