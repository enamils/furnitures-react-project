import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./layout/Root.tsx";
import HomePage from "./pages/Home.tsx";
import ShopPage from "./pages/Shop.tsx";
import AboutUsPage from "./pages/AboutUs.tsx";
import ServicesPage from "./pages/Services.tsx";
import BlogPage from "./pages/Blog.tsx";
import ContactUsPage from "./pages/Contact.tsx";
import CartPage from "./pages/Carts.tsx";
import CartContextProvider from "./store/CartContext.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {index: true, element: <HomePage />},
            {path: "shop", element: <ShopPage />},
            {path: "about", element: <AboutUsPage />},
            {path: "services", element: <ServicesPage />},
            {path: "blog", element: <BlogPage />},
            {path: "contact", element: <ContactUsPage />},
            {path: "cart", element: <CartPage />}
        ]
    }
]);

function App() {
    return (
        <CartContextProvider>
            <RouterProvider router={router} />
        </CartContextProvider>
    )
}

export default App
