
import "./Header.css";

function Header() {



  return (
    <div className="header text-center" style={{padding:20}}>
      <img src={`${process.env.PUBLIC_URL}/logo512.png`} style={{maxWidth:"150px",maxHeight:"99px"}} alt="logo" />
    </div>
  );
}

export default Header;
