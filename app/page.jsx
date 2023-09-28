import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Ideas Collection</span>
      </h1>
      <p className="desc text-center">
        Ideas Collection is an open-source tool for collecting and sharing
        ideas.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
