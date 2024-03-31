import { useEffect, useState } from "react";

import "./timeline.scss";

const Timeline = ({ events }) => {
  const [timelineEvents, setTimelineEvents] = useState(events ?? []);

  useEffect(() => {
    setTimelineEvents(events);
  }, [events]);

  return (
    <ul class="ul-container">
      {timelineEvents?.map((currEvent) => {
        const isPending = currEvent?.isPending;
        let icon = "fa-circle";
        icon = isPending ? "fa-clock-four" : "fa-check-circle";
        const iconColor = isPending ? "#999" : "green";
        return (
          <li class="list-item">
            <div class="left-content">{currEvent?.leftContent}</div>
            <div class="right-content">
              <div class="icon">
                <i
                  className={`fa ${icon}`}
                  style={{
                    color: iconColor,
                  }}
                ></i>
              </div>
              <div>
                <div>{currEvent?.rightContent?.title}</div>
                <div className="italics">
                  {currEvent?.rightContent?.subContent}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
