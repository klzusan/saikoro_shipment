function calcShip() {
    const weight = parseFloat(document.getElementById('weight').value);
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const thickness = parseFloat(document.getElementById('thickness').value);

    // empty input
    if (isNaN(weight)) {
        alert("商品の重さを入力してください。");
        return;
    }
    if (isNaN(length)) {
        alert("長辺の長さを入力してください。");
        return;
    }
    if (isNaN(width)) {
        alert("短辺の長さを入力してください。");
        return;
    }
    if (isNaN(thickness)) {
        alert("商品の厚さを入力してください。");
        return;
    }

    // Wrong input
    if (weight < 0) {
        alert("商品の重さを正の数で入力してください。");
        return;
    }
    if (length < 0) {
        alert("長辺の長さを正の数で入力してください。");
        return;
    }
    if (width < 0) {
        alert("短辺の長さを正の数で入力してください。");
        return;
    }
    if (thickness < 0) {
        alert("商品の厚さを正の数で入力してください。");
        return;
    }

    let type;
    let envelopeSize;
    let price;

    // thresholds
    // List[weight, length, width, thickness]
    const minStd = [0, 14, 9, 0];
    const maxStd = [50, 23.5, 12, 1];
    const minNonStdIn = [0, 14, 9, 0];
    const maxNonStdIn = [1000, 34, 25, 3];
    const minNonStdOut = minNonStdIn;
    const maxNonStdOut = [4000, 60,-1, -1];

    if (weight <= maxStd[0] && length <= maxStd[1] && width <= maxStd[2] && thickness <= maxStd[3]) {
        // Standard size mail
        type = "定形郵便物"
        envelopeSize = "長形3号";
        price = 110;
    } else if (weight <= maxNonStdIn[0] && length <= maxNonStdIn[1] && width <= maxNonStdIn[2] && thickness <= maxNonStdIn[3]) {
        // Non-standard size (in spec)
        type = "定形外郵便物（規格内）"
        envelopeSize = "角形1号";
        switch (true) {
            case weight <= 50:
                price = 140;
                break;
            case weight <= 100:
                price = 180;
                break;
            case weight <= 150:
                price = 270;
                break;
            case weight <= 250:
                price = 320;
                break;
            case weight <= 500:
                price = 510;
                break;
            case weight <= 1000:
                price = 750;
                break;
            default:
                price = null;
        }
    } else if (weight <= maxNonStdOut[0] && length <= maxNonStdOut[1] && length + width + thickness <= 90) {
        // Non-standard size (out of spec)
        type = "定形外郵便物（規格外）"
        envelopeSize = "角形1号";
        switch (true) {
            case weight <= 50:
                price = 260;
                break;
            case weight <= 100:
                price = 290;
                break;
            case weight <= 150:
                price = 390;
                break;
            case weight <= 250:
                price = 450;
                break;
            case weight <= 500:
                price = 660;
                break;
            case weight <= 1000:
                price = 920;
                break;
            case weight <= 2000:
                price = 1350;
                break;
            case weight <= 4000:
                price = 1750;
                break;
            default:
                price = null;
        }
    }else{
        // Others
        type = null;
        envelopeSize = null;
        price = null;
    }
    console.log(type);
    console.log(envelopeSize);
    console.log(price);

    // display the results
    document.getElementById('result').innerHTML = `この商品は ${type} です。<br> 適切な封筒: ${envelopeSize}, 料金: ${price}円`;
}