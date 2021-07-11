import React, { useContext, useState, useEffect } from "react";
import ContainerContext from "../context/container-context";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, createPosts } from "../actions/posts";

const Root = (props) => {
    const dispatch = useDispatch();

    var savedVal = "[]";

    const containerCtx = useContext(ContainerContext);

    const [textBuild, setTextBuild] = useState("");

    // const selector = useSelector((state) => console.log(state));

    const selector = useSelector((state) => {
        if (state["posts"]) {
            if (!state["posts"]["data"]) savedVal = state["posts"][0]["data"];
        }
    });
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleTextBuildChange = (event) => {
        setTextBuild(event["target"]["value"]);
    };

    const build = () => {
        containerCtx.onBuild(JSON.parse(textBuild));
    };

    const buildSaved = () => {
        containerCtx.onBuild(JSON.parse(savedVal));
    };

    const createJSON = () => {
        containerCtx.onCreateJson();
    };

    const save = () => {
        dispatch(createPosts({ data: containerCtx["created"] }));
    };

    return (
        <div>
            <Container items={containerCtx["items"]} />
            <div className="text-container">
                <button className="create-btn" onClick={build}>
                    Build
                </button>
                <textarea
                    className="textar"
                    rows="6"
                    cols="100"
                    value={textBuild}
                    onChange={handleTextBuildChange}
                />
            </div>
            <div className="text-container">
                <button className="create-btn" onClick={createJSON}>
                    Create Json
                </button>
                <textarea
                    className="textar"
                    rows="6"
                    cols="100"
                    value={containerCtx["created"]}
                />
            </div>
            <button className="create-btn" onClick={save}>
                Save
            </button>

            <div className="text-container mt-10">
                <button className="create-btn" onClick={buildSaved}>
                    Build Saved
                </button>
                <div className="textar">{savedVal}</div>
            </div>
        </div>
    );
};

export default Root;
