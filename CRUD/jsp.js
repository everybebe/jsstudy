//?n_title=흥흥&n_writer=bbb&n_cont=hhh&n_skill=js&n_skill=java&n_skill=oracle
//    let title = location.href.split("?")[1].split("&")[0].split("=")[1];
/*  
인코딩함수    escape      encodeURI    encodeURIComponent
디코딩함수    unescape    decodeURI    decodeURIComponent
*/
// 위의 방식으로는 제대로 적용할 수 없음(case by case를 사람이 대처?)
// 위의 상황을 일반화시킴(자동화)
 
const request = {};  // 네임스페이스용 빈 객체(안 빈 거시어도 상관없음)
request.getParameter = function(pName){
    if(location.href.indexOf("?") == -1) return;

    let queryString = location.href.split("?")[1]; // ? 오른쪽 문자열을 쿼리스트링이라 부름
    let items  = queryString.split("&");
    for(let i=0; i<items.length; i++){
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];
        if(name == pName){
            val = decodeURIComponent(val);
            val = val.replaceAll("+", " "); //공백이 +로 넘어오기 때문에 재가공!
            return val;
        }
    }
    //return "name이 없어용 확인하셍"; // 개발 중에는 우리 이렇게 써용!
    return null;
}

// 같은 name이 여러개인 경우에 사용하는 메소드, 배열을 리턴
request.getParameterValues = function(pName){
    if(!location.href.includes("?")) return;
    let rslt = [];
    let queryString = location.href.split("?")[1]; // ? 오른쪽 문자열을 쿼리스트링이라 부름
    let items  = queryString.split("&");
    for(let i=0; i<items.length; i++){
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];
        if(name == pName){
            val = decodeURIComponent(val);
            val = val.replaceAll("+", " "); //공백이 +로 넘어오기 때문에 재가공!
            rslt.push(val); // return으로 멈추면 안되고, 끝까지 찾아야 함!
        }
    }
    if(!rslt.length) return null;  // 암것도 못 찾았다면 null 리턴
    return rslt;   // 배열을 리턴!

}