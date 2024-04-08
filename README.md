## 블로그 만들기 프론트 페이지

![image](https://github.com/keinn51/make-my-blog/assets/79993356/76008a29-699d-4ea7-b6dd-b4a051c77c7e)

https://kyungsle.kro.kr:5001/

### 소개글

#### ⭐⭐ 이 프로젝트는 라즈베리파이에서 실행되는 중입니다~! ⭐⭐

개인 블로그를 직접 만들어보기 위하여 제작한 블로그 클라이언트 레포지토리입니다.

NextJS를 사용했으며, 노션과 비슷한 스타일로 작성 가능합니다. 기능은 아래와 같습니다.

- 글 추가, 삭제, 수정
- 글 정렬하기
- 이미지 업로드하기

홈서버를 사용하면 port를 제거하지 못한다는 사실을 듣고, 배포는 서버를 구매하여 진행하는 것이 옳구나 생각이 들었습니다.

### 사용 방법

env에 API 포트 및 이미지 포트를 적어둡니다.

```md
NEXT_PUBLIC_API_HOST=http://localhost:...
NEXT_PUBLIC_FILE_SERVER_HOST=http://localhost:...
```

이제 실행시키면 됩니다!

```shell
npm i
npm run dev
```

### 추후에 할 것?

- 코드 리팩토링 해보기
- 더 많은 기능 추가해보기
- 테스트 코드 작성하기
