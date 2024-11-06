export const Button = ({ type, onClick, children, ariaLabel }) => {
  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick}>{children}</button>
  );
};
