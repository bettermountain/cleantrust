import { useState } from "react";
import { Tabs, Tab, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PropertyTabs = ({ properties, currentProperty, onSelect, onAdd }) => {
  const [newProperty, setNewProperty] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" alignItems="center">
      {/* 物件追加ボタン */}
      <IconButton onClick={() => setOpen(true)} color="primary">
        <AddIcon />
      </IconButton>

      {/* タブ（スクロール可能） */}
      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", flexGrow: 1 }}>
        <Tabs
          value={currentProperty}
          onChange={(e, newValue) => onSelect(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {properties.map((property) => (
            <Tab key={property} label={property} value={property} />
          ))}
        </Tabs>
      </Box>

      {/* 物件追加モーダル */}
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
          <Button
            onClick={() => {
              if (newProperty.trim()) onAdd(newProperty);
              setNewProperty("");
              setOpen(false);
            }}
            variant="contained"
            color="primary"
          >
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyTabs;
