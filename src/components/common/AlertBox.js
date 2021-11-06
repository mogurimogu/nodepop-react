import "./style/AlertBox.scss";
function AlertBox({children, onClick}) {
  return <div className="alert error" onClick={onClick}>{children}</div>;
}

export default AlertBox;
