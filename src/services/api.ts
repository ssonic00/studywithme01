import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 만료 처리
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 응답 타입 정의
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  error?: string;
}

interface Todo {
  _id: string;
  period: string;
  text: string;
  completed: boolean;
  author: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  notes?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  isAnonymous: boolean;
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    startDate?: string;
    endDate?: string;
    isActive: boolean;
  };
  settings: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  lastLogin: string;
}

// 인증 관련 API
export const authAPI = {
  // 회원가입
  register: (data: { email: string; password: string; name: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', data),

  // 로그인
  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', data),

  // 로그아웃
  logout: () => api.post<ApiResponse>('/auth/logout'),

  // 사용자 정보 조회
  getMe: () => api.get<ApiResponse<{ user: User }>>('/auth/me'),
};

// 투두 관련 API
export const todoAPI = {
  // 투두 목록 조회
  getTodos: () => api.get<ApiResponse<Todo[]>>('/todos'),

  // 투두 생성
  createTodo: (data: { period: string; text: string; author: string }) =>
    api.post<ApiResponse<Todo>>('/todos', data),

  // 투두 수정
  updateTodo: (id: string, data: { period?: string; text?: string; completed?: boolean }) =>
    api.put<ApiResponse<Todo>>(`/todos/${id}`, data),

  // 투두 삭제
  deleteTodo: (id: string) => api.delete<ApiResponse>(`/todos/${id}`),

  // 투두 완료/미완료 토글
  toggleTodo: (id: string) => api.patch<ApiResponse<Todo>>(`/todos/${id}/toggle`),
};

// 사용자 관련 API
export const userAPI = {
  // 프로필 업데이트
  updateProfile: (data: { name?: string; isAnonymous?: boolean }) =>
    api.put<ApiResponse<{ user: User }>>('/users/profile', data),

  // 구독 정보 조회
  getSubscription: () => api.get<ApiResponse<{ subscription: User['subscription'] }>>('/users/subscription'),

  // 설정 업데이트
  updateSettings: (data: { theme?: string; notifications?: any }) =>
    api.put<ApiResponse<{ user: User }>>('/users/settings', data),
};

export default api; 