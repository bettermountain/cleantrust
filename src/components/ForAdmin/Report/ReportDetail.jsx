import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchReportDetail } from "../../../api";

const ReportDetail = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchReportDetail(reportId);
        setReport(res.data);
      } catch (err) {
        console.error("レポート詳細取得失敗", err);
      }
    };
    load();
  }, [reportId]);

  if (!report) return <Typography>読み込み中...</Typography>;

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        清掃報告詳細
      </Typography>
      <Typography variant="subtitle1">
        日付: {new Date(report.date).toLocaleString()}
      </Typography>
      <Typography variant="subtitle1">
        物件: {report.placename || report.placeid}
      </Typography>
      <Typography variant="subtitle1">
        担当者: {report.staffname || report.staffid}
      </Typography>
      <Typography variant="subtitle1">
        ステータス: {report.status}
      </Typography>
      <Typography variant="subtitle1">
        備考: {report.remarks || "（なし）"}
      </Typography>

      <Box mt={3}>
        <Typography variant="h6">チェック項目一覧</Typography>
        <List>
          {report.items && report.items.map((item, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`項目 ${index + 1}`}
                  secondary={
                    <>
                      <div>項目ID: {item.itemid}</div>
                      {item.photourl ? (
                        <img
                          src={item.photourl}
                          alt={`清掃写真-${index + 1}`}
                          style={{ marginTop: 8, maxWidth: 200, borderRadius: 4 }}
                        />
                      ) : (
                        <div style={{ color: "#999" }}>画像なし</div>
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
    </Paper>
  );
};

export default ReportDetail;
