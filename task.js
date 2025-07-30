function validateForm(email, password) {
  // Пропуск: Проверь, что email содержит '@' и password длиннее 6 символов
  // Верни true, если валидация пройдена, иначе false
  let res = false;
  if (email.includes("@") && password.length > 6) {
    res = true;
  }
  return res;
}

function saveUser(email, password) {
  // Пропуск: Сохрани пользователя в "базу данных" (массив users)
  // Верни сообщение об успехе
  let user = {
    email,
    password,
  };

  users.push(user);
}

const users = [];

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validateForm(email, password)) {
      const result = saveUser(email, password);
      document.getElementById("output").innerText = result;
    } else {
      document.getElementById("output").innerText =
        "Ошибка: проверь email и пароль!";
    }
  });
