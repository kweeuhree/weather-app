type Props = {
  type: 'button' | 'submit';
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: any;
}

export const Button: React.FC<Props> = ({ type, onClick, children, ariaLabel }) => {
  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick}>{children}</button>
  );
};
