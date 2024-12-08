export const ListGames = () => {
  return (
    <>
      <div className="flex flex-col gap-8 text-white  py-12">
        <h1 className="text-2xl font-bold">Games</h1>
        <div className="grid grid-cols-5 gap-5 justify-between items-center">
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Mobile Legends : Bang Bang</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Free Fire</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Valorant</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Genshin Impact</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">PUBG Mobile - Indonesia</h1>
            <p>Instant</p>
          </a>
        </div>
      </div>
    </>
  );
};
