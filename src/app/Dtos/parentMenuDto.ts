export type ParentMenu = {
    id: number,
    parentMenuName: string;
    menus: Menu[];
}

export type Menu = {
    menuId: number;
    parentMenuName: string;
    subMenuName?: string;
    uiLink: string | null;
    isActive: boolean;
    ysnParent: boolean;
    orderBy: number;
    makeDate: string;
    menuLogo?: string | null;
    childMenus?: ChildMenu[];
}

export type ChildMenu = {
    childId: number;
    childName: string;
    uiLink: string | null;
    isActive: boolean;
    ysnParent: boolean;
    orderBy: number;
    makeDate: string;
    menuLogo: string | null;
}