import { useState } from "react";
import { Container } from "@mui/material";
import PropertyTabs from "../CreateListItems/PropertyTabs";
import TaskList from "../CreateListItems/TaskList";
import "../style/styles.css";

const CreateListPage = () => {
  const [properties, setProperties] = useState(["物件A"]);
  const [selectedProperty, setSelectedProperty] = useState("物件A");

  return (
    <div className="app-container">
      <Container>
          <>
            <PropertyTabs
              properties={properties}
              currentProperty={selectedProperty}
              onSelect={setSelectedProperty}
              onAdd={(name) => setProperties([...properties, name])}
            />
            <TaskList property={selectedProperty} />
          </>
      </Container>
    </div>
  );
};

export default CreateListPage;
