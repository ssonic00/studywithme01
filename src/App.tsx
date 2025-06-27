import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Person as PersonIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Avatar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  period: string;
  text: string;
  completed: boolean;
  author?: string;
}

interface UserProfile {
  name: string;
  isAnonymous: boolean;
}

// localStorage 키 상수
const TODO_STORAGE_KEY = 'studyWithMe_todos';
const USER_PROFILE_KEY = 'studyWithMe_userProfile';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [period, setPeriod] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    isAnonymous: false
  });

  // 컴포넌트가 마운트될 때 localStorage에서 투두리스트와 사용자 프로필 불러오기
  useEffect(() => {
    // 투두리스트 불러오기
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error('저장된 투두리스트를 불러오는 중 오류가 발생했습니다:', error);
        setSnackbar({ open: true, message: '저장된 데이터를 불러오는 중 오류가 발생했습니다.' });
      }
    }

    // 사용자 프로필 불러오기
    const savedProfile = localStorage.getItem(USER_PROFILE_KEY);
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('저장된 사용자 프로필을 불러오는 중 오류가 발생했습니다:', error);
      }
    }
  }, []);

  // 투두리스트가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // 사용자 프로필이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  // localStorage에서 모든 데이터 삭제하는 함수
  const clearAllTodos = () => {
    if (window.confirm('모든 할 일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setTodos([]);
      localStorage.removeItem(TODO_STORAGE_KEY);
      setSnackbar({ open: true, message: '모든 할 일이 삭제되었습니다.' });
    }
  };

  // 프로필 다이얼로그 열기
  const handleOpenProfileDialog = () => {
    setProfileDialogOpen(true);
  };

  // 프로필 다이얼로그 닫기
  const handleCloseProfileDialog = () => {
    setProfileDialogOpen(false);
  };

  // 프로필 저장
  const handleSaveProfile = () => {
    if (!userProfile.isAnonymous && userProfile.name.trim() === '') {
      setSnackbar({ open: true, message: '이름을 입력해주세요.' });
      return;
    }
    setProfileDialogOpen(false);
    setSnackbar({ open: true, message: '프로필이 저장되었습니다.' });
  };

  // 현재 표시할 사용자 이름
  const getDisplayName = () => {
    if (userProfile.isAnonymous) {
      return '익명 사용자';
    }
    return userProfile.name || '이름 없음';
  };

  const handleAddTodo = () => {
    if (input.trim() === '') {
      setSnackbar({ open: true, message: '할 일을 입력해주세요.' });
      return;
    }
    if (period.trim() === '') {
      setSnackbar({ open: true, message: '기간을 입력해주세요.' });
      return;
    }

    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: input, period } : todo
      ));
      setEditingId(null);
      setSnackbar({ open: true, message: '할 일이 수정되었습니다.' });
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        period,
        text: input,
        completed: false,
        author: getDisplayName()
      };
      setTodos([...todos, newTodo]);
      setSnackbar({ open: true, message: '할 일이 추가되었습니다.' });
    }
    setInput('');
    setPeriod('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setSnackbar({ open: true, message: '할 일이 삭제되었습니다.' });
  };

  const handleEditTodo = (todo: Todo) => {
    setInput(todo.text);
    setPeriod(todo.period);
    setEditingId(todo.id);
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 날짜/주차/월별로 그룹화
  const groupedTodos = todos.reduce((groups, todo) => {
    const group = groups[todo.period] || [];
    return { ...groups, [todo.period]: [...group, todo] };
  }, {} as Record<string, Todo[]>);

  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ mr: 2 }}>
            {todos.length}개의 할 일
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleOpenProfileDialog}
            sx={{ mr: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          {todos.length > 0 && (
            <Button 
              color="inherit" 
              onClick={clearAllTodos}
              sx={{ 
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              전체 삭제
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              sx={{ width: 200 }}
              variant="outlined"
              placeholder="기간 (예: 1주차, 1월)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="할 일을 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTodo}
              sx={{ minWidth: 100 }}
              startIcon={<AddIcon />}
            >
              {editingId !== null ? '수정' : '추가'}
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {Object.entries(groupedTodos).map(([period, periodTodos]) => (
            <Box key={period} sx={{ mb: 4 }}>
              <List>
                {periodTodos.map((todo) => (
                  <ListItem
                    key={todo.id}
                    divider
                    sx={{
                      bgcolor: 'background.paper',
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                        color="primary"
                        sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                      />
                      <Typography 
                        sx={{ 
                          mr: 2,
                          color: 'primary.main',
                          fontWeight: 'bold',
                          minWidth: 80,
                          opacity: todo.completed ? 0.7 : 1,
                        }}
                      >
                        {todo.period}
                      </Typography>
                      <ListItemText 
                        primary={todo.text}
                        secondary={todo.author && `작성자: ${todo.author}`}
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                          flex: 1,
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditTodo(todo)}
                          sx={{ 
                            mr: 1,
                            '&:hover': { 
                              color: 'primary.main',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteTodo(todo.id)}
                          sx={{ 
                            '&:hover': { 
                              color: 'error.main',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}

          {todos.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                할 일을 추가해보세요!
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>

      {/* 프로필 설정 다이얼로그 */}
      <Dialog open={profileDialogOpen} onClose={handleCloseProfileDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />
            프로필 설정
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile.isAnonymous}
                  onChange={(e) => setUserProfile({
                    ...userProfile,
                    isAnonymous: e.target.checked
                  })}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {userProfile.isAnonymous ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  익명 모드
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              {userProfile.isAnonymous 
                ? '익명 모드에서는 "익명 사용자"로 표시됩니다.' 
                : '실명 모드에서는 입력한 이름이 표시됩니다.'}
            </Typography>
            
            {!userProfile.isAnonymous && (
              <TextField
                fullWidth
                label="이름"
                variant="outlined"
                value={userProfile.name}
                onChange={(e) => setUserProfile({
                  ...userProfile,
                  name: e.target.value
                })}
                placeholder="이름을 입력하세요"
                sx={{ mt: 2 }}
              />
            )}
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                현재 표시될 이름: <strong>{getDisplayName()}</strong>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>취소</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
