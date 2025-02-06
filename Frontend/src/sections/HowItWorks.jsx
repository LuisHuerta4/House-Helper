import { InstructionCard } from "../assets/HomeImages"

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
      <div className="flex flex-1 flex-col">
        <h2 className='font-palanquin text-4xl capitalize font-bold lg:max-w-lg'>
          How it {''}
          <span className='text-Wood inline-block mt-3'>Works</span>
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
          Create a posting for a household task you need to be done. Provide details about the task such as a description, images, and location. 
        </p>
        <p className="mt-6 lg:max-lg info-text">
          Others can look at job postings and accept the job if they are interested. The tasker will complete the task and submit proof of completion.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={InstructionCard} alt="couch" width={650} height={600} className="object-cover rounded-2xl"/>
      </div>
    </section>
  )
}

export default HowItWorks