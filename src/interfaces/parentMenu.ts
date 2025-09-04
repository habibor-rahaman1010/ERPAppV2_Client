export interface ChildMenu {
    childId: number;
    childName: string;
    uiLink: string | null;
    isActive: boolean;
    ysnParent: boolean;
    orderBy: number;
    makeDate: string;
    menuLogo: string | null;
}

export interface Menu {
    menuId: number;
    menuName: string;
    subMenuName?: string;
    uiLink: string | null;
    isActive: boolean;
    ysnParent: boolean;
    orderBy: number;
    makeDate: string;
    menuLogo?: string | null;
    childMenus?: ChildMenu[];
}

export interface ParentMenu {
    menuName: string;
    menus: Menu[];
}