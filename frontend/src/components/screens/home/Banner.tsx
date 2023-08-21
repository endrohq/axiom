export default function Banner() {
  return (
    <div id="home-banner" className="grid w-full grid-cols-2 items-center">
      <div className="align-with-container-left mt-10 rounded-tr-lg bg-gray-50 py-20 shadow-[0_-35px_50px_-25px_rgba(0,0,0,0.5)]">
        <h1 className="uppercase leading-none">
          <span className="text-6xl font-medium text-black">Fact checking</span>
          <br />
          <span className="text-6xl font-bold text-primary">the internet</span>
        </h1>
        <p className="text-lg21 mb-4 mt-2 w-9/12 leading-relaxed text-black">
          Digital information is everywhere. We help you verify the truth by
          creating a decentralized network of fact checkers where any media
          company, government agency or tech company can participate.
        </p>
      </div>
      <div className="" />
    </div>
  );
}
