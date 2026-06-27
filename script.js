let shareText = "";function calculateBMI() {
    let heightInput = document.getElementById("height").value;
    let weightInput = document.getElementById("weight").value;

    if (heightInput === "" || weightInput === "") {
        
        document.getElementById("result").innerHTML =
            `<div class="result-box error">請輸入身高和體重</div>`;
        return;
    }

    let heightCm = Number(heightInput);
    let weight = Number(weightInput);
let age =
Number(document.getElementById("age").value);

let gender =
document.getElementById("gender").value;

let activity =
Number(document.getElementById("activity").value);
let targetWeight =
Number(document.getElementById("targetWeight").value);

let weeklyLoss =
Number(document.getElementById("weeklyLoss").value);
    if (heightCm <= 0 || weight <= 0) {
        document.getElementById("result").innerHTML =
            `<div class="result-box error">數字不能小於或等於 0</div>`;
        return;
    }

    let heightM = heightCm / 100;
    let bmi = weight / (heightM * heightM);

    let status = "";
    let advice = "";

    if (bmi < 18.5) {
        status = "🔵 體重過輕";
        advice = "建議增加營養攝取，搭配重量訓練。";
    } else if (bmi < 24) {
        status = "🟢 正常體重";
        advice = "很棒！請繼續維持健康生活習慣。";
    } else if (bmi < 27) {
        status = "🟠 體重過重";
        advice = "建議控制飲食，並增加規律運動。";
    } else {
        status = "🔴 肥胖";
        advice = "建議開始記錄飲食，並逐步增加活動量。";
    }

    let idealMin = 18.5 * heightM * heightM;
    let idealMax = 24 * heightM * heightM;
    let water = weight * 35;
let bmr;

if(gender === "male"){
    bmr =
    10 * weight +
    6.25 * heightCm -
    5 * age +
    5;
}
else{
    bmr =
    10 * weight +
    6.25 * heightCm -
    5 * age -
    161;
}

let tdee =
bmr * activity;

let loseWeight =
tdee - 500;

let gainWeight =
tdee + 300;
let proteinCut = weight * 2;
let proteinBulk = weight * 2.4;
let chickenBreast = proteinCut * 4.3;
let eggs = proteinCut / 7;
let milk = proteinCut / 8;
let weeksNeeded = 0;
let monthsNeeded = 0;

if (targetWeight > 0 && targetWeight < weight) {
    weeksNeeded = Math.ceil((weight - targetWeight) / weeklyLoss);
    monthsNeeded = Math.ceil(weeksNeeded / 4);
}
shareText = `
🏋️ 我的 BMI 分析結果

📊 BMI：${bmi.toFixed(1)}
🏷️ 分類：${status.replace(/[🔵🟢🟠🔴]/g, "")}

⚖️ 理想體重：
${idealMin.toFixed(1)}kg ~ ${idealMax.toFixed(1)}kg

🔥 基礎代謝 BMR：
${Math.round(bmr)} kcal

🍚 每日維持熱量 TDEE：
${Math.round(tdee)} kcal

📉 減脂建議：
${Math.round(loseWeight)} kcal

💪 增肌建議：
${Math.round(gainWeight)} kcal

🌐 免費 BMI 計算器：
${window.location.href}
`;
let markerPosition = Math.min((bmi / 40) * 100, 100);
    document.getElementById("result").innerHTML =
        `
        <div class="result-box">
            <div class="bmi-number">BMI：${bmi.toFixed(1)}</div>
            <div class="bmi-status">${status}</div>
<div class="bmi-bar">
    <div class="bmi-marker" style="left:${markerPosition}%"></div>
</div>

<div class="bmi-labels">
    <span>過輕</span>
    <span>正常</span>
    <span>過重</span>
    <span>肥胖</span>
</div>
            <div class="info">
                理想體重：${idealMin.toFixed(1)}kg ~ ${idealMax.toFixed(1)}kg
            </div>

            <div class="info">
                建議每日飲水量：約 ${Math.round(water)} ml
            </div>

            <div class="info">
基礎代謝 BMR：
${Math.round(bmr)} kcal
</div>

<div class="info">
每日維持熱量 TDEE：
${Math.round(tdee)} kcal
</div>

<div class="info">
減脂建議：
${Math.round(loseWeight)} kcal
</div>

<div class="info">
增肌建議：
${Math.round(gainWeight)} kcal
</div>
${weeksNeeded > 0 ? `
<div class="info">
目標體重達成時間：
<div class="info">
減脂蛋白質建議：
${Math.round(proteinCut)}g / 天
</div>

<div class="info">
增肌蛋白質建議：
${Math.round(proteinBulk)}g / 天
</div>
<div class="info">
約等於：
🐔 雞胸肉 ${Math.round(chickenBreast)}g<br>
🥚 雞蛋 ${Math.round(eggs)} 顆<br>
🥛 牛奶 ${Math.round(milk)} 杯
</div>
約 ${weeksNeeded} 週（約 ${monthsNeeded} 個月）
</div>
` : ""}
<p>${advice}</p>
<button class="share-btn" onclick="shareResult()">
    📤 分享結果
</button>
        </div>
        `;
}
function shareResult() {
    let finalText = shareText;

    let textArea = document.createElement("textarea");
    textArea.value = finalText;
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    document.execCommand("copy");

    document.body.removeChild(textArea);

    alert("結果已複製，可以貼給朋友了！");
}

