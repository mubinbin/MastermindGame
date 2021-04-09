var attempts = 0;

const onClickHandler = () => {

    let inputs = document.getElementsByClassName("inputNums");
    let randNums = document.getElementsByClassName("random")[0].innerHTML;
    let inputNums = [];

    for(let i = 0; i < inputs.length; i++){
        inputNums.push(inputs[i].value);
        
        let int = parseInt(inputNums[i]);
        if(int < 0 || int > 7 || isNaN(int)){
            alert("Please only enter integer between 0 and 7!");
            return;
        }
    }

    attempts++;

    let result = checkResult(inputNums, randNums);
    if(isWin(result, inputNums.length, attempts)){
        attempts = 0;
        location.reload();
        return;
    }

    
    if(attempts === 10){
        alert(`Sorry, You Did Not Win. You final input is: ${result[0]}. But the answer is: ${randNums}`)
        attempts = 0;
        location.reload();
    }

    createLog(result, attempts);

    return;
}

const checkResult = (inputNums, randNums) =>{

    randNums = randNums.replace("[", "");
    randNums = randNums.replace("]", "");
    randNums = randNums.replace(/\s+/g, "")
    randNums = randNums.split(",");
    
    let countMap = new Map();

    for(let i = 0; i < randNums.length; i++){
        if(!countMap.has(randNums[i])){
            countMap.set(randNums[i], 1);
        }else{
            countMap.set(randNums[i], countMap.get(randNums[i]) +1);
        }
    }

    console.log(countMap);

    let a = 0;
    let b = 0;
    let ans = "[";

    for(let i = 0; i < randNums.length; i++){
        
        if(inputNums[i] === randNums[i]){
            a++;
            countMap.set(inputNums[i], countMap.get(inputNums[i]) -1);
        }

        
        if(i == randNums.length-1){
            ans += inputNums[i] + "]";
        }else{
            ans += inputNums[i] + ", ";
        }
    }
    
    for(let i = 0; i < randNums.length; i++){
        
        if(inputNums[i] !== randNums[i] && (countMap.has(inputNums[i]) && countMap.get(inputNums[i]) -1 >= 0)){
            b++;
            countMap.set(inputNums[i], countMap.get(inputNums[i]) -1);
        }
    }
    
    return [ans, a + "A" + b + "B"];
}

const createLog = (result, attempts) => {

    let tag = document.createElement("p")
    let text = document.createTextNode(`Attempt No.${attempts}: Your inputs are: ${result[0]}. Your guess result is: ${result[1]}. You have ${10-attempts} attempts left.`);
    tag.appendChild(text);

    let element = document.getElementById("log");
    element.appendChild(tag);

}

const isWin = (result, allNums, attempts) =>{
    
    let winningCondition = allNums+"A0B";
    
    if(result[1] === winningCondition && attempts <= 10){
        alert(`Congrats! You Win!! The answer is: ${result[0]}`);
        return true;
    }
    return false;
}
