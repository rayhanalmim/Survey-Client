
const Title = ({title}) => {
    return (
        <div className="relative border-s-8 border-orange-500 ps-3">
            <h2 className="text-6xl font-bold z-20">{title}</h2>
            <p className="absolute bottom-0 text-9xl z-10 opacity-5">{title}</p>
        </div>
    );
};

export default Title;