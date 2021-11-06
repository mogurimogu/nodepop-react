import Header from "./Header";
import './styles/layout.scss'
function Layout({ children, idPage, ...props }) {
  return (
    <div>
      <Header {...props} />
      <main style={{padding: "1rem"}} id={idPage}>{children}</main>
    </div>
  );
}

export default Layout;
