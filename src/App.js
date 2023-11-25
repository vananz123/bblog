import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import PrivateRoute from './routes/PrivateRoute';
import DefaultLayout from './conponents/Layout/DefaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="content" style={{ backgroundColor: '#ffffff' }}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout || DefaultLayout; // nếu trong route ko set layout cụ thể thì à defaulfLayout
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route path="/admin" element={<PrivateRoute />}>
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page></Page>
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};
export default App;
