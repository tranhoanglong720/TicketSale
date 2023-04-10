// import React, { useState } from "react";

// export const AppContext = React.createContext();
// function AppProvider({ children }) {
//   const [show, setShow] = useState(false);
//   const [changeDate, setchangeDate] = useState(false);
//   const [update, setUpdate] = useState(false);
//   const [add, setAdd] = useState(false);
//   const [status, setStatus] = useState("Tất cả");
//   const [item, setItem] = useState({});
//   const [active, setActive] = useState("QuanLy");
//   const [packed, setPacked] = useState(true);
//   const [reRender, setRerender] = useState(false);

//   const clearState = () => {
//     setShow(false);
//     setAdd(false);
//     setUpdate(false);
//     setPacked(true);
//     setActive("");
//     setStatus("");
//     setchangeDate(false);
//     setRerender(false);
//     setItem({});
//   };
//   return (
//     <AppContext.Provider
//       value={{
//         show,
//         setShow,
//         active,
//         setActive,
//         changeDate,
//         setchangeDate,
//         add,
//         setAdd,
//         update,
//         setUpdate,
//         item,
//         setItem,
//         status,
//         setStatus,
//         packed,
//         setPacked,
//         reRender,
//         setRerender,
//         clearState,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export default AppProvider;
import React, { createContext, FC, useState } from "react";

interface AppContextProps {
  show: boolean;

  setShow: (show: boolean) => void;

  active: string;

  setActive: (active: string) => void;

  changeDate: boolean;

  setchangeDate: (changeDate: boolean) => void;

  add: boolean;

  setAdd: (add: boolean) => void;

  update: boolean;

  setUpdate: (update: boolean) => void;

  item: object;

  setItem: (item: object) => void;

  status: string;

  setStatus: (status: string) => void;

  packed: boolean;

  setPacked: (packed: boolean) => void;

  reRender: boolean;

  setRerender: (reRender: boolean) => void;

  clearState: () => void;
}

export const AppContext = createContext({} as AppContextProps);

const AppProvider: React.FC<any> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);

  const [changeDate, setchangeDate] = useState<boolean>(false);

  const [update, setUpdate] = useState<boolean>(false);

  const [add, setAdd] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("Tất cả");

  const [item, setItem] = useState<object>({});

  const [active, setActive] = useState<string>("QuanLy");

  const [packed, setPacked] = useState<boolean>(true);

  const [reRender, setRerender] = useState<boolean>(false);

  const clearState = () => {
    setShow(false);

    setAdd(false);

    setUpdate(false);

    setPacked(true);

    setActive("");

    setStatus("");

    setchangeDate(false);

    setRerender(false);

    setItem({});
  };

  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        active,
        setActive,
        changeDate,
        setchangeDate,
        add,
        setAdd,
        update,
        setUpdate,
        item,
        setItem,
        status,
        setStatus,
        packed,
        setPacked,
        reRender,
        setRerender,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
