import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

import RootLayout from "./layout/Root.tsx";
import HomePage from "./pages/Home.tsx";
import ShopPage from "./pages/Shop.tsx";
import AboutUsPage from "./pages/AboutUs.tsx";
import ServicesPage from "./pages/Services.tsx";
import BlogPage from "./pages/Blog.tsx";
import ContactUsPage from "./pages/Contact.tsx";
import CartPage from "./pages/Carts.tsx";
import CartContextProvider from "./context/CartContext.tsx";
import ErrorPage from "./pages/Error.tsx";
import NewBlogPostPage from "./pages/NewBlogPost.tsx";
import AuthenticationPage from "./pages/Authentication.tsx";

const queryClient: QueryClient = new QueryClient();

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />},
            {path: "shop", element: <ShopPage />},
            {path: "about", element: <AboutUsPage />},
            {path: "services", element: <ServicesPage />},
            {
                path: "blog",
                element: <BlogPage />,
                children: [
                    {
                        path: 'new-post',
                        element: <NewBlogPostPage />
                    }
                ],
            },
            {path: "contact", element: <ContactUsPage />},
            {path: "login", element: <AuthenticationPage />},
            {path: "cart", element: <CartPage />}
        ]
    }
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CartContextProvider>
                <Toaster position="top-center" />
                <RouterProvider router={router} />
            </CartContextProvider>
        </QueryClientProvider>
    )
}

export default App
