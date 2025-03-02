import { Link } from "react-router-dom";

const CategoryCard = ({ imgURL, name, description }) => {
  return (
    <Link to={`/category/${name}`} className="flex flex-1 flex-col w-full max-sm:w-full">
      <img src={imgURL} alt={name} className="w-[280px] h-[280px] rounded-lg object-cover"/>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
      <p className="mt-2 font-montserrat text-slate-gray text-sm leading-normal">{description}</p>
    </Link>
  );
};

export default CategoryCard;
