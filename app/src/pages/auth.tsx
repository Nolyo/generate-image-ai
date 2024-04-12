import React from 'react'

export default function Auth() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value
    if (password.length) {
      window.localStorage.setItem('password', password)
      window.location.reload()
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
        <div>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
