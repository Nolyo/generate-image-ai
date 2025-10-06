import React from 'react'

export default function Auth() {
  const [error, setError] = React.useState<string | null>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value
    if (!password.length) return
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include'
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Erreur de connexion')
      }
      window.location.reload()
    } catch (err: any) {
      setError(err?.message || 'Erreur')
    }
  }
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 gap-4 mt-5 p-5 border rounded items-center"
      >
        <input
          aria-label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input w-2/3"
        />
        {error && <p className="text-red-400">{error}</p>}
        <div>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
