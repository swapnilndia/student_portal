import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const RecordContext = createContext();

export const useRecordDetails = () => {
  const useRecordContext = useContext(RecordContext);
  if (!useRecordContext) {
    throw new Error("Kindly use this inside the record context provider");
  } else {
    return useRecordContext;
  }
};

const RecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [currentStandard, setCurrentStandard] = useState(0);

  function updateInfo(prevData) {
    console.log(prevData);
    setCurrentStandard(prevData.currentStandard);
    setRecords(prevData.previousDetails);
  }

  const value = { records, currentStandard, updateInfo };
  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
};
RecordContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecordContextProvider;
