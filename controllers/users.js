let users = [];

export function getAllUsers(req, res) {
  res.status(200).json(users);
}

export function addNewUser(req, res) {
  const user = req.params.name;

  if (!user.trim()) {
    res.status(403).json({ error: "Не указано имя человека" });
    return;
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: user,
  };

  users.push(newUser);
  res.status(200).json({ success: true, message: "user success added" });
}

export function editUser(req, res) {
  let id = req.params.id;
  const name = req.params.name;

  if (!id.trim() || !name.trim()) {
    res
      .status(403)
      .json({ success: false, error: "Не указано id or name user" });
  }

  id = Number(id);

  if (!users.some((user) => user.id === id)) {
    res.status(404).json({ success: false, error: "user not found" });
  }

  users = users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        name: name,
      };
    }
    return user;
  });

  res.status(200).json({ success: true, message: "user success edit" });
}

export function deleteUser(req, res) {
  let id = req.params.id;

  if (!id.trim()) {
    res.status(403).json({ success: false, error: "Нету id" });
  }

  id = Number(id);

  if (!users.find((user) => user.id === id)) {
    res.status(404).json({ success: false, error: "user not found" });
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json({ success: true, message: "user success deleted" });
}
