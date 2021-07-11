import React, { useContext, useState } from "react";
import ContainerContext from "../context/container-context";

const Container = (props) => {

    const [show, setIsShown ] = useState(false);

    const containerCtx = useContext(ContainerContext);
    // const [containersData, setContainer] = useState(props['items']);
    // Add Container
    const addContainer = () => {
        containerCtx.onAddContainer(props["id"], props["items"]);
    };
    const addBox = () => {
        containerCtx.onAddBox(props["id"], props["items"]);
    };
    const setColor = (value, id) => {
        containerCtx.onSetColor(id, value);
    };

    return (
        <div className="container">
            {props["items"] &&
                props["items"].map((item, index) => {
                    if (item["type"] === "container") {
                        return (
                            <Container
                                items={item["items"]}
                                key={item["id"]}
                                id={item["id"]}
                            />
                        );
                    } else if (item["type"] === "box")
                        return (
                            <input
                                className="inp"
                                type="color"
                                key={item["id"]}
                                id={item["id"]}
                                onChange={(e) =>
                                    setColor(e.target.value, item["id"])
                                }
                                value={
                                    item["color"] ? item["color"] : "#f9a836"
                                }
                            ></input>
                        );
                    return <div></div>;
                })}
            <div className="btn-container" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
                {show && <div className="btn-modal" >
                    <button onClick={addBox}>box</button>
                    <button onClick={addContainer}>container</button>
                </div>}
                <button className="add-btn" >add</button>
            </div>
        </div>
    );
};

export default Container;
