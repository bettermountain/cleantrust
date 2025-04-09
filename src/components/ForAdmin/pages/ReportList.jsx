import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { fetchReports } from "../../../api";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const loadReports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchReports();
      setReports(res.data);
    } catch (err) {
      console.error("レポート取得失敗", err);
      setError("レポートの取得に失敗しました。しばらくしてから再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleRowClick = (reportId) => {
    navigate(`/cleantrust/admin/reportlist/${reportId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getDisplayStatus = (report) => {
    if (report.status === "done") {
      return report.reportcount === report.reportedcount ? "完了" : "写真不備";
    } else if (report.status === "timeover") {
      return "時間超過";
    } else if (report.status === "started") {
      return "未提出";
    } else {
      return report.status;
    }
  };

  const getRemarksStatus = (remarks) => {
    return remarks && remarks.trim() !== "" ? "あり" : "なし";
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>清掃報告一覧</Typography>
        <IconButton onClick={loadReports}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>物件</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>備考</TableCell>
              <TableCell>担当者</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              reports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report) => (
                  <TableRow
                    key={report.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(report.id)}
                  >
                    <TableCell>{new Date(report.date).toLocaleString()}</TableCell>
                    <TableCell>{report.placename || report.placeid}</TableCell>
                    <TableCell>{getDisplayStatus(report)}</TableCell>
                    <TableCell>{getRemarksStatus(report.remarks)}</TableCell>
                    <TableCell>{report.staffname || report.staffid}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={reports.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

export default ReportList;
