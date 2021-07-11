import { useReducer } from "react";
import ContainerContext from "./container-context";

const defaultData = {
    items: [],
    count: 0,
    created: '',
};
// * REDUCER
const ContainerReducer = (state, action) => {
    let newData;
    switch (action["type"]) {
        case "CONTAINER":
            newData = {
                items: createContainer(
                    state["items"],
                    action["id"],
                    action["items"],
                    state["count"] + 1
                ),
                count: state["count"] + 1,
                created: state["created"],
            };
            break;

        case "BOX":
            newData = {
                items: createBox(
                    state["items"],
                    action["id"],
                    action["items"],
                    state["count"] + 1
                ),
                count: state["count"] + 1,
                created: state["created"],
            };
            break;

        case "COLOR":
            newData = {
                items: setColor(state["items"], action["id"], action["value"]),
                count: state["count"],
                created: state["created"],
            };
            break;

        case "BUILD":
            let builded = buildFromJson(action["items"], {
                count: state["count"],
            });
            newData = {
                items: builded["items"],
                count: builded["count"],
                created: state["created"],
            };
            console.log(builded["items"]);
            break;

        case "CREATE":
            let copy = JSON.parse(JSON.stringify(state['items'])); 
            newData = {
                items: state['items'],
                count: state["count"],
                created: JSON.stringify(createJson(copy)),
            };
            console.log(newData["created"]);
            break;

        default:
            newData = state;
            break;
    }
    // console.log(state["count"]);
    return newData;
};

// * PROVIDER
const ContainerProvider = (props) => {
    const [rootState, containerAction] = useReducer(
        ContainerReducer,
        defaultData
    );

    const onAddContainer = (id, items) => {
        containerAction({ type: "CONTAINER", id: id, items: items });
    };
    const onAddBox = (id, items) => {
        containerAction({ type: "BOX", id: id, items: items });
    };

    const onSetColor = (id, color) => {
        containerAction({ type: "COLOR", id: id, value: color });
    };

    const onBuild = (items) => {
        containerAction({ type: "BUILD", items: items });
    };

    const onCreateJson = (items) => {
        containerAction({ type: "CREATE", items: items });
    };

    const containerContext = {
        items: rootState["items"],
        count: rootState["count"],
        created: rootState["created"],
        onAddContainer: onAddContainer,
        onAddBox: onAddBox,
        onSetColor: onSetColor,
        onBuild: onBuild,
        onCreateJson: onCreateJson
    };

    return (
        <ContainerContext.Provider value={containerContext}>
            {props.children}
        </ContainerContext.Provider>
    );
};

// * METHODS TO WORK WITH DATA

const createContainer = (items, id, old, nextId) => {
    if (items) {
        if (id) {
            items.forEach((element) => {
                if (element["id"] === id) {
                    console.log(old);
                    element["items"] = [
                        ...old,
                        { id: nextId, type: "container", items: [] },
                    ];
                    return element;
                } else
                    element = createContainer(
                        element["items"],
                        id,
                        old,
                        nextId
                    );
            });
        } else {
            console.log("no Id");
            items = [...items, { id: nextId, type: "container", items: [] }];
        }
    }
    return items;
};

const createBox = (items, id, old, nextId) => {
    if (items) {
        if (id) {
            items.forEach((element) => {
                if (element["id"] === id) {
                    console.log(old);
                    element["items"] = [
                        ...old,
                        { id: nextId, type: "box", color: "#f9a836" },
                    ];
                    return element;
                } else element = createBox(element["items"], id, old, nextId);
            });
        } else {
            console.log("no Id");
            items = [...items, { id: nextId, type: "box", color: "#f9a836" }];
        }
    }
    return items;
};

const setColor = (items, id, value) => {
    if (items) {
        items.forEach((element) => {
            if (element["id"] === id) {
                element["color"] = value;
                return element;
            } else element = setColor(element["items"], id, value);
        });
    }
    return items;
};

const buildFromJson = (items, counterObj) => {
    if (items) {
        items.forEach((element) => {
            element["id"] = counterObj["count"];
            counterObj["count"]++;
            buildFromJson(element["items"], counterObj);
        });
    }
    return { items: items, count: counterObj["count"] };
};

const createJson = (items) => {
    if (items) {
        items.forEach((element) => {
            delete element['id']
            createJson(element['items'])
        });
    }
    return items;
};

export default ContainerProvider;
