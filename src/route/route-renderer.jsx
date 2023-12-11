import { useRoutes } from 'react-router-dom';
import routeConfig from '@/route/route-config';

export const RouteRenderer = () => {
    const route = useRoutes(routeConfig);
    return route;
};
