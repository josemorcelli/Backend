var AccountType;
(function (AccountType) {
    AccountType["Admin"] = "Admin_User";
    AccountType["Normal"] = "Normal_User";
})(AccountType || (AccountType = {}));
var PermissionType;
(function (PermissionType) {
    PermissionType[PermissionType["Admin"] = 1] = "Admin";
    PermissionType[PermissionType["Normal"] = 0] = "Normal";
})(PermissionType || (PermissionType = {}));
const user1 = {
    id: 1,
    name: "José",
    email: "jose@barros.com",
    password: "123456",
    account: AccountType.Admin,
    permission: PermissionType.Admin
};
const user2 = {
    id: 2,
    name: "Junior",
    email: "junior@labenu.com",
    password: "123456",
    account: AccountType.Normal,
    permission: PermissionType.Normal
};
let users = [];
users.push(user1);
users.push(user2);
console.table(users);
//# sourceMappingURL=index.js.map