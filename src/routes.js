import {createBrowserRouter} from 'react-router-dom';
// import { Home } from './pages/home';
import { TasksList } from './pages/TasksList';
import { TasksForm } from './pages/TasksForm';

const routes = createBrowserRouter([
    // {
    //     path:"/",
    //     element:(<Home/>)
    // },
    {
        path:"/tasks",
        element:(<TasksList/>)
    },
    {
        path:"/tasks/:id",
        element:(<TasksForm/>)
    }
])

export {routes};