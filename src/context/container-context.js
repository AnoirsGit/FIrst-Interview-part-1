import React from 'react';

const ContainerContext = React.createContext({
    data:{
        items:[],
        count: 0,
        created:''
    }
});

export default ContainerContext;