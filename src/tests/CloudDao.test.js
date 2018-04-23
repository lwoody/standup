import FirebaseDao from '../FirebaseDao';
import config from '../config';
import firebase from 'firebase';

var article = {
  user: "Genji",
  content: "겐지가 함께한다.",
  urls: [{
    url: "https://namu.wiki/w/%EA%B2%90%EC%A7%80(%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98)",
    title: "겐지(오버워치)",
    description: "블리자드 엔터테인먼트 사의 FPS 게임 오버워치의 영웅.기계가 되어버린 몸을 받아들여 내면의 평화를 찾은 강력한 사이보그 닌자.",
    imageUrl: "https://image-proxy.namuwikiusercontent.com/r/https%3A%2F%2Fd1u1mce87gyfbn.cloudfront.net%2Fmedia%2Fartwork%2Fgenji-concept.jpg",
    imgWidth: 640,
    imgHeight: 480,
    thumbnailUrl: "https://image-proxy.namuwikiusercontent.com/r/http%3A%2F%2Fi66.tinypic.com%2F10mpje9.jpg",
    thumbnailWidth: 80,
    thumbnailHeight: 80
  }]
}

//Befor Test - firebase 초기화 과정
//firebase.initializeApp(config);
var dao = new FirebaseDao(config);

it('upload article', function () {

  //let inserted = firebase.database().ref().child('posts').push(article);
  let inserted = dao.insert(article);
  // 입력이 되었는지 key 값을 가지고 검색해서 확인
  dao.getArticle(inserted.key).on('value', (snapShot) => {
    //키 값이 같은지 테스트 케이스 작성
    expect(snapShot.key).toEqual(inserted.key);
  });
  return inserted;//이 리턴값이 존재해야 db 동기화됨 - 왜?
});

it('upload article and edit and delete', function () {

  //given
  //공통 키값
  let key = dao.newKey();
  //입력
  var updated = dao.update(key, article);

  dao.getArticle(key).on('value', (snapShot) => {
    //같은 값이 들어 갔는지 확인
    expect(snapShot.key).toEqual(key);
    //수정
    dao.update(key, article);
    //삭제. 데이터의 확인을 위해서는 주석 처리.
    dao.remove(key);
  });
  return updated;
});