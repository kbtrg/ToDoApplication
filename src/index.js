/*getElement*/
const todoValue = document.getElementById("js-todo-ttl"); //入力情報取得
const todoRegister = document.getElementById("js-register-btn"); //「登録する」ボタン
const todoList = document.getElementById("js-todo-list"); //ulタグ取得
const doneList = document.getElementById("js-done-list"); //ulタグ取得

/*「登録する」ボタンのイベント*/
todoRegister.addEventListener("click", () => {
  const todo = document.createTextNode(todoValue.value); //入力値取得
  const litag = document.createElement("li"); //liタグを作る準備
  litag.className = "list"; //liタグにクラス名付与
  const ptag = document.createElement("p"); //pタグを作る準備
  const btns = document.createElement("div"); //btnレイアウトを作る準備
  btns.setAttribute("class", "buttons"); //btnのレイアウトを作る為のクラス付与
  //完了ボタン
  const donebtn = document.createElement("button"); //buttonタグ作成
  donebtn.setAttribute("id", "js-done-btn"); //idを付与
  donebtn.innerHTML = "完了"; //buttonタグの中身文字
  console.log(document.getElementById("js-done-btn"));
  //削除ボタン
  const delbtn = document.createElement("button");
  delbtn.setAttribute("id", "js-del-btn");
  delbtn.innerHTML = "削除";
  //ul>li>p構造を作る
  ptag.appendChild(todo); //pタグの子要素に入力値を追加
  litag.appendChild(ptag); //liタグの子要素にpタグを追加
  btns.appendChild(donebtn); //btnsの子要素にdonebtnを追加
  btns.appendChild(delbtn); //btnsの子要素にdelbtnを追加
  litag.appendChild(btns); //liタグの子要素にbtnsクラスを持つdivタグを追加
  todoList.appendChild(litag); //ulタグの子要素にliタグを追加
});

/*完了ボタンのイベント*/
if (document.getElementById("js-done-btn") !== null) {
  console.log(document.getElementById("js-done-btn"));
  const doneBtn = document.getElementById("js-done-btn"); //完了ボタン取得
  console.log(doneBtn);
  doneBtn.addEventListener("click", () => {
    doneBtn.closest("li").appendTo(doneList); //完了ボタンの親のliタグをdoneListに挿入
  });
}
