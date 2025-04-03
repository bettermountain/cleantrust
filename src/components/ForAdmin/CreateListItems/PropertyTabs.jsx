// src/components/CreateListItems/PropertyTabs.jsx
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchPlaces, addPlace } from "../../../api";

const PropertyTabs = ({ currentProperty, onSelect }) => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState("");
  const [open, setOpen] = useState(false);

  const loadPlaces = async () => {
    const res = await fetchPlaces();
    setProperties(res.data);

    // 初期選択
    if (!currentProperty?.id && res.data.length > 0) {
      onSelect({ id: res.data[0].id, name: res.data[0].placename });
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleAdd = async () => {
    if (!newProperty.trim()) return;
    await addPlace(newProperty.trim());
    setNewProperty("");
    setOpen(false);
    await loadPlaces();
  };

  return (
    <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <AddIcon />
      </IconButton>

      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", flexGrow: 1 }}>
        <Tabs
          value={currentProperty?.id}
          onChange={(e, newValue) => {
            const selected = properties.find((p) => p.id === newValue);
            if (selected) {
              onSelect({ id: selected.id, name: selected.placename });
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {properties.map((p) => (
            <Tab key={p.id} label={p.placename} value={p.id} />
          ))}
        </Tabs>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新しい物件を追加</DialogTitle>
        <DialogContent>
          <TextField
            label="物件名"
            variant="outlined"
            fullWidth
            value={newProperty}
            onChange={(e) => setNewProperty(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyTabs;
