<%@page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html>
<center><h2>Register Guys!!!</h2></center>
<form:form action="/for" method="post">
    Username : 
    <form:input type="text" path="username"></form:input>
    Password : 
    <form:input type="password" path="password"></form:input>
    <button type="submit">Login</button>
</form:form>
</html>