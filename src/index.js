/*登録フォームの情報*/
const todoValue = document.getElementById("js-todo-ttl"); //入力情報取得
const todoRegister = document.getElementById("js-register-btn"); //「登録する」ボタン

/*「登録する」ボタンの押下時イベント*/
todoRegister.addEventListener("click", () => {
  const todoList = document.getElementById("js-todo-list"); //ulタグ取得
  const todo = document.createTextNode(todoValue.value); //入力値取得
  const litag = document.createElement("li"); //liタグを作る準備
  litag.className = "list"; //liタグにクラス名付与
  const ptag = document.createElement("p"); //pタグを作る準備

  //ul>li>p構造を作る
  ptag.appendChild(todo); //pタグの子要素に入力値を追加
  litag.appendChild(ptag); //liタグの子要素にpタグを追加
  todoList.appendChild(litag); //ulタグの子要素にliタグを追加
});
