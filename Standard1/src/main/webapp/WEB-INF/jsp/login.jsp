<%@page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html>
    <center><h2>Register Guys!!!</h2></center>
    <form:form action="/reg" methof="post">
        Username:<br>
        <form:input type="text" placeholder="Username" path="Username"></form:input>
        Password:<br>
        <form:input type="password" placeholder="Password" path="Password"></form:input>
        <button type="submit">Register</button>
    </form:form>
</html>