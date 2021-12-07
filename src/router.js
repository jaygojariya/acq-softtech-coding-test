import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";
import Category from "./Components/category/category";
import Login from "./Components/login/auth";

function AppRouter() {

    const { authData } = useSelector((state) => state.authReducer);

    return (
        <Switch>
            <Route exact path={`/login`} component={Login} />
            <Route exact path={'/category'} component={Category} />
            {/* {authData && authData === 'true' ?
                <Redirect to={'/category'} component={Category} />
            :
                <Redirect to={'/login'} component={Login}/>
            } */}
        </Switch>
    )
}

export default AppRouter;
