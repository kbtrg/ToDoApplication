//グローバル変数
//--------------------------------------------------------------------------------------------------

/* ストレージデータ用の変数 */
let parsing = false; //パース処理時のフラグ

//---------------------------------------------------------------------------------------------------


/* ストレージデータの読み込み */
document.addEventListener("DOMContentLoaded", (event) => {
  // 1. ストレージデータ（JSON）の読み込み
  const myStorage = localStorage;
  const json = myStorage.todoList;
  if (json === undefined) {
    return; //ストレージにデータがない場合、何もしない
  }
  // 2. jsonのオブジェクトをパース
  let parseList = {}; //パース先の空オブジェクト
  parseList = JSON.parse(json);
  // 3. parseListのデータを元にDOMの構築
  parseList.undo.forEach(list =>{
    addTask(list);
  });
  parsing = true; //UndoリストからDoneリストへ送るトリガー
  parseList.done.forEach(list =>{
    addTask(list);
  });
  parsing = false;
});

/* 登録するボタンのイベント */
document.getElementById("js-register-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const taskValue = document.getElementById("js-todo-ttl"); //入力情報取得
  const addErrorMes = document.getElementsByClassName("add-error-mes"); //テキストエラーメッセージ
  if (taskValue.value !== "") {
    //addErrorMes.classList.add("js-add-error-mes-none");
    const task = taskValue.value;
    addTask(task);
    taskValue.value = ""; //入力値の初期化
    addErrorMes[0].classList.add("js-add-error-mes-none");
  } else {
    addErrorMes[0].classList.remove("js-add-error-mes-none");
  }
});

/* クリアボタンのイベント */
document.getElementsByClassName("clear-btn")[0].addEventListener("click", (event) => {
  event.preventDefault();
  deleteAllTask();
  deleteStorage("todoList");
});

/* 登録メソッド */
const addTask = (task) => {
  /* liタグ,pタグ 作成 */
  const todo = document.createTextNode(task); //入力値取得
  const litag = document.createElement("li"); //liタグを作る準備
  litag.className = "list"; //liタグにクラス名付与
  const ptag = document.createElement("p"); //pタグを作る準備
  /* buttonタグ作成 */
  const btns = document.createElement("div"); //btnレイアウトを作る準備
  btns.setAttribute("class", "buttons"); //btnのレイアウトを作る為のクラス付与
  //完了ボタン
  const donebtn = document.createElement("button"); //buttonタグ作成
  donebtn.setAttribute("class", "js-done-btn"); //classを付与
  donebtn.innerHTML = "完了"; //buttonタグの中身文字
  //削除ボタン
  const delbtn = document.createElement("button");
  delbtn.setAttribute("class", "js-del-btn");
  delbtn.innerHTML = "削除";
  /* 登録後の要素の追加(ul>li>p構造を作る) */
  ptag.appendChild(todo); //pタグの子要素に入力値を追加
  litag.appendChild(ptag); //liタグの子要素にpタグを追加
  btns.appendChild(donebtn); //btnsの子要素にdonebtnを追加
  btns.appendChild(delbtn); //btnsの子要素にdelbtnを追加
  litag.appendChild(btns); //liタグの子要素にbtnsクラスを持つdivタグを追加
  const todoList = document.getElementById("js-todo-list"); //Undoのulタグ取得
  todoList.appendChild(litag); //ulタグの子要素にliタグを追加
  //ボタンのイベント設定
  if(parsing === true){
    doneTask(donebtn);
  } else{
    donebtn.addEventListener("click", (event) => {
      event.preventDefault();
      doneTask(donebtn);
    });
  }
  delbtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteTask(delbtn);
  });
  saveStorage();
};

/*完了ボタンメソッド*/
const doneTask = (btn) => {
  btn.innerHTML = "戻す"; //完了ボタンを戻すボタンに変更
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    returnTask(btn);
  });
  const chosenTask = btn.closest("li"); //移動するリストを選択
  const doneList = document.getElementById("js-done-list"); //Doneのulタグ取得
  doneList.appendChild(chosenTask); //Doneリストに移動
  saveStorage();
};

/*戻すボタンメソッド*/
const returnTask = (btn) => {
  btn.innerHTML = "完了"; //戻すボタンを完了ボタンに変更
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    doneTask(btn);
  });
  const chosenTask = btn.closest("li"); //移動するリストを選択
  const todoList = document.getElementById("js-todo-list"); //Undoのulタグ取得
  todoList.appendChild(chosenTask); //Doneリストに移動
  saveStorage();
};

/*削除ボタンメソッド*/
const deleteTask = (delbtn) => {
  const chosenTask = delbtn.closest("li"); //削除するリストを選択
  chosenTask.remove();
  saveStorage();
};

/* ストレージで保存 */
const saveStorage = () => {
  let item = {
    undo: [],
    done: []
  };
  const todoList = document.getElementById("js-todo-list"); //Undoのulタグ取得
  const todoItems = todoList.getElementsByTagName("p");
  for(let i=0; i<todoItems.length; i++){
    item.undo[i] = todoItems[i].textContent;
  }
  const doneList = document.getElementById("js-done-list"); //Doneのulタグ取得
  const doneItems = doneList.getElementsByTagName("p");
  for(let i=0; i<doneItems.length; i++){
    item.done[i] = doneItems[i].textContent;
  }
  localStorage.setItem("todoList", JSON.stringify(item));
};

/* クリアボタンでDOMの全消去 */
const deleteAllTask = () => {
  const todoList = document.getElementById("js-todo-list"); //Undoのulタグ取得
  while(todoList.lastChild){
    todoList.removeChild(todoList.lastChild);
  }
  const doneList = document.getElementById("js-done-list"); //Doneのulタグ取得
  while(doneList.lastChild){
    doneList.removeChild(doneList.lastChild);
  }
};

/* ストレージの消去 */
const deleteStorage = (key) => {
  localStorage.removeItem(key); //渡されたkeyのストレージを消去
}