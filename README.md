[![CI](https://github.com/CodeSoom/project-react-1-Kwakcena/workflows/CI/badge.svg)](https://github.com/CodeSoom/project-react-1-Kwakcena/actions?query=workflow%3ACI)
[![CD](https://github.com/CodeSoom/project-react-1-Kwakcena/workflows/CD/badge.svg)](https://github.com/CodeSoom/project-react-1-Kwakcena/actions?query=workflow%3ACD)
# 🏠 Kcena Market
혹시 더 이상 사용하지 않는 물건이 있나요? 💁‍♂️ <br>
아니면 새 제품을 구입하기에는 부담스러운 물건이 있나요? 🤔<br>

그렇다면 **Kcena Market**에서 물건을 찾고 중고 거래를 해 보세요! 😄

## 🎥 프로젝트 소개 영상
youtube: https://youtu.be/4wGEzQhSZ7o

- 사용자는 로그인, 회원가입을 할 수 있습니다.
- 상품 판매 시 상품의 사진을 판매글과 함께 첨부할 수 있습니다. 간편하게 drag and drop으로 이미지 파일을 추가할 수 없을까 고민하다가 `React dropzone` 라이브러리를 알게 되어 이를 도입하였습니다.
- 사용자는 판매중인 상품을 수정하거나 삭제할 수 있으며, 로그인, 회원가입, 판매하기, 수정하기 등의 모든 입력 form에는 `formik` 과 `Yup` 라이브러리를 적용하여 잘못된 입력에 대한 `validation`을 수행하도록 하였습니다.
- 실수로 상품을 삭제하거나 로그아웃 하는 일이 발생하지 않도록 `Context API` 를 이용하여 confirm message를 거쳐 삭제 또는 로그아웃이 되도록 하였습니다.
- 배포와 테스트 자동화를 위해 `github actions` 를 이용한 `CI / CD` 를 도입하였습니다.

## 기술 스택
- JavaScript
- React
- Redux, Redux Toolkit
- Emotion(styled)
- Firebase

## Install dependencies
```
npm install
```

## Lint
```
npm run lint
```

## Start dev server
```
npm run start
```

## Run build
```
npm run build
```

## Run coverage test
```
npm run coverage
```

## Run unit test
```
npm run test:unit
```