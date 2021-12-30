import {
  insert,
  findOne,
  find,
  remove,
  update,
  createCollection,
  deleteCollection,
} from "../index";

test("Create fake user collection", () => {
  createCollection("fakeUsers");
  const update = find("fakeUsers");
  expect(update.length).toBe(0);
});

test("Insert user", () => {
  const user = { _id: 5, name: "Valérie" };
  const update = insert("fakeUsers", user);
  expect(update).toBeTruthy();
});

test("Find user", () => {
  const user = { name: "Valérie" };
  const found = findOne("fakeUsers", user);
  expect(found._id).toBe(5);
});

test("Update user", () => {
  const user = { name: "Valérie" };
  const value = { name: "Noémie" };
  const found = update("fakeUsers", user, value);
  expect(found).toBeTruthy();
});

test("Try to Delete user", () => {
  const user = { name: "Valérie" };
  const update = remove("fakeUsers", user);
  expect(update).toBeFalsy();
});

test("really Delete user", () => {
  const user = { name: "Noémie" };
  const update = remove("fakeUsers", user);
  expect(update).toBeTruthy();
});

test("Find deleted user", () => {
  const user = { name: "Valérie" };
  const found = findOne("fakeUsers", user);
  expect(found).toBeFalsy();
});

test("Check fake user collection is not present in DB", () => {
  deleteCollection("fakeUsers");
  const update = find("fakeUsers");
  expect(update).toBeNull();
});
