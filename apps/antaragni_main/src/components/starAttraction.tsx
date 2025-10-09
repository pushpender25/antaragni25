import Image from "next/image";

type StarAttractionCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  instaLink: string;
  buttonText?: string;
};

export default function StarAttractionCard({
  imageUrl,
  title,
  description,
  instaLink,
  buttonText = "View More",
}: StarAttractionCardProps) {
  return (
    // ADDED: border border-gray-700
    <div 
        className="flex flex-col md:flex-row bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-4xl h-auto md:h-96 mx-auto
                   border border-gray-700
                   transition duration-100 ease-in-out 
                   hover:scale-[1.05] hover:shadow-2xl hover:border-indigo-500" // IMPROVEMENT: border changes color on hover
    >

      {/* Left Image Container */}
      <div 
        className="relative w-full md:w-[40%] h-64 md:h-full transform origin-center 
                   transition duration-300 ease-in-out 
                   group-hover:scale-[1.05]"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover" 
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-center p-6 md:w-[60%] text-white bg-gray-900">
        <h2 className="text-5xl text-center font-extrabold mb-8 ">{title}</h2>
         <div className="flex flex-col flex-grow w-full">
        {/* Description Text - Center it horizontally within the wrapper */}
        <p className="text-xl text-center text-gray-300 max-w-lg leading-relaxed mx-auto my-auto"> 
            {description}
        </p>

        {/* Button Wrapper - Locked to the bottom right */}
        <div className="flex justify-center pt-5 md-pt-0 md-justify-end w-full mt-auto">
            <a href={instaLink} className="self-end ">
                <button 
                    className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg cursor-pointer"
                >
                    {buttonText}
                </button>
            </a>
        </div>
    </div>
      </div>
    </div>
  );
}