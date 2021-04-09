<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri ="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="css/game.css"></link>
	<title>MasterMind Game</title>
	<script type="text/javascript" src="/js/game.js" charset="utf-8"> </script>
</head>
<body>
	
	<div id="mainContainerGame">
		<div id="top">
			<h1 class="random"><c:out value ="${ randNums }"/></h1>
			<p id="back"><a href = "/">Back to Homepage</a></p>
			
			<p class="explaination">Enter <c:out value="${ num }"/> numbers (integers) between 0 and 7, and check the result.</p>
			<p class="explaination">"A" means both the number is correct and it is at the right position.</p>
			<p class="explaination">"B" means the number is correct but it is at the wrong position.</p>
			
			<h3 id="attempt">You have <c:out value = "${ attempts }"/> attempts to find the answer</h3>
			
		</div>
		
		
		<c:forEach var = "i" begin="1" end="${ num }">
			<div class="inputDiv">
				<label><c:out value="The ${i}th number: "/></label>
				<input class="inputNums"/>
			</div>
				
		</c:forEach>
		
		<div id="btn">
			<button onclick="onClickHandler()">Check Your Answer</button>
		</div>
		
		<div id="log"></div>
	
	</div>
		
</body>
</html>