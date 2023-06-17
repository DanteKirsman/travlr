import React, { useContext, useEffect, useState } from "react";
import { db, ref, set, remove } from "../../backend/firebase";
import { PlannerContext, UserIdContext } from "../../App";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import "./Planner.css";

import Card from "../../components/card/Card";
import starIcon from "../../assets/star.svg";
import starFilledIcon from "../../assets/starFilled.svg";
import pinIcon from "../../assets/map-pin.svg";
import calendarIcon from "../../assets/calendar.svg";

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface PlannerProps {
  savedDests: string[];
  setSavedDests: React.Dispatch<React.SetStateAction<string[]>>;
}

function Planner({ savedDests, setSavedDests }: PlannerProps) {
  const { currentPlanner, setCurrentPlanner } = useContext(PlannerContext);
  const userId = useContext(UserIdContext);
  const isSaved = savedDests.includes(currentPlanner.destination);
  const [destinationImage, setDestinationImage] = useState("");

  function renderCards() {
    const cards = currentPlanner.activityLists.map((_, index) => {
      return <Card key={index} day={index} />;
    });
    return cards;
  }

  useEffect(() => {
    if (isSaved && userId) {
      set(
        ref(
          db,
          `users/${userId}/savedDestinations/${currentPlanner.destination}`
        ),
        currentPlanner
      );
    }
    localStorage.setItem("currentPlanner", JSON.stringify(currentPlanner));
  }, [isSaved, userId, currentPlanner]);

  useEffect(() => {
    const fetchDestinationImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${currentPlanner.destination}&client_id=${UNSPLASH_API_KEY}`
        );
        const data = await response.json();
        const image =
          data.results[Math.floor(Math.random() * 10)]?.urls.regular || "";
        setDestinationImage(image);
      } catch (error) {
        console.log("Error fetching destination image:", error);
      }
    };

    fetchDestinationImage();
  }, [currentPlanner.destination]);

  function handleSaved() {
    if (userId !== "") {
      const newSavedDests = savedDests.includes(currentPlanner.destination)
        ? savedDests.filter((dest) => dest !== currentPlanner.destination)
        : [...savedDests, currentPlanner.destination];
      setSavedDests(newSavedDests);

      if (savedDests.includes(currentPlanner.destination)) {
        remove(
          ref(
            db,
            `users/${userId}/savedDestinations/${currentPlanner.destination}`
          )
        );
      }
    }
  }

  function handleDragDrop(results: DropResult) {
    const { source, destination, type } = results;
    // If we dont drag a draggrable into a droppable, we return
    if (!destination) return;
    // If draggable got picked and dropped in the same spot
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "group") {
      // Create a copy of currentPlanner
      const reorderedPlanner = { ...currentPlanner };

      // Get the activity we want to move
      const sourceActivities =
        reorderedPlanner.activityLists[parseInt(source.droppableId)].activities;
      const movedActivity = sourceActivities[source.index];

      // Remove that activity from the array
      sourceActivities.splice(source.index, 1);

      // Get the activities we want to move it to
      const destActivities =
        reorderedPlanner.activityLists[parseInt(destination.droppableId)]
          .activities;

      // Insert the movedActivity into the acitivities we wanted
      destActivities.splice(destination.index, 0, movedActivity);

      // Update the currentPlanner state with the reordered planner
      return setCurrentPlanner(reorderedPlanner);
    }
  }

  return (
    <div className="planner-container">
      <div className="event-container">
        <div className="hero-container">
          {destinationImage && (
            <img
              src={destinationImage}
              alt={currentPlanner.destination}
              className="destination-image"
            />
          )}
          <div className="destination-info-container">
            <div className="destination-title-container">
              <img className="pin-icon" src={pinIcon} alt="Map Pin" />
              <h1 className="destination">{currentPlanner.destination}</h1>
            </div>
            <div className="destination-date-container">
              <img
                className="destination-date-icon"
                src={calendarIcon}
                alt="Calendar Icon"
              />
              {currentPlanner.startDate} - {currentPlanner.endDate}
            </div>
          </div>
          <div className="save-icon-container" onClick={handleSaved}>
            <img
              src={isSaved && userId !== "" ? starFilledIcon : starIcon}
              alt="Save"
            />
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="cards-container">{renderCards()}</div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Planner;
