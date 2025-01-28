import { categories } from "../constants"
import CategoryCard from "../components/CategoryCard"

const AllCategories = () => {
  return (
    <section id="categories" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our Job <span className="text-Wood">Categories</span>
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Choose from a variety of job categories to find the job that is the best fit for you.
        </p>
      </div>
      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category}/>
        ))}
      </div>
    </section>
  )
}

export default AllCategories