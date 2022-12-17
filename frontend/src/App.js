import {Products} from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {OrdersCreate} from "./components/OrdersCreate";
import {Orders} from "./components/Orders";
import {Wrapper} from "./components/Wrapper";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Wrapper/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/create-an-order" element={<OrdersCreate/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;
