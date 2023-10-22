### Validate email address
```ts
const validateEmail = (email: string)=> {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### Validate password 
```ts
function validatePassword(password: string) {
  //regex pattern for checking password length is minimum 8 characters which must include uppercase letter, lower case letter, digit and special character
  var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //test the password against the pattern
  return pattern.test(password);
}
```
