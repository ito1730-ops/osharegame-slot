/* =========================
   タイトル画面
========================= */

const titleScreen =
    document.querySelector("#titleScreen");

const gameScreen =
    document.querySelector("#gameScreen");

const startButton =
    document.querySelector("#startButton");


startButton.addEventListener("click", () => {

    titleScreen.classList.add("title-hide");

    gameScreen.classList.add("game-show");

});



/* =========================
   アイテムデータ
   1〜4のみ
   4がスペシャルアイテム
========================= */

const tops = [

    {
        id: 1,
        name: "ガーリー",
        point: 30,
        rarity: "R"
    },

    {
        id: 2,
        name: "トラディショナル",
        point: 20,
        rarity: "N"
    },

    {
        id: 3,
        name: "スクール",
        point: 10,
        rarity: "N"
    },

    {
        id: 4,
        name: "プリンセスドレス",
        point: 300,
        rarity: "SR"
    }

];


const shoes = [

    {
        id: 1,
        name: "ガーリー",
        point: 30,
        rarity: "R"
    },

    {
        id: 2,
        name: "トラディショナル",
        point: 20,
        rarity: "N"
    },

    {
        id: 3,
        name: "スクール",
        point: 10,
        rarity: "N"
    },

    {
        id: 4,
        name: "プリンセスシューズ",
        point: 300,
        rarity: "SR"
    }

];


const heads = [

    {
        id: 1,
        name: "ガーリー",
        point: 30,
        rarity: "R"
    },

    {
        id: 2,
        name: "トラディショナル",
        point: 20,
        rarity: "N"
    },

    {
        id: 3,
        name: "スクール",
        point: 10,
        rarity: "N"
    },

    {
        id: 4,
        name: "プリンセスヘッド",
        point: 300,
        rarity: "SR"
    }

];



/* =========================
   HTML取得
========================= */

const bodyImage =
    document.querySelector("#bodyImage");

const topImage =
    document.querySelector("#topImage");

const shoesImage =
    document.querySelector("#shoesImage");

const headImage =
    document.querySelector("#headImage");


const headSlot =
    document.querySelector("#headSlot");

const topSlot =
    document.querySelector("#topSlot");

const shoesSlot =
    document.querySelector("#shoesSlot");


const spinButton =
    document.querySelector("#spinButton");


const resultText =
    document.querySelector("#resultText");

const rarityText =
    document.querySelector("#rarityText");


const totalScore =
    document.querySelector("#totalScore");

const currentScore =
    document.querySelector("#currentScore");


const completeEffect =
    document.querySelector("#completeEffect");

const completeText =
    document.querySelector("#completeText");


const sparkleEffect =
    document.querySelector("#sparkleEffect");


const specialEffect =
    document.querySelector("#specialEffect");


const characterFrame =
    document.querySelector(".character-frame");



/* =========================
   スコア
========================= */

let score =
    Number(
        localStorage.getItem("oshareScore")
    ) || 0;


totalScore.textContent = score;



/* =========================
   デバッグモード
   Dキーを押すと次の1回だけ
   head4 + top4 + shoes4
   を強制的に出す
========================= */

let debugMode = false;


document.addEventListener("keydown", (event) => {

    if (
        event.key.toLowerCase() === "d"
    ) {

        debugMode = true;

        console.log(
            "DEBUG MODE: TOP4コーデ確定"
        );

    }

});



/* =========================
   アイテム図鑑
========================= */

let collection =
    JSON.parse(
        localStorage.getItem("oshareCollection")
    ) || [];



/* =========================
   通常アイテム抽選
   1〜3から抽選
========================= */

function randomNormalItem(array) {

    const normalItems =
        array.slice(0, 3);


    return normalItems[
        Math.floor(
            Math.random() *
            normalItems.length
        )
    ];

}



/* =========================
   TOP専用抽選
   1%でTOP4
========================= */

function randomTop() {

    const special =
        Math.random() < 0.01;


    if (special) {

        return tops[3];

    }


    return tops[
        Math.floor(
            Math.random() * 3
        )
    ];

}



/* =========================
   画像変更
========================= */

function setHead(item) {

    headImage.src =
        `./media/head${item.id}.png`;

    headSlot.textContent =
        item.name;

}


function setTop(item) {

    topImage.src =
        `./media/top${item.id}.png`;

    topSlot.textContent =
        item.name;

}


function setShoes(item) {

    shoesImage.src =
        `./media/shoes${item.id}.png`;

    shoesSlot.textContent =
        item.name;

}



/* =========================
   キラキラ生成
========================= */

function createSparkles(count = 35) {

    sparkleEffect.innerHTML = "";


    const symbols = [
        "✦",
        "✧",
        "✦",
        "♡",
        "✧"
    ];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "sparkle-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            180 +
            Math.random() * 350;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.style.setProperty(
            "--x",
            `${x}px`
        );


        particle.style.setProperty(
            "--y",
            `${y}px`
        );


        particle.style.setProperty(
            "--rotate",
            `${Math.random() * 720 - 360}deg`
        );


        particle.style.animationDelay =
            `${Math.random() * 0.25}s`;


        particle.style.fontSize =
            `${18 + Math.random() * 28}px`;


        sparkleEffect.appendChild(
            particle
        );

    }


    setTimeout(() => {

        sparkleEffect.innerHTML = "";

    }, 1500);

}



/* =========================
   完成エフェクト
========================= */

function showCompleteEffect(
    message = "コーデかんせい！"
) {

    completeText.textContent =
        message;


    completeEffect.className =
        "complete-effect";


    void completeEffect.offsetWidth;


    completeEffect.classList.add(
        "complete-show"
    );


    characterFrame.classList.remove(
        "finish-bounce"
    );


    void characterFrame.offsetWidth;


    characterFrame.classList.add(
        "finish-bounce"
    );


    createSparkles(25);

}



/* =========================
   スペシャル演出
========================= */

function showSpecialEffect() {

    document.body.classList.remove(
        "rare-flash"
    );


    void document.body.offsetWidth;


    document.body.classList.add(
        "rare-flash"
    );


    specialEffect.className =
        "special-effect";


    void specialEffect.offsetWidth;


    specialEffect.classList.add(
        "special-show"
    );


    createSparkles(60);


    setTimeout(() => {

        document.body.classList.remove(
            "rare-flash"
        );

    }, 600);

}



/* =========================
   パーフェクト演出
========================= */

function showPerfectFlash() {

    document.body.classList.remove(
        "perfect-flash"
    );


    void document.body.offsetWidth;


    document.body.classList.add(
        "perfect-flash"
    );


    createSparkles(45);


    setTimeout(() => {

        document.body.classList.remove(
            "perfect-flash"
        );

    }, 900);

}



/* =========================
   レア度
========================= */

function getRarity(
    head,
    top,
    shoes
) {

    const items = [
        head,
        top,
        shoes
    ];


    const sr =
        items.some(
            item =>
                item.rarity === "SR"
        );


    if (sr) {

        return "✦✦ スペシャル ✦✦";

    }


    const rareCount =
        items.filter(
            item =>
                item.rarity === "R"
        ).length;


    if (rareCount >= 2) {

        return "✦ レア ✦";

    }


    return "♡ ふつう ♡";

}



/* =========================
   図鑑登録
========================= */

function addCollection(item) {

    if (
        !collection.includes(
            item.id
        )
    ) {

        collection.push(
            item.id
        );


        localStorage.setItem(
            "oshareCollection",
            JSON.stringify(collection)
        );

    }

}



/* =========================
   スロット回転
========================= */

function spinReel(
    slot,
    array,
    imageFunction,
    finalItem,
    maxCount,
    delay,
    callback
) {

    let count = 0;


    slot.classList.add(
        "spinning"
    );


    function tick() {

        count++;


        const item =
            array[
                Math.floor(
                    Math.random() *
                    array.length
                )
            ];


        imageFunction(item);


        if (
            count >= maxCount
        ) {

            imageFunction(
                finalItem
            );


            slot.classList.remove(
                "spinning"
            );


            setTimeout(
                callback,
                150
            );


            return;

        }


        setTimeout(
            tick,
            delay
        );

    }


    tick();

}



/* =========================
   スピン
========================= */

spinButton.addEventListener(
    "click",
    startSpin
);


function startSpin() {

    if (
        spinButton.disabled
    ) {

        return;

    }


    spinButton.disabled =
        true;


    resultText.textContent =
        "コーデをえらんでいます…";


    rarityText.textContent =
        "♡ ちょっとまってね ♡";


    currentScore.textContent =
        "0";


    let finalHead;
    let finalTop;
    let finalShoes;



    /* =====================
       デバッグモード
       head4
       top4
       shoes4
    ===================== */

    if (debugMode) {

        finalHead =
            heads[3];


        finalTop =
            tops[3];


        finalShoes =
            shoes[3];


        debugMode =
            false;

    }



    /* =====================
       通常抽選
    ===================== */

    else {

        finalHead =
            randomNormalItem(heads);


        finalShoes =
            randomNormalItem(shoes);


        finalTop =
            randomTop();

    }



    /* =====================
       あたま
    ===================== */

    spinReel(
        headSlot,
        heads,
        setHead,
        finalHead,
        9,
        40,
        () => {


            /* =================
               くつ
            ================= */

            spinReel(
                shoesSlot,
                shoes,
                setShoes,
                finalShoes,
                11,
                48,
                () => {


                    /* =================
                       おようふく
                       最後なのでゆっくり
                    ================= */

                    spinReel(
                        topSlot,
                        tops,
                        setTop,
                        finalTop,
                        20,
                        70,
                        () => {


                            setTimeout(
                                () => {

                                    finishSpin(
                                        finalHead,
                                        finalTop,
                                        finalShoes
                                    );

                                },
                                400
                            );

                        }
                    );

                }
            );

        }
    );

}



/* =========================
   スピン終了
========================= */

function finishSpin(
    head,
    top,
    shoes
) {

    let points =
        head.point +
        top.point +
        shoes.point;


    const sameAll =
        head.name === top.name &&
        top.name === shoes.name;


    const samePair =
        head.name === top.name ||
        head.name === shoes.name ||
        top.name === shoes.name;



    /* =====================
       コーデボーナス
    ===================== */

    if (sameAll) {

        points += 100;

    }

    else if (samePair) {

        points += 30;

    }



    /* =====================
       結果
    ===================== */

    const isSR =
        top.rarity === "SR" ||
        head.rarity === "SR" ||
        shoes.rarity === "SR";


    if (
        sameAll &&
        isSR
    ) {

        resultText.textContent =
            `✦✦✦ でんせつのコーデ！ ✦✦✦ +${points}ポイント`;

    }

    else if (sameAll) {

        resultText.textContent =
            `✦ かんぺきコーデ！ ✦ +${points}ポイント`;

    }

    else if (samePair) {

        resultText.textContent =
            `♡ いいコーデ！ ♡ +${points}ポイント`;

    }

    else {

        resultText.textContent =
            `コーデかんせい！ +${points}ポイント`;

    }



    /* =====================
       レア度
    ===================== */

    rarityText.textContent =
        getRarity(
            head,
            top,
            shoes
        );



    /* =====================
       スコア
    ===================== */

    score += points;


    totalScore.textContent =
        score;


    currentScore.textContent =
        points;


    localStorage.setItem(
        "oshareScore",
        score
    );



    /* =====================
       図鑑
    ===================== */

    addCollection(head);

    addCollection(top);

    addCollection(shoes);



    /* =====================
       完成演出
    ===================== */

    if (
        sameAll &&
        isSR
    ) {

        showCompleteEffect(
            "でんせつのコーデ！"
        );


        showPerfectFlash();


        setTimeout(
            showSpecialEffect,
            350
        );

    }

    else if (sameAll) {

        showCompleteEffect(
            "かんぺきコーデ！"
        );


        showPerfectFlash();

    }

    else if (isSR) {

        showCompleteEffect(
            "コーデかんせい！"
        );


        setTimeout(
            showSpecialEffect,
            350
        );

    }

    else {

        showCompleteEffect(
            "コーデかんせい！"
        );

    }



    /* =====================
       ボタン復活
    ===================== */

    setTimeout(
        () => {

            spinButton.disabled =
                false;

        },
        1800
    );

}



/* =========================
   アイテムずかん
========================= */

const wardrobeButton =
    document.querySelector(
        "#wardrobeButton"
    );


const wardrobeModal =
    document.querySelector(
        "#wardrobeModal"
    );


const closeWardrobe =
    document.querySelector(
        "#closeWardrobe"
    );


const wardrobeList =
    document.querySelector(
        "#wardrobeList"
    );



wardrobeButton.addEventListener(
    "click",
    () => {

        showWardrobe();

        wardrobeModal.classList.add(
            "show"
        );

    }
);



closeWardrobe.addEventListener(
    "click",
    () => {

        wardrobeModal.classList.remove(
            "show"
        );

    }
);



wardrobeModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            wardrobeModal
        ) {

            wardrobeModal.classList.remove(
                "show"
            );

        }

    }
);



/* =========================
   図鑑表示
========================= */

function showWardrobe() {

    wardrobeList.innerHTML = "";


    /*
       頭・服・靴をそれぞれ
       1〜4まで表示
    */

    const allItems = [

        ...heads.map(item => ({
            ...item,
            type: "head"
        })),

        ...tops.map(item => ({
            ...item,
            type: "top"
        })),

        ...shoes.map(item => ({
            ...item,
            type: "shoes"
        }))

    ];



    allItems.forEach(
        item => {


            /* =================
               図鑑登録チェック
            ================= */

            const unlocked =
                collection.includes(
                    item.id
                );



            /* =================
               アイテム枠
            ================= */

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "wardrobe-item";


            if (!unlocked) {

                div.classList.add(
                    "locked"
                );

            }



            /* =================
               画像
            ================= */

            const image =
                document.createElement(
                    "img"
                );


            let imagePath;


            if (
                item.type === "head"
            ) {

                imagePath =
                    `./media/head${item.id}.png`;

            }

            else if (
                item.type === "top"
            ) {

                imagePath =
                    `./media/top${item.id}.png`;

            }

            else if (
                item.type === "shoes"
            ) {

                imagePath =
                    `./media/shoes${item.id}.png`;

            }


            image.src =
                imagePath;


            image.alt =
                item.name;



            /* =================
               名前
            ================= */

            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "wardrobe-item-name";


            name.textContent =
                unlocked
                    ? item.name
                    : "？？？";



            /* =================
               追加
            ================= */

            div.appendChild(
                image
            );


            div.appendChild(
                name
            );


            wardrobeList.appendChild(
                div
            );

        }
    );

}