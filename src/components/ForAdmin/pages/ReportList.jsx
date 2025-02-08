import { Typography, Paper, Box } from "@mui/material";

const ReportList = () => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5">結果確認ページ</Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography>ここにレポート一覧を表示します。</Typography>
      </Box>
    </Paper>
  );
};

export default ReportList;
