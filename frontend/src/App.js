import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { BooksCreate } from './components/BooksCreate';
import { Book } from './components/Book';
import {OrdersCreate} from "./components/OrdersCreate";
import {Orders} from "./components/Orders";
import {Wrapper} from "./components/Wrapper";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Wrapper/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/create-an-order" element={<OrdersCreate/>}/>
            <Route path='/books' element={<Book />} />
            <Route path='/create-a-book' element={<BooksCreate />} />
        </Routes>
    </BrowserRouter>;
}

export default App;
