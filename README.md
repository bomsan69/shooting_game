# Tactical Strike

순수 HTML5 Canvas + Vanilla JS로 만든 탑다운 카운터-스트라이크 스타일 웹 게임. 외부 라이브러리/프레임워크 없이 `index.html` 단일 파일로 동작한다.

## Project Info

| 항목 | 값 |
|---|---|
| **Path** | `/Users/jeahyungchung/Project/AI/opencode/kimi3_game` |
| **Repository** | `https://github.com/bomsan69/shooting_game` |

## 개요

- 탑다운 시점의 CS 스타일 전술 슈터: 초크포인트, 봄사이트 A/B, 엄폐물이 있는 맵
- 순찰(PATROL) → 경계(ALERT) → 추격/교전(CHASE_ATTACK) 상태머신을 가진 AI 봇 (레이캐스트 시야, 헤드샷 판정)
- HP/방어구/탄약 HUD, 킬피드, 레이더(미니맵)
- 난이도 1~5단계, 레벨마다 봇 수·명중률·데미지·플레이어 무기(권총/SMG/라이플/마크스맨/LMG)가 다르게 적용됨
- 탄약 픽업 상자 및 탄약 소진 시 HUD 경고
- Object Pooling(총알/파티클)으로 60FPS 목표 성능 유지

## 조작법

| 키/입력 | 동작 |
|---|---|
| `W` `A` `S` `D` | 이동 (8방향, 가속/관성) |
| 마우스 이동 | 조준 (캐릭터가 커서 방향으로 회전) |
| 마우스 왼쪽 클릭 (홀드) | 사격 (연사) |
| `R` | 재장전 |

게임을 열면 먼저 **레벨 선택 화면**이 뜨며, LEVEL 1(Recruit, 가장 쉬움) ~ LEVEL 5(Hell, 가장 어려움) 중 하나를 클릭해야 시작된다. 한 번 선택한 레벨은 해당 플레이 동안 유지되며, 다른 레벨로 바꾸려면 페이지를 새로고침해야 한다.

## 실행 방법

### 1. 브라우저에서 바로 열기

`index.html`을 브라우저로 직접 열어도 동작한다.

### 2. Node.js 서버로 실행

```bash
node server.js
```

기본적으로 `http://localhost:8080` 에서 서비스된다. `PORT` 환경변수로 포트를 바꿀 수 있다.

### 3. Docker로 실행

```bash
docker compose up --build
```

또는

```bash
docker build -t tactical-strike .
docker run -p 8080:8080 tactical-strike
```

`http://localhost:8080` 접속 후 레벨을 선택하면 플레이할 수 있다.

## 문서

| 파일 | 내용 |
|---|---|
| [SPEC.md](SPEC.md) | 게임 메커니즘/UI/난이도 시스템 전체 스펙 |
| [FLOWS.md](FLOWS.md) | 6단계 빌드 순서 및 각 단계별 검증 게이트 |
| [AGENTS.md](AGENTS.md) | 에이전트 실행 프로토콜 및 물리/충돌 규칙 |
| [CLAUDE.md](CLAUDE.md) | Claude Code 자율 실행 규칙 |
