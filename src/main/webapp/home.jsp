<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri ="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="css/home.css"></link>
	<title>MasterMind Game</title>
</head>
<body>
	<div id="mainContainer">
		<h1>Welcome to the MasterMind Game!</h1>

		<h2 >Select a difficulty to start</h2>
		
		
		<c:forEach var = "difficulty" items = "${ difficulties }">
			<p class = "level"><a href="/${difficulty}"><c:out value="${ difficulty }"/></a></p>
		</c:forEach>
		
	
	</div>
</body>
</html>