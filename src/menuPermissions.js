
const subOptionsDict = (childrens) => {
    const dict = {};
    for (const children of childrens) {
        dict[children.name] = {
            roles: children.roles,
            permissions: children.permissions,
        };
    }
    return dict;
};

export const permissionsDict = (menuData) => {
    const menuDict = {};

    for (const option of menuData) {
        menuDict[option.name] = {
            roles: option.roles,
            permissions: option.permissions,
            childrens: option.hasChildrens ? subOptionsDict(option.childrens) : {},
        };
    }
    return menuDict
}