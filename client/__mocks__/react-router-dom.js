const mockNavigate = jest.fn();
const mockLocation = { pathname: '/' };
const mockParams = {};

export const useNavigate = () => mockNavigate;
export const useLocation = () => mockLocation;
export const useParams = () => mockParams;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;
export const Navigate = ({ to }) => <div>Navigating to {to}</div>; 