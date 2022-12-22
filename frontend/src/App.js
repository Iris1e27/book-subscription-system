import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { BooksCreate } from './components/BooksCreate';
import { Book } from './components/Book';
import {BookList} from './components/BookList';
import {OrdersCreate} from "./components/OrdersCreate";
import {Orders} from "./components/Orders";
import {OrderList} from "./components/OrderList";
import {OrderBuy} from "./components/OrderBuy";
import {UsersCreate} from "./components/UsersCreate";
import {User} from "./components/User";
import NotFound from "./components/NotFound";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {UserProfile} from "./components/UserProfile";
import {AdminPage} from "./components/AdminPage";
import {CustomerPage} from "./components/CustomerPage";
import {IdentitySelect} from "./components/IdentitySelect";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<IdentitySelect/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path='/:user_id' element={<CustomerPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/orders/create-an-order" element={<OrdersCreate/>}/>
            <Route path="/users/buy-an-order/:user_id" element={<OrderBuy/>}/>
            <Route path="/orders/:user_id" element={<OrderList/>}/>
            <Route path='/books' element={<Book />} />
            <Route path='/books/create-a-book' element={<BooksCreate />} />
            <Route path='/books/:user_id' element={<BookList />} />
            <Route path='/users' element={<User />} />
            <Route path='/users/create-a-user' element={<UsersCreate />} />
            <Route path='/users/:user_id' element={<UserProfile />} />
            <Route component={<NotFound/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;
