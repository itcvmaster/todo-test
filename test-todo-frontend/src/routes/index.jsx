import React, { lazy, Suspense } from "react";

const Loader = (Component) => (props) =>
(
    <Suspense fallback={<></>}>
        <Component {...props} />
    </Suspense>
);

// Non-Authenticated Pages
const Home = Loader(lazy(() => import("@pages/Home")));
const Login = Loader(lazy(() => import("@pages/Login")));
const Signup = Loader(lazy(() => import("@pages/Signup")));

// Aunthenticated Pages
const Todo = Loader(lazy(() => import("@pages/Todo")));

const publicRoutes = [
    { path: "/login", component: <Login /> },
];

const authRoutes = [
    { path: "/", component: <Todo /> },
    { path: "/todo", component: <Todo /> },
];

export { authRoutes, publicRoutes };
