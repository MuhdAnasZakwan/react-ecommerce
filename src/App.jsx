import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster, toast } from "sonner";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/new" element={<ProductAdd />} />
                    <Route path="/products/:id/edit" element={<ProductEdit/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                </Routes>
                <Toaster/>
            </BrowserRouter>
        </div>
    );
}

export default App;
