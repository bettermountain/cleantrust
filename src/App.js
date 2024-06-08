import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import {
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  InputLabel,
  FormControl,
  Box,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './App.css';

const cleaningItems = [
  'トイレの床', 'トイレの便座の裏', '部屋全体', 'ベットと壁の間', 'ベットメイキング',
  'テレビの裏', 'ゲーム機全体', 'キッチン全体', 'キッチンのゴミ箱の中', '机の下',
  '机の上', '階段', '玄関内側', '下駄箱内', '玄関外側',
  '冷蔵庫の中', 'プロジェクターの部品が揃っている', '押し入れの中', 'クローゼットの扉が閉まっている', 'クローゼットの中',
  '水が配置してある', 'トイレットペーパが十分', 'ティッシュが配置してある', '食器棚', 'キッチンの引き出し',
  'コップが洗ってある', 'シンクに生ゴミがない', 'リビングの床', '部屋の右奥の角（床）', '椅子が揃っている',
];

const properties = ['物件A', '物件B', '物件C', '物件D'];


const Input = styled('input')({
  display: 'none',
});

const Image = styled('img')({
  marginTop: '10px',
  maxWidth: '100px',
  maxHeight: '100px',
});

const AppContainer = styled(Container)({
  marginTop: '20px',
});

const CountdownBox = styled(Box)({
  marginTop: '20px',
});

const CardContainer = styled(Card)({
  marginTop: '20px',
});

const FormControlStyled = styled(FormControl)({
  margin: '20px 0',
  minWidth: 120,
});

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [photos, setPhotos] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(dateString);
  }, []);

  const startChecklist = () => {
    const shuffled = cleaningItems.sort(() => 0.5 - Math.random());
    setSelectedItems(shuffled.slice(0, 5));
    setPhotos({});
    setTimerStarted(true);
  };

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    setPhotos(prevPhotos => ({ ...prevPhotos, [index]: URL.createObjectURL(file) }));
  };

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const handleTimeOverReasonChange = (event) => {
    setPhotos(prevPhotos => ({ ...prevPhotos, [`reason-`]: event.target.value }));
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeOver(true);
      return <Typography variant="h6" color="error">タイムオーバー</Typography>;
    } else {
      return <Typography variant="h6">{minutes}:{seconds}</Typography>;
    }
  };

  return (
    <AppContainer>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>清掃チェックリスト</Typography>
      <Typography variant="subtitle1">今日の日付: {currentDate}</Typography>
      {selectedItems.length === 0 &&(<>
      <FormControlStyled fullWidth>
        <InputLabel>物件を選択</InputLabel>
        <Select value={selectedProperty} onChange={handlePropertyChange}>
          {properties.map((property, index) => (
            <MenuItem key={index} value={property}>{property}</MenuItem>
          ))}
        </Select>
      </FormControlStyled>
      </>)}
      {timerStarted && (
        <CountdownBox>
          <Countdown date={Date.now() + 30000} renderer={renderer} />
        </CountdownBox>
      )}
      {!timeOver ?
      <Grid container spacing={3}>
        {selectedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardContainer>
              <CardContent>
                <Typography variant="h6">{item}</Typography>
                <Input
                  accept="image/*"
                  id={`upload-photo-${index}`}
                  type="file"
                  onChange={(event) => handlePhotoUpload(index, event)}
                />
                <label htmlFor={`upload-photo-${index}`}>
                  <Button variant="contained" color="secondary" component="span">
                    写真をアップロード
                  </Button>
                </label>
                {photos[index] && (
                  <Image src={photos[index]} alt={`清掃項目 ${index + 1}`} />
                )}
              </CardContent>
              <CardActions>
                {photos[index] && (
                  <Button variant="contained" color="primary">
                    確認
                  </Button>
                )}
              </CardActions>
            </CardContainer>
          </Grid>
        ))}
      </Grid>
      :<>
      <TextField
        label="タイムオーバーとなった理由"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        onChange={(event) => handleTimeOverReasonChange(event)}
      />
      </>}
      {!timerStarted ?
      <Button variant="contained" color="primary" onClick={startChecklist}>
        清掃完了
      </Button>
      :<Button variant="contained" color="primary">
          送信
        </Button>
        }
    </AppContainer>
  );
}

export default App;