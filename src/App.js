import "./App.css";
import Root from "./Container/Root";
import React from "react";
import ContainerProvider from "./context/container-provider";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
    return (
        <Provider store={store}>
            <ContainerProvider>
                <Root></Root>
            </ContainerProvider>
        </Provider>
    );
}

export default App;
