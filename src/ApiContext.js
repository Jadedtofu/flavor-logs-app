import React from 'react';

export default React.createContext({
    eateries: [],
    logs: [],
    addEatery: () => {},
    editEatery: () => {},
    deleteEatery: () => {},
    addLog: () => {},
    editLog: () => {},
    deleteLog: () => {}
});
