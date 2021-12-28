const users = [];

export function getAllUsers(req, res) {
  res.status(200).json(users);
}

export function addNewUser(req, res) {
  console.log("TEST000, ", req);
  console.log("TEST   ", req.body);
  const { name: user } = req.body;

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
  const { id, name } = req.body;

  if (!id.trim() || !name.trim()) {
    res.status(403).json({ error: "Не указано id or name user" });
    return;
  }

  if (!users.find((user) => user.id === id)) {
    res.status(404).json({ success: false, error: "user not found" });
    return;
  }

  console.log(id, name);

  users.map((user) => {
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
  const { id } = req.body;

  if (!id.trim()) {
    res.status(403).json({ success: false, error: "Нету id" });
  }

  if (!users.find((user) => user.id === id)) {
    res.status(404).json({ success: false, error: "user not found" });
    return;
  }

  users.filter((user) => user.id === id);

  res.status(200).json({ success: true, message: "user success deleted" });
}
