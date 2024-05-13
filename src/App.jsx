import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Auth from "./pages/auth/auth"
import Categories from "./pages/categories/categories"
import Animals from "./pages/animals/animals"
import Animal from "./pages/animal/animal"
import Adminpanel from "./pages/adminpanel/adminpanel"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/animals" element={<Animals/>} />
                <Route path="/animal" element={<Animal/>} />
                <Route path="/animalexp_adminpanel" element={<Adminpanel/>} />
            </Routes>
        </div>
    )
}

export default App