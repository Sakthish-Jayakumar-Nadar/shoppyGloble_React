import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import appStore from '../utils/appStore.js'
import Home from './components/Home.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import NotFound from './components/NotFound.jsx'

const routes = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />,
        errorElement: <NotFound />
      },
      {
        path:'/cart',
        element:<Cart />,
        errorElement: <NotFound />
      },
      {
        path:'/product/:id',
        element:<ProductDetail />,
        errorElement: <NotFound />
      },

    ],
    errorElement: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
      <ChakraProvider>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </Provider>,
)
