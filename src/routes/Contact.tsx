import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { postJSON } from '../lib/api'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10)
})
type FormData = z.infer<typeof schema>

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    // When backend is ready, uncomment:
    // await postJSON('/contact', data)
    await new Promise((r) => setTimeout(r, 600)) // simulate
    reset()
  }

  return (
    <section className="container my-12 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input className="border p-3 rounded-xl" placeholder="Full name" {...register('name')} />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

        <input className="border p-3 rounded-xl" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

        <input className="border p-3 rounded-xl" placeholder="Phone" {...register('phone')} />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}

        <textarea className="border p-3 rounded-xl min-h-40" placeholder="How can we help?"
          {...register('message')} />
        {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
        {isSubmitSuccessful && <p className="text-green-700 text-sm">Thanks! We’ll get back to you.</p>}
      </form>
    </section>
  )
}