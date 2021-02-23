let todoList = [];
const statusList = ['作業中','完了'];

const add_btn = document.getElementById('add_btn');
const toggleTodoList = document.getElementsByName('condition');

function controllClass(){
    // ラジオボタン要素を取得
    let checkedRadioVal;
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    // チェックされてるラジオボタンの値を取得
    for( let i=0; i < toggleTodoList.length; i++ ) {
        if ( toggleTodoList[i].checked ) {
            checkedRadioVal = toggleTodoList[i].value;
        }
    }
    if( checkedRadioVal==='all' ){
        for(let i=0; i<todoList.length; i++){
            task_table.rows[i].classList.remove('non-display');
        }
    }

    else if( checkedRadioVal==='working' ){
        // タスク追加先のtable要素を取得
        const task_table = document.getElementById('task_table_body');
        for(let i=0; i<todoList.length; i++){
            if( todoList[i].status!=='作業中' ){
                task_table.rows[i].classList.add('non-display');
            }
            else{
                task_table.rows[i].classList.remove('non-display');
            }
            
        }
    }
    else{
        // タスク追加先のtable要素を取得
        const task_table = document.getElementById('task_table_body');
        for(let i=0; i<todoList.length; i++){
            if( todoList[i].status!=='完了' ){
                task_table.rows[i].classList.add('non-display');
            }
            else{
                task_table.rows[i].classList.remove('non-display');
            }                
        }
    }
}

// ラジオボタンにイベント登録
for(let i=0; i<toggleTodoList.length; i++){
    toggleTodoList[i].addEventListener('change',controllClass);
}



function addTodo(){
    // 入力されたタスクを取得
    const taskText = document.getElementById('task').value;

    // バリデーション
    if( taskText.length > 0 ){
        const todo = {
            task : taskText,
            status : statusList[0] // 初期値
        };
        todoList.push(todo);
        
        // タスク入力ボックスをクリア
        document.getElementById('task').value = '';
    }

}

function showTodoList(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');

    let task_id = 1;
    for(let i=0; i<todoList.length; i++){
        /****** 1列目 ******/
        // テーブルに行を追加
        let new_row = task_table.insertRow();
        // 行にセルを追加
        let new_cell = new_row.insertCell();
        // テキストノード作成
        let new_text = document.createTextNode(task_id);
        // セルにテキストノードを追加
        new_cell.appendChild(new_text);
        /****** 2列目 ******/
        new_cell = new_row.insertCell();
        new_text = document.createTextNode(todoList[i]['task']);
        new_cell.appendChild(new_text);

        task_id++;
    }
}

function makeStatusBtn(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    for(let i=0; i<todoList.length; i++){
        // 行にセルを追加
        let new_cell = task_table.rows[i].insertCell();
        // ボタン要素生成
        let status_btn = document.createElement('button');
        status_btn.textContent = todoList[i].status;
        new_cell.appendChild(status_btn);

        status_btn.addEventListener('click', function() {
            // 状態切り替え
            if(statusList.indexOf(todoList[i].status)===0){
                todoList[i].status = statusList[1];
            }
            else{
                todoList[i].status = statusList[0];
            }
            // tableを初期化
            clearTable();
            // todoを表示
            showTodoList();
            // 状態ボタンを表示
            makeStatusBtn();
            // 削除ボタンを表示
            makeDeleteBtn();
            // クラス操作
            controllClass();
        });
    }
    
}

function makeDeleteBtn(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    // 最後の行を取得
    for(let i=0; i<todoList.length; i++){
        // 行にセルを追加
        let new_cell = task_table.rows[i].insertCell();
        // ボタン要素生成
        let btn = document.createElement('button');
        btn.textContent = '削除';
        new_cell.appendChild(btn);

        btn.addEventListener('click', function() {
            //task_table.deleteRow(i);
            todoList.splice(i, 1);
            // tableを初期化
            clearTable();
            // todoを表示
            showTodoList();   
            // 状態ボタンを表示
            makeStatusBtn();
            // 削除ボタンを表示
            makeDeleteBtn();
            // クラス操作
            controllClass();
        });
    }

    
}

function clearTable(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    while( task_table.rows[0] ){
        task_table.deleteRow(0);
    }

}

add_btn.addEventListener('click', function() {
    // todoを追加
    addTodo();
    // tableを初期化
    clearTable();
    // todoを表示
    showTodoList();
    // 状態ボタンを表示
    makeStatusBtn();
    // 削除ボタンを表示
    makeDeleteBtn();
    // クラス操作
    controllClass();
});

