# StudyWithMe - SaaS 투두리스트 앱

StudyWithMe는 학습과 계획 관리를 위한 SaaS(Software as a Service) 투두리스트 애플리케이션입니다.

## 🚀 주요 기능

### 무료 플랜
- ✅ 기본 투두리스트 관리
- ✅ 실명/익명 모드
- ✅ 기간별 그룹화
- ✅ 로컬 저장소 지원

### 프리미엄 플랜 (예정)
- 🔄 클라우드 동기화
- 🔄 팀 협업 기능
- 🔄 고급 분석 및 리포트
- 🔄 API 접근 권한
- 🔄 우선순위 설정
- 🔄 마감일 알림

## 🛠 기술 스택

### 프론트엔드
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안정성
- **Material-UI** - 디자인 시스템
- **Axios** - HTTP 클라이언트
- **React Router** - 라우팅

### 백엔드
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **MongoDB** - 데이터베이스
- **Mongoose** - ODM
- **JWT** - 인증
- **bcryptjs** - 비밀번호 해싱

### 인프라
- **Docker** - 컨테이너화
- **Vercel** - 프론트엔드 배포
- **Railway/Heroku** - 백엔드 배포
- **MongoDB Atlas** - 클라우드 데이터베이스

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/studywithme.git
cd studywithme
```

### 2. 프론트엔드 설정
```bash
cd frontend
npm install
npm start
```

### 3. 백엔드 설정
```bash
cd server
npm install
```

### 4. 환경 변수 설정
```bash
# server/.env 파일 생성
cp server/config.env server/.env
```

`.env` 파일을 편집하여 다음 값들을 설정하세요:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/studywithme
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
```

### 5. 데이터베이스 설정
MongoDB가 설치되어 있지 않다면:
```bash
# Docker로 MongoDB 실행
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 6. 백엔드 실행
```bash
cd server
npm run dev
```

## 🏗 SaaS 개발 단계

### Phase 1: 기본 기능 (현재)
- [x] 사용자 인증 (회원가입/로그인)
- [x] 투두리스트 CRUD
- [x] 실명/익명 모드
- [x] 로컬 저장소

### Phase 2: 클라우드 동기화
- [ ] 서버 데이터베이스 연동
- [ ] 실시간 동기화
- [ ] 다중 기기 지원

### Phase 3: 고급 기능
- [ ] 팀 협업
- [ ] 파일 첨부
- [ ] 댓글 시스템
- [ ] 활동 히스토리

### Phase 4: 구독 시스템
- [ ] Stripe 결제 연동
- [ ] 플랜별 기능 제한
- [ ] 사용량 분석
- [ ] 청구서 관리

### Phase 5: 확장 기능
- [ ] API 제공
- [ ] 웹훅 지원
- [ ] 고급 분석
- [ ] 모바일 앱

## 💰 수익화 모델

### 무료 플랜
- 기본 투두리스트 기능
- 최대 50개 할 일
- 로컬 저장소만 지원

### Basic 플랜 ($5/월)
- 무제한 할 일
- 클라우드 동기화
- 기본 분석
- 이메일 알림

### Premium 플랜 ($15/월)
- 팀 협업 기능
- 고급 분석 및 리포트
- API 접근
- 우선 지원

## 🔒 보안

- JWT 기반 인증
- 비밀번호 해싱 (bcrypt)
- CORS 설정
- Rate limiting
- Helmet 보안 헤더
- 입력 검증

## 📊 모니터링

- 서버 헬스 체크
- 에러 로깅
- 사용자 활동 추적
- 성능 모니터링

## 🚀 배포

### 프론트엔드 (Vercel)
```bash
npm run build
vercel --prod
```

### 백엔드 (Railway)
```bash
railway login
railway init
railway up
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/yourusername/studywithme](https://github.com/yourusername/studywithme)

---

**StudyWithMe** - 함께하는 학습 관리 플랫폼 🎓
