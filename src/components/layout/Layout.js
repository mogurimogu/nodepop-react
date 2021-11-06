import Header from "./Header";

function Layout({ children, idPage, ...props }) {
  return (
    <div id={idPage} {...props}>
      <Header/>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
