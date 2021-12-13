const taskValue = document.getElementById("js-todo-ttl"); //入力情報取得
const taskAddBtn = document.getElementById("js-register-btn"); //「登録する」ボタン
const todoList = document.getElementById("js-todo-list"); //ulタグ取得
const doneList = document.getElementById("js-done-list"); //ulタグ取得
const addErrorMes = document.getElementsByClassName("add-error-mes"); //テキストエラーメッセージ

/* ストレージデータ用の変数 */
const storage = localStorage; //localStorageをstorageに代入
let dataList = [];

/* ストレージデータの読み込み */
document.addEventListener("DOMContentLoaded", () => {
  // 1. ストレージデータ（JSON）の読み込み
  const json = storage.todoList;
  if (json === undefined) {
    return; //ストレージにデータがない場合、何もしない
  }
  // 2. JSONをオブジェクトの配列に変換して配列listに代入
  dataList = JSON.parse(json);
  // 3. 配列listのデータを元にテーブルに要素を追加
  for (const item of dataList) {
    addTask(item);
  }
});

/* 登録するボタンのイベント */
taskAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  //
  /* ローカルストレージで保存 */
  //今は登録するボタン押下時に実行されるが、
  //あとでリロード時、ブラウザ終了時に実行されるように書き換える.
  const item = {};
  item.undo = todoList.getElementsByTagName("p").value;
  item.done = doneList.getElementsByTagName("p").value;
  dataList.push(item);
  storage.setItem("todoList", JSON.stringify(dataList));
  console.log(dataList);
  //
  if (taskValue.value !== "") {
    //addErrorMes.classList.add("js-add-error-mes-none");
    const task = taskValue.value;
    addTask(task);
    taskValue.value = ""; //入力値の初期化
  } else {
    //addErrorMes.classList.remove("js-add-error-mes-none");
  }
});

//登録メソッド
const addTask = (task) => {
  const todo = document.createTextNode(task); //入力値取得
  const litag = document.createElement("li"); //liタグを作る準備
  litag.className = "list"; //liタグにクラス名付与
  const ptag = document.createElement("p"); //pタグを作る準備
  const btns = document.createElement("div"); //btnレイアウトを作る準備
  btns.setAttribute("class", "buttons"); //btnのレイアウトを作る為のクラス付与
  /*完了ボタン*/
  const donebtn = document.createElement("button"); //buttonタグ作成
  donebtn.setAttribute("class", "js-done-btn"); //classを付与
  donebtn.innerHTML = "完了"; //buttonタグの中身文字
  //完了ボタンのイベント
  donebtn.addEventListener("click", (event) => {
    event.preventDefault();
    doneTask(donebtn);
  });
  /*削除ボタン*/
  const delbtn = document.createElement("button");
  delbtn.setAttribute("class", "js-del-btn");
  delbtn.innerHTML = "削除";
  //削除ボタンのイベント
  delbtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteTask(delbtn);
  });
  //登録後の要素の追加(ul>li>p構造を作る)
  ptag.appendChild(todo); //pタグの子要素に入力値を追加
  litag.appendChild(ptag); //liタグの子要素にpタグを追加
  btns.appendChild(donebtn); //btnsの子要素にdonebtnを追加
  btns.appendChild(delbtn); //btnsの子要素にdelbtnを追加
  litag.appendChild(btns); //liタグの子要素にbtnsクラスを持つdivタグを追加
  todoList.appendChild(litag); //ulタグの子要素にliタグを追加
};
/*完了ボタンメソッド*/
const doneTask = (btn) => {
  btn.innerHTML = "戻す"; //完了ボタンを戻すボタンに変更
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    returnTask(btn);
  });
  const chosenTask = btn.closest("li"); //移動するリストを選択
  doneList.appendChild(chosenTask); //Doneリストに移動
};
/*戻すボタンメソッド*/
const returnTask = (btn) => {
  btn.innerHTML = "完了"; //戻すボタンを完了ボタンに変更
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    doneTask(btn);
  });
  const chosenTask = btn.closest("li"); //移動するリストを選択
  todoList.appendChild(chosenTask); //Doneリストに移動
};
/*削除ボタンメソッド*/
const deleteTask = (delbtn) => {
  const chosenTask = delbtn.closest("li"); //削除するリストを選択
  chosenTask.remove();
};
