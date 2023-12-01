import routeConfig from "@/route/route-config";
import { useRoutes } from "react-router-dom";


export const RouteRenderer = () => {
    const route = useRoutes(routeConfig);
    return route;
};
