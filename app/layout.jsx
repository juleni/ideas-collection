import Nav from "@components/Nav";
import "@styles/globals.css";
// import Provider  from "@components/Provider";

export const metadata = {
  title: "Ideas Collection",
  description: "Collect and share ideas",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
