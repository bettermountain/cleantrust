// // src/components/Profile.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Paper, Typography, Button, Box } from "@mui/material";
// import { getMe } from "../../api";

// // Profileコンポーネント：ユーザーのプロフィール情報を表示する
// const Profile = ({ token, setToken }) => {
//   // プロフィール情報を保持するためのstate
//   const [profile, setProfile] = useState(null);
//   // ページ遷移用のnavigate関数
//   const navigate = useNavigate();

//   // コンポーネントの初回レンダー時とtokenの変更時に実行される副作用
//   useEffect(() => {
//     // トークンがない場合はログインページにリダイレクト
//     if (!token) {
//       navigate("/cleantrust/login");
//       return;
//     }

//     // トークンを使ってプロフィール情報を取得
//     getMe(token)
//       .then((res) => setProfile(res.data)) // 成功時にプロフィール情報を保存
//       .catch(() => {
//         // 失敗時はトークンを削除してログインページにリダイレクト
//         setToken(null);
//         localStorage.removeItem("token");
//         navigate("/cleantrust/login");
//       });
//   }, [token]);

//   // ログアウト処理
//   const handleLogout = () => {
//     setToken(null); // トークンを無効化
//     localStorage.removeItem("token"); // ローカルストレージから削除
//     navigate("/cleantrust/login"); // ログインページに遷移
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//       {/* 中央に配置されたペーパーコンテナ */}
//       <Paper elevation={3} sx={{ padding: 4, textAlign: "center", width: 300 }}>
//         {/* プロフィール情報が取得できていれば表示 */}
//         {profile ? (
//           <>
//             <Typography variant="h6">こんにちは、{profile.username} さん</Typography>
//             <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>
//               ログアウト
//             </Button>
//           </>
//         ) : (
//           // 読み込み中の表示
//           <Typography>読み込み中...</Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Profile;
