import { BrowserRouter } from "react-router-dom";
import { RouteRenderer } from "./route/route-renderer";


function App() {
    return (
        <BrowserRouter>
            <RouteRenderer/>
        </BrowserRouter>
    );
}

export default App;
