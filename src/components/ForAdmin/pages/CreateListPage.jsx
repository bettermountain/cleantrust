// src/components/ForAdmin/pages/CreateListPage.jsx
import { useState } from "react";
import { Container } from "@mui/material";
import PropertyTabs from "../CreateListItems/PropertyTabs";
import TaskList from "../CreateListItems/TaskList";
import "../style/styles.css";

const CreateListPage = () => {
  const [placeObj, setPlaceObj] = useState({ id: "", name: "" });

  return (
    <div className="app-container">
      <Container>
        <>
          <PropertyTabs currentProperty={placeObj} onSelect={setPlaceObj} />
          <TaskList placeId={placeObj.id} placeName={placeObj.name} />
        </>
      </Container>
    </div>
  );
};

export default CreateListPage;
