import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchReportDetail } from "../../../api";

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchReportDetail(reportId);
        setReport(res.data);
      } catch (err) {
        console.error("レポート詳細取得失敗", err);
        setError("詳細データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [reportId]);

  return (
    <Paper sx={{ padding: 3 }}>
      {/* タイトル行（戻るボタン＋タイトル） */}
      <Box display="flex" alignItems="center" mb={2}>
        <Tooltip title="一覧に戻る" placement="top" arrow>
          <IconButton onClick={() => navigate("/cleantrust/admin/reportlist")} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          清掃報告詳細
        </Typography>
      </Box>

      {/* ローディング・エラー・データ表示 */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            日付: {new Date(report.date).toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            物件: {report.placename || report.placeid}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            担当者: {report.staffname || report.staffid}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            ステータス: {report.status}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            備考: {report.remarks || "（なし）"}
          </Typography>

          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              チェック項目一覧
            </Typography>
            <List>
              {report.items && report.items.map((item, index) => (
                <Box key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`項目 ${index + 1}`}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            項目ID: {item.itemid}
                          </Typography>
                          {item.photourl ? (
                            <img
                              src={item.photourl}
                              alt={`清掃写真-${index + 1}`}
                              style={{
                                marginTop: 8,
                                maxWidth: 200,
                                borderRadius: 4,
                                border: "1px solid #ccc",
                              }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.disabled">
                              画像なし
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ReportDetail;
