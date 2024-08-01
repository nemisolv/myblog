function AboutMe() {
    return (
        <div id="about" className="page-container w-[600px] mb-10 mt-4">
            <div className="w-full h-[300px] bg-gray-50 rounded-2xl p-6">
                <h3 className="mb-2  text-primary text-xl font-medium border-t-heading text-center">About me</h3>
                <div className=" flex items-center ">
                    <div className="text-gray-400 text-sm italic w-[80%] leading-relaxed">
                        Passionate about coding, I persevere as a curious student. Through my blog, I share my journey,
                        embracing challenges and learning opportunities. Each line of code fuels my passion, driving me
                        to explore and innovate in the digital realm. With diligence and determination, I navigate the
                        complexities of programming, eager to make my mark and contribute to the ever-evolving world of
                        technology.
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                        <img
                            src="/thumb-default.jpg"
                            alt="my avatar"
                            className="w-[70px] h-[70px] object-cover rounded-full text-center"
                        />
                        <h4 className="font-medium text-sm my-2">Vu Hoai Nam</h4>
                        <span className="text-[10px] text-gray-400 italic">I simply enjoy programming. </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
