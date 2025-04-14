// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://cleantrust.jp", // FastAPIの起動URL　さくら
});

// ✅ JWTトークンを自動付与（リクエスト前に付ける）
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔐 ユーザー認証系

export const loginUser = (username, password) =>
  API.post(
    "/auth/token",
    new URLSearchParams({ username, password }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

export const registerUser = (username, password) =>
  API.post("/auth/register", { username, password });

export const getMe = () => API.get("/auth/me");

// ✅ タスク操作（物件単位）
// 🔸 タスク一覧
export const fetchTasks = (place_id) =>
  API.get(`/properties/tasks?place_id=${place_id}`);

// 🔸 タスク追加
export const addTask = (placeId, text, number, limit_time) =>
  API.post("/properties/tasks", {
    place_id: placeId,
    itemtext: text,
    number,
    limit_time, // 数値で送信
  });

export const updateTask = (taskId, itemtext, limit_time) =>
  API.put(`/properties/tasks/${taskId}`, {
    itemtext,
    limit_time,
  });

export const updateItemCount = (placeId, itemcount) =>
  API.patch(`/properties/itemcount`, { place_id: placeId, itemcount });

// 🔸 並び順更新
export const updateTasksOrder = (place_id, tasks) =>
  API.post("/properties/tasks/reorder", { place_id, tasks });

// 🔸 タスク削除
export const deleteTask = (task_id) =>
  API.delete(`/properties/tasks/${task_id}`);

// スタッフ関連 API
export const fetchStaffs = async () => {
  return await API.get("/staffs"); // トークンは interceptors で付与される
};
export const fetchPublicStaffs = async (user_id) => {
  return await API.get(`/api/public/staffs?user_id=${user_id}`);
};
export const addStaff = (staff) => API.post("/staffs", staff);
export const updateStaff = (id, name) => API.put(`/staffs/${id}`, { name });
export const deleteStaff = (id) => API.delete(`/staffs/${id}`);


// ✅ Place（物件）関連API

// 物件一覧
export const fetchPlaces = () => API.get("/properties/places");

// 物件追加
export const addPlace = (placename) =>
  API.post("/properties/places", { placename });

// 物件更新
export const updatePlace = (placeId, placename) =>
  API.put(`/properties/places/${placeId}`, { placename });

// 物件削除（＋タスクも同時に）
export const deletePlace = (placeId) =>
  API.delete(`/properties/places/${placeId}`);


// 📝 レポート送信（報告登録）
  // 清掃開始
export const startReport = (userid, placeid, staffid) =>
API.post("/reports/start", { userid, placeid, staffid });

// 清掃完了
export const completeReport = (report_id, data) =>
API.post(`/reports/complete/${report_id}`, data);

export const fetchReports = () => API.get("/reports");

export const fetchReportDetail = (reportId) =>
  API.get(`/reports/${reportId}`);

export const updateReportRemarks = (reportId, remarks) =>
API.patch(`/reports/remarks`, { report_id: reportId, remarks });

// 🔓 認証不要の公開タスク取得（Checker用）
export const fetchPublicTasks = async (user_id, place_id) => {
  const res = await API.get(`/api/public/tasks`, {
    params: {
      user_id,
      place_id,
    },
  });
  return res.data;
};

// 🔓 認証不要の公開プレース一覧（Checker用）
export const fetchPublicPlaces = async (user_id) => {
  const res = await API.get("/api/public/places", {
    params: { user_id },
  });
  return res.data;
};


// 🔹 圧縮付きの画像アップロード
export const uploadPhoto = async (reportId, index, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`/api/reports/upload-photo?report_id=${reportId}&index=${index}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};
