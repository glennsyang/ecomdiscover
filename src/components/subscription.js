import React, { useState } from 'react'

const SubscriptionForm = () => {
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('')

  //FORM_URL should be the same as the form action url pointed out above
  const FORM_URL = `https://app.convertkit.com/forms/1885266/subscriptions`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const response = await fetch(
        FORM_URL,
        {
          method: 'post',
          body: data,
          headers: {
            accept: 'application/json',
          },
        }
      )
      setEmail('')
      const json = await response.json()
      if (json.status === 'success') {
        setStatus('SUCCESS')
        return
      }
    } catch (err) {
      setStatus('ERROR')
      console.log(err)
    }
  }

  const handleInputChange = event => {
    const { value } = event.target
    setEmail(value)
  }

  return (
    <section className="bg-gray-100 py-12 text-center px-2">
      <h2 className="antialiased font-serif text-xl sm:text-3xl font-semibold text-black">
        Join the EcomDiscover community
      </h2>
      <p className="antialised text-base sm:text-lg font-light text-black pt-4 pb-10">
        Become part of the EcomDiscover community and be in the know about new reviews, blog posts, and everything related to ecommerce tools and services.
      </p>

      {status === 'SUCCESS' && <p className="antialised font-thin text-base text-gray-800 mb-8">
        Success! Now check your email to confirm your subscription.
      </p>}
      {status === 'ERROR' && <p className="antialised font-thin text-sm text-red-600 mb-8">
        Oops, Something went wrong! Please try again.
      </p>}

      <form className="flex flex-col md:flex-row justify-center px-2 md:px-0"
        action={FORM_URL}
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          aria-label="Email Address"
          //The name attribute should be the same as on you selected form.
          name="email_address"
          placeholder="Email Address"
          onChange={handleInputChange}
          value={email}
          required
          className="text-black w-full md:w-1/3 rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
        />

        <button
          type="submit"
          value="Submit"
          className="hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient mt-2 md:mt-0 md:ml-2 "
        >
          Subscribe
          </button>
      </form>

      <p className="antialised font-thin text-sm text-gray-400 mt-8">
        We won't send you spam. Unsubscribe at any time.
      </p>

    </section>
  )
}

export default SubscriptionForm
