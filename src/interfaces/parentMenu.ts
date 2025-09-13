export interface ParentMenu {
    id: number,
    menuName: string;
    menus: Menu[];
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