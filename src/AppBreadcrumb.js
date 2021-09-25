import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const AppBreadcrumb = (props) => {

    const location = useLocation();
    const pathname = location.pathname;

    let name = pathname.replace('/', '');
    if (props.routers) {
        let currentRouter = props.routers.find(router => router.path === pathname);
        name = currentRouter ? currentRouter['meta'].breadcrumb[0].label : name;
    }

    return <span>{name}</span>;
}

export default withRouter(AppBreadcrumb);
