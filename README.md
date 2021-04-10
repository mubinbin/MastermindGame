# MastermindGame

## Introduction ##
I built the game as a web app by using Spring Boot. I used Java to build the backend (setting difficulty level and getting the random number combination). For the frontend, I use JSP page with some simple css styling as well as a JavaScript file to handle the game implementation logic (checking the result, reducing the number of attempt, and checking if the user win).

## How to Run the App ##
Download the app with the command "**git clone https://github.com/mubinbin/MastermindGame.git**".

If you do not have JDK in your computer, please go to https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/index.html to install and set up environment variable accordingly. Any versions above **Java SE 11 (including Java SE 11)** should be good to run the project. Reboot you computer after finishing the setup. 

After rebooting, use the Shell or Command Prompt cd into the "**MastermindGame**" directory. And then run "**./mvnw spring-boot:run**" in Shell (or "**mvnw spring-boot:run**" in Windows Command Prompt). Make sure you are connecting the internet, since the command will check if you computer has Maven or not. If you don't, it will automatically download it for you. When the Spring Boot project is up and running, type in **http://localhost:8080/** in your web browser and you should be able to use the app. **Please connecting the internet all the time when using the app.**

## How to Play ##
You may select a difficuty level (Easy, Intermediate, or Hard) at the home page to start the game. Intermediate level will have 4 numbers to guess just as the default requirement of the coding challenge, while Easy level will have 3 numbers and Hard level will have 5 numbers, respectively. There will be instructions that will tell you about the rule of the game and what the result will be looked like. If you enter an invalid number (ex. leave the input box blank or enter a number outside the range from 0 to 7), there will be an alert poping up and prevent the game to move forward when you click the "**Check Your Answer**" button. If your input is valid, after clicking the "**Check Your Answer**" button, there will be a log showing details of your result and remaining attempts in the bottom box on the page.

If you lost, the page will give an alert, telling that you did not win and showing the correct answer. After you click "**OK**" on the alert, the page will refresh and will start a new game at the same difficulty level. If you won, similarly, there will be an alert showing the correct answer. And it will also refresh the page and restart the game at the same difficulty level after clicking the "**OK**" on the alert.

If you want to play with different difficulty level, simply click the "**Back to Homepage**" and select another level.

If you just want to test the game funcionalities instead of spending too much time to play with it, simply open the "game.css" file (located at "**~\MastermindGame\src\main\resources\static\css\game.css**") and change line 26 from "**visibility: hidden;**" to "**visibility: visible;**". Then you can see the answer at the game page.

## Thought Process and Code Structure ##
### Backend ###
#### 1. Service Class ####
I used the Random Number Generator API to generate the number combinations. Specifically, it is "**https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new**". However, instead of using "**num=4&min=0&max=7**", I made a function named **getNumbers()** and it returned a String array holding all the digits as String. The size of the array is equal to the "**num**" variable. The **getNumbers()** function took in 3 parameters, which are "**int num**", "**int min**", and "**int max**" so that they can be changed according to different difficulty level. But, eventually, I only changed the "**num**" and kept **min=0** and **max=7** otherwise the game will be too difficult to play. I make a service class for this function since the main purpose for this class is to get the data from the data source. (the code is here: https://github.com/mubinbin/MastermindGame/blob/main/src/main/java/com/mb/masterMindGame/services/GameService.java)

#### 2. Controller Class ####
The controller class (https://github.com/mubinbin/MastermindGame/blob/main/src/main/java/com/mb/masterMindGame/controllers/GameController.java) will render JSP pages (HTML pages that can run Java codes). The controller class will also take the data from service class and pass them into the JSP pages. Two JSP pages was rendered, **home.jsp** and **game.jsp**.

The **home()** function in the controller class takes a get request when user go to the localhost:8080 (get("/")), it will render home.jsp page and pass 3 Strings "Easy", "Intermediate" and "Hard", representing 3 difficulty levels. When a user picks a difficulty, he or she is sending a get request to the route **localhost:8080/{difficulty}**. This route has a path variable and the **game()** fucntion in the contoller class will take in the variable and render different data set to the game.jsp page accordingly.

### Frontend ###
#### 1. JSP Page ####
The **home.jsp** (https://github.com/mubinbin/MastermindGame/blob/main/src/main/webapp/home.jsp) is the landing page of the app, which allows the user to select a difficulty level to start the game. The **game.jsp** (https://github.com/mubinbin/MastermindGame/blob/main/src/main/webapp/game.jsp) is the main game page of the app. It has the instructions of the game, input boxes which allows a user to enter numbers, a button, and a big box at the bottom to display the game log. Both home.jsp and game.jsp have a separated css file which contains some basic css styling.(**home.css** https://github.com/mubinbin/MastermindGame/blob/main/src/main/resources/static/css/home.css; **game.css** https://github.com/mubinbin/MastermindGame/blob/main/src/main/resources/static/css/game.css)

#### 2. JavaScript file ####
The **game.jsp** page also import a JavaScript file, which implementing the game logic (**game.js** https://github.com/mubinbin/MastermindGame/blob/main/src/main/resources/static/js/game.js). When the user click on the "**Check Your Answer**" button, it will trigger the **game.js** file. 

The file will first instantiate an **attempts** variable, which will track how many times the user has made a guess. The onClickHandler() function will first validate if the user enter valid input. If not, it will give a alert and prevent the game move forward. If the inputs are valid, **attempts** will increase by 1. 

After that, the inputs by the user (**inputNums** array) and the random numbers generated by the API (**randNums** array) will be compared (**checkResult()** funciotn will be ran). I created a hash map to count how many times a specify number has occurred in the random number combinations. The key is the specific number and the value is the times it occurs. And then loop through the **inputNums** array and the **randNums** array. If "**inputNums[i] === randNums[i]**", meaning the specific number in both arrays are the same and at the same position, then integer **a** increase by 1 and the count for the number in the hash map will decrese by one. If "**inputNums[i] !== randNums[i] && (countMap.has(inputNums[i]) && countMap.get(inputNums[i]) -1 >= 0)**", meaning, considering the duplicate situation, the specific number that the user has entered is actually in the random number combinations, but it is not at the right position, then integer **b** increase by 1 and the count for the number in the hash map will decrese by one.

Finally, the **checkResult()** function returns a "**result**" array for the game log. The fisrt element "**result[0]**" is the user input numbers. The second element "**result[1]**" is the guess result.

After comparing the results, the **game.js** will check if the user win. If the integer **a** is equal to **num** (it is also the length of **inputNums** or **randNums** array) and **attempts** is not more than 10, user win. It will give an alert and reset the **attempts** variable to 0 and refresh the page to restart the game at the same difficulty level. If **a** is not equal to **num** and **attempts** is not 10 yet, an activity and result log will be created. If If **a** is not equal to **num** but **attempts** is equal to 10, the user lose the game. It will It will give an alert and reset the **attempts** variable to 0 and refresh the page to restart the game at the same difficulty level.
