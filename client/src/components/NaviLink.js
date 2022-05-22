const React = require('react');
const { Link, useLocation } = require('react-router-dom');

function NaviLink(props) {
    let active = useLocation().pathname === props.to;
    return (
        <Link to={props.to} className={`nav-link ${active ? 'active' : ''}`} >{props.children}</Link>
    );
}
export default NaviLink;