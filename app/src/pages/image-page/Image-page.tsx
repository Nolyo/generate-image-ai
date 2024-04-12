import { z } from 'zod'
import OpenAI from 'openai'
import { useEffect, useState } from 'react'

import logo from 'assets/logo.svg'
import Avatar from 'components/Avatar'
import Input from 'components/Input/Input'
import Form, { FORM_ERROR } from 'components/Form/Form'

const Schema = z.object({
  prompt: z.string().min(3, 'Too Short!')
})

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const ImagePage = () => {
  const [image_url, setImageUrl] = useState<string | null>()
  const [revisedPrompt, setRevisedPrompt] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = image_url as string
    link.download = 'downloaded_image'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    document.title = 'Image Generator'
  }, [])

  return (
    <div className="p-3">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:static sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="sm:max-w-lg">
          <div className="mb-5 flex flex-col">
            <div className="flex items-center gap-2">
              <Avatar size="large" src={logo} />
              <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                Your Logo!
              </h1>
            </div>
            <p className="mt-4 text-xl text-gray-500">
              Generate your own images, write your own text and let the AI
              generate the rest.
            </p>
          </div>
          <Form
            schema={Schema}
            submitText="Generate"
            initialValues={{ prompt: '' }}
            onSubmit={async (values) => {
              try {
                setLoading(true)
                setImageUrl(null)
                setRevisedPrompt(null)
                const image = await openai.images.generate({
                  model: 'dall-e-3',
                  prompt: values.prompt,
                  size: '1024x1024'
                })
                if (image?.data.length > 0) {
                  setImageUrl(image.data[0].url as string)
                  setRevisedPrompt(image.data[0].revised_prompt as string)
                }
              } catch (error: any) {
                return { [FORM_ERROR]: error.toString() }
              } finally {
                setLoading(false)
              }
            }}
          >
            <Input
              placeholder="What do you want to generate?"
              name="prompt"
              as="textarea"
            />
          </Form>
        </div>
        <div
          aria-hidden="true"
          className="mt-10 md:mt-0 lg:mx-auto lg:w-full lg:max-w-7xl"
        >
          <div className="flex flex-col items-center gap-2">
            {!loading ? (
              <div className="relative">
                <img
                  src={image_url || 'https://picsum.photos/600?random=1'}
                  alt="Generated Image"
                  className="max-h-[512px] object-cover"
                />
                {image_url && (
                  <div className="absolute right-0 top-0">
                    <button
                      title={'Download Image'}
                      onClick={handleDownload}
                      className="flex h-8 w-8 items-center justify-center rounded bg-black/50 text-white"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929C5.90237 10.6834 5.90237 11.3166 6.29289 11.7071L11.2929 16.7071C11.6834 17.0976 12.3166 17.0976 12.7071 16.7071L17.7071 11.7071C18.0976 11.3166 18.0976 10.6834 17.7071 10.2929C17.3166 9.90237 16.6834 9.90237 16.2929 10.2929L13 13.5858L13 4C13 3.44771 12.5523 3 12 3C11.4477 3 11 3.44771 11 4L11 13.5858L7.70711 10.2929ZM5 19C4.44772 19 4 19.4477 4 20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20C20 19.4477 19.5523 19 19 19L5 19Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 w-64 animate-spin rounded-full border-y-2"></div>
            )}
            {revisedPrompt && (
              <div className="flex flex-col">
                <p className="mt-4 text-xl text-gray-500">{revisedPrompt}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
