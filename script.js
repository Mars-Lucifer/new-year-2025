function generateHTML(btnContent, questionId) {
    const buttons = btnContent[1].map(item => {
        const isCorrect = item[0] === 1 ? 'true' : 'false';
        return `
            <button onclick="answer(${isCorrect}, '${questionId}', this)" class="btn_gray btn_radio w-100">
                <div>
                    <div></div>
                </div>
                ${item[1]}
            </button>`;
    }).join('\n');

    const text = `<h2>${btnContent[0]}</h2>`

    const nextButton = `
        <button onclick="answer_send()" class="btn-white w-100">
            Далее
            <img src="/files/svg/arrow.svg" alt="arrow">
        </button>`;

    return text + '\n' + buttons + '\n' + nextButton;
}

let activeMember;
function click_me(member) {
    let name, btnContent = 'pupa';
    const h1 = document.querySelector('h1');
    const text = document.querySelector('p');
    const rightBlock = document.querySelector('.right-block');
    const blockButton = document.querySelector('.block-button');

    switch (member) {
        case 'flich':
            name = "Фличик";
            btnContent = [
                "Программа для построения на C++ была для...",
                [
                    [1, "Елочки"],
                    [0, "Мандарина"],
                    [0, "Генерации артов с дудками"]
                ]
            ];
            break;
        case 'zaks':
            name = "Заксик";
            btnContent = [
                "Выберите верное утверждение",
                [
                    [1, "Заксик любит Shiroori"],
                    [1, "Заксик извращенец"],
                    [1, "Все любят Заксика"]
                ]
            ];
            break;
        case 'yui':
            name = "Юичикист";
            btnContent = [
                "На Юичикизме...",
                [
                    [1, "Е*бут людей"],
                    [0, "Репетируют в репетиционной"],
                    [0, "Любят модератора Дениса"]
                ]
            ];
            break;
        case 'tema':
            name = "Артемка";
            btnContent = [
                "Когда на сайте появляется pop-up он говорит...",
                [
                    [0, "Какую-то нужную фразу в зависимости от контекста"],
                    [0, "Он ничего не говорит и выдает ошибку в консоль"],
                    [1, '“Здравствуйте”']
                ]
            ];
            break;
        case 'den':
            name = "Zhidkiy_Ganzalis";
            btnContent = [
                "Что делает Денчик в нашем выживании",
                [
                    [0, "Проходит майнкрафт и убивает дракона"],
                    [1, "Строит секретную базу в секретной базе внутри секретной базы"],
                    [0, 'Боится пещер']
                ]
            ];
            break;
        case 'snasha':
            name = "Снежа";
            btnContent = [
                "Твой любимый сок",
                [
                    [1, "Яблочный"],
                    [0, "Виноградный"],
                    [0, 'Томатный']
                ]
            ];
            break;
        case 'minoko':
            name = "Миноко-стаффовец";
            btnContent = [
                "Стафф Миноко больше всего любит",
                [
                    [0, "Ярика старшего"],
                    [0, "Пандочку"],
                    [1, 'Суды']
                ]
            ];
            break;
        case 'vitalia':
            name = "Виталя";
            btnContent = [
                "Что делает Виталя когда блокируют ютуб в стране",
                [
                    [0, "Скачивает VPN"],
                    [0, "Использует ZapretDPI"],
                    [1, 'Переезжает в другую страну']
                ]
            ];
            break;
    }

    let blockList = [h1, text, rightBlock, blockButton];
    for (let i = 0; i < blockList.length; i++) {
        blockList[i].style.animation = 'dispawn 0.5s ease forwards';
    }

    setTimeout(() => {
        h1.innerHTML = `Привет, <span class="red">${name}</span>!`;
        text.innerText = 'Для подтверждения твоей личности тебе придется ответить на невероятно сложные вопросы. Ответ на которые знаешь только ты, наверное';
        rightBlock.innerHTML = `<img src="/files/img/dick_${member}.png" class="big_dick">`;
        blockButton.innerHTML = generateHTML(btnContent, member);

        for (let i = 0; i < blockList.length; i++) {
            blockList[i].style.animation = 'spawn 0.5s ease forwards';
        }
    }, 500);

    activeMember = member;
}

function getButtonIndex(element) {
    if (!element.parentElement) {
        console.error("Элемент не имеет родителя.");
        return -1;
    }

    // Получаем индекс элемента среди всех детей родителя
    return Array.prototype.indexOf.call(element.parentElement.parentElement.children, element.parentElement);
}

function getElementByIndex(parent, index) {
    const children = parent.children;
    if (index >= 0 && index < children.length) {
        return children[index];
    } else {
        console.error("Индекс вне диапазона.");
        return null;
    }
}

let btnActive = -1;
let answerSend = false;
function answer(answer, member, btn) {
    let element = btn.querySelector("div");
    let parent = element.parentElement.parentElement;
    let index = getButtonIndex(element);
    if (btnActive != -1) {
        if (btnActive == index) {
            btn.classList.remove("btn_radio-active");
            element.innerHTML = "<div></div>";
            btnActive = -1;
        } else if (btnActive != index) {
            btn.classList.add('btn_radio-active');
            if (answer) {
                element.innerHTML = "<img src='files/svg/apply.svg'>";
                answerSend = true;
            } else {
                answerSend = false;
                element.innerHTML = "<img src='files/svg/apply.svg'>";
            }

            getElementByIndex(parent, btnActive).classList.remove("btn_radio-active");
            getElementByIndex(parent, btnActive).querySelector("div").innerHTML = "<div></div>";
            btnActive = index;
        }
    } else {
        btn.classList.add('btn_radio-active');
        if (answer) {
            answerSend = true;
            element.innerHTML = "<img src='files/svg/apply.svg'>";
        } else {
            answerSend = false;
            element.innerHTML = "<img src='files/svg/apply.svg'>";
        }
        btnActive = index;
    }
}

function answer_send() {
    if (!answerSend) {
        alert("Ответ не является верным");
    }
    else {
        window.location.href = `/${activeMember}.html`;
    }
}

let lompensiState = false;
function spawn_lompensi(block) {
    let btnNode = block.parentElement.querySelectorAll('a, button');
    let btn = Array.from(btnNode);
    btn.shift();

    if (!lompensiState) {
        for (let i = 0; i < btn.length; i++) {
            btn[i].style.display = 'flex';
            btn[i].style.animation = 'spawn 0.4s ease forwards';
            setTimeout(() => {
                btn[i].style.animation = '';
            }, 400);
        }
        lompensiState = true;
    } else {
        for (let i = 0; i < btn.length; i++) {
            btn[i].style.animation = 'dispawn 0.4s ease forwards';
            setTimeout(() => {
                btn[i].style.display = 'none';
                btn[i].style.animation = '';
            }, 400);
        }
        lompensiState = false;
    }
}

let pat = 0;
function patPat() {
    let text;
    switch (pat) {
        case 0:
            text = "*pat-pat*";
            break;
        case 1:
            text = "*pat-pat-pat*";
            break;
        case 2:
            text = "*hug*";
            break;
        case 3:
            text = "*hug-hug*";
            break;
        case 4:
            text = "Ты хочешь ещё?";
            break;
        case 5:
            text = "Ну хорошо. Ты готов?";
            break;
        case 6:
            text = "*pat-pat-pat-pat-pat-pat-pat-pat-pat-pat-pat-pat-pat*"
            break;
        default:
            text = "Если хочешь еще, напиши мне :3";
            break;
    }
    alert(text);
    pat = pat + 1;
}