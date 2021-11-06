import Header from "./Header";

function Layout({ children, idPage, ...props }) {
  return (
    <div id={idPage}>
      <Header {...props} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
