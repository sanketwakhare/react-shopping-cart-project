import { useState } from "react";
import "./shipment-tracker.scss";

const ShipmentTracker = ({ stages }) => {
  const [openIndex, setOpenIndex] = useState(-1); // State to track the index of the open item

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index)); // Toggle open/close state
  };

  return (
    <div className="shipment-tracker">
      <h2 className="tracker-heading">Shipment Tracker</h2>
      <ul className="tracker-list">
        {stages.map((stage, index) => {
          const liClasses = [];
          if (stage.isCompleted) {
            liClasses.push("completed");
          }
          if (stage.isCurrent) {
            liClasses.push("active");
          }
          return (
            <div className="tracker-container">
              <li key={index} className={liClasses.join(" ")}>
                <span onClick={() => handleToggle(index)}>
                  {stage.name}{" "}
                  {index === openIndex ? (
                    <i className="fa fa-caret-up"></i>
                  ) : (
                    <i className="fa fa-caret-down"></i>
                  )}
                </span>
                {index === openIndex && (
                  <div className="contents">
                    Additional information for {stage.name}
                  </div>
                )}{" "}
              </li>
              {index !== stages.length - 1 && <div>|</div>}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ShipmentTracker;
