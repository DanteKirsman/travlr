import { useState } from "react";
import deleteIcon from "../../assets/deleteActivity.svg";
import editIcon from "../../assets/edit.svg";
import checkIcon from "../../assets/check.svg";
import "./Activity.css";

interface Activity {
  startTime: string;
  endTime: string;
  name: string;
}

interface ActivityList {
  [key: number]: Activity[];
}

interface ActivityProps {
  day: number;
  index: number;
  setActivityList: React.Dispatch<React.SetStateAction<ActivityList>>;
  activityList: ActivityList;
}

function Activity({
  day,
  index,
  setActivityList,
  activityList,
}: ActivityProps) {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const activity = activityList[day][index];

  // Handle edit values and add them to activity object
  function handleEditValues(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, className } = event.target;
    setActivityList((prevActivityList) => {
      const newActivityList = { ...prevActivityList };
      const activities = newActivityList[day];
      const updatedActivity = { ...activities[index] };

      if (className === "time-start-edit") {
        updatedActivity.startTime = value;
      } else if (className === "time-end-edit") {
        updatedActivity.endTime = value;
      } else {
        updatedActivity.name = value;
      }

      activities[index] = updatedActivity;
      return newActivityList;
    });
  }

  // Delete activity from activity list
  function handleActivityDelete() {
    setActivityList((prevActivityList) => {
      const newActivityList = { ...prevActivityList };
      const activities = newActivityList[day];

      const newActivities = activities.filter((_, i) => i !== index);
      newActivityList[day] = newActivities;

      return newActivityList;
    });
  }

  return (
    <div className="activity">
      <div className="activity-info">
        {isEditing ? (
          // Show edit form
          <>
            <div>
              <input
                className="time-start-edit"
                placeholder={activity.startTime}
                onChange={handleEditValues}
              />{" "}
              <span> - </span>
              <input
                className="time-end-edit"
                placeholder={activity.endTime}
                onChange={handleEditValues}
              />
            </div>
            <input
              className="name-edit"
              placeholder={activity.name}
              onChange={handleEditValues}
            />
          </>
        ) : (
          // Show activity info
          <>
            <p className="activity-time">
              <span>{activity.startTime} </span>-
              <span> {activity.endTime}</span>
            </p>
            <p className="activity-name">{activity.name}</p>
          </>
        )}
      </div>
      <div className="activity-button">
        {!isEditing ? (
          <button className="delete-button" onClick={handleActivityDelete}>
            <img src={deleteIcon} alt="Delete Activity" />
          </button>
        ) : null}
        {isEditing ? (
          <button
            className="confirm-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <img src={checkIcon} alt="Confirm Edit" />
          </button>
        ) : (
          <button
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <img src={editIcon} alt="Edit Activity" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Activity;
