import { FC } from "react";

interface HeaqderProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const Header: FC<HeaqderProps> = ({ text, textColor, bgColor }) => {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <header style={headerStyles}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
    </header>
  );
};

Header.defaultProps = {
  text: "Feedback-UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
};

export default Header;
