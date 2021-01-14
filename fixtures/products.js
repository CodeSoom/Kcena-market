const products = [
  {
    id: 1,
    category: '가구/인테리어',
    createAt: '1608828208635',
    description: '해외 이민으로 인해 가전제품 팝니다!010-****-****로 연락주세요!',
    price: 350000,
    productImages: [
      { name: '가전1.jpeg', imageUrl: '가전1url' },
      { name: '가전2.jpeg', imageUrl: '가전2url' },
      { name: '가전3.jpeg', imageUrl: '가전3url' },
    ],
    region: '서울시 강남구',
    title: '해외 이사로 인한 가전제품 팔아요!',
    user: {
      displayName: '홍길동/연구과제팀/직원',
      email: 'ghdrlfehd@test.com',
      uid: 'ghdrlfehd1234',
    },
  },
  {
    id: 2,
    category: '여성의류',
    createAt: '1609754642862',
    description: '팝니다.220 사이즈에요.',
    price: 25000,
    productImages: [
      { name: '신발1.jpeg', imageUrl: '신발1url' },
    ],
    region: '인천 남구',
    title: '여성 운동화',
    user: {
      displayName: '김 철수',
      email: 'rlacjftn@test.com',
      uid: 'rlacjftn1234',
    },
  },
  {
    id: 3,
    category: '남성패션/잡화',
    createAt: '1609763267254',
    description: '청바지 팝니다.32 사이즈 청바지에요.',
    price: 25000,
    productImages: [
      { name: '청바지1.jpeg', imageUrl: '청바지1url' },
    ],
    region: '서울 강남',
    title: '청바지 팝니다.',
    user: {
      displayName: '김 철수',
      email: 'rlacjftn@test.com',
      uid: 'rlacjftn1234',
    },
  },
  {
    id: 4,
    category: '디지털/가전',
    createAt: '1608838040530',
    description: '아이패드 에어 중고 팔아요64기가 와이파이 버전입니다.',
    price: 250000,
    productImages: [
      { name: '아이패드1.jpeg', imageUrl: '아이패드1url' },
      { name: '아이패드2.jpeg', imageUrl: '아이패드2url' },
      { name: '아이패드3.jpeg', imageUrl: '아이패드3url' },
    ],
    region: '서울',
    title: '아이패드 에어 팔아요.',
    user: {
      displayName: '홍길동/연구과제팀/직원',
      email: 'ghdrlfehd@test.com',
      uid: 'ghdrlfehd1234',
    },
  },
];

const userProducts = [
  {
    id: 1,
    category: '가구/인테리어',
    createAt: '1608828208635',
    description: '해외 이민으로 인해 가전제품 팝니다!010-****-****로 연락주세요!',
    price: 350000,
    productImages: [
      { name: '가전1.jpeg', imageUrl: '가전1url' },
      { name: '가전2.jpeg', imageUrl: '가전2url' },
      { name: '가전3.jpeg', imageUrl: '가전3url' },
    ],
    region: '서울시 강남구',
    title: '해외 이사로 인한 가전제품 팔아요!',
    user: {
      displayName: '홍길동/연구과제팀/직원',
      email: 'ghdrlfehd@test.com',
      uid: 'ghdrlfehd1234',
    },
  },
  {
    id: 4,
    category: '디지털/가전',
    createAt: '1608838040530',
    description: '아이패드 에어 중고 팔아요64기가 와이파이 버전입니다.',
    price: 250000,
    productImages: [
      { name: '아이패드1.jpeg', imageUrl: '아이패드1url' },
      { name: '아이패드2.jpeg', imageUrl: '아이패드2url' },
      { name: '아이패드3.jpeg', imageUrl: '아이패드3url' },
    ],
    region: '서울',
    title: '아이패드 에어 팔아요.',
    user: {
      displayName: '홍길동/연구과제팀/직원',
      email: 'ghdrlfehd@test.com',
      uid: 'ghdrlfehd1234',
    },
  },
];

export default products;

export { userProducts };
