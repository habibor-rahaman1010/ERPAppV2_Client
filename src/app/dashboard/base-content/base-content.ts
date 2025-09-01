import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authServices/auth';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastService } from '../../services/ToastServices/toastService';
import { ToastModule } from 'primeng/toast';

interface Menu {
  menuId: number;
  menuName: string;
  subMenuName: string;
  uiLink: string | null;
  isActive: boolean;
  ysnParent: boolean;
  orderBy: number;
  makeDate: Date;
  menuLogo: string;
}

@Component({
  selector: 'app-base-content',
  standalone: true,
  imports: [CommonModule, TreeModule, ToastModule],
  templateUrl: './base-content.html',
  styleUrl: './base-content.css',
  providers: [AuthService]
})
export class BaseContent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  manuesData: Menu[] = [];
  treeManuesData: TreeNode[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('userMenues');
    if (data) {
      this.manuesData = JSON.parse(data);
      this.treeManuesData = this.transformDataToTreeNodes(this.manuesData);
      console.log("Transformed Tree Node Data:", this.treeManuesData);
    }
  }

  transformDataToTreeNodes(menuData: Menu[]): TreeNode[] {
    const parentMenus = menuData.filter(menu => menu.ysnParent === true);

    const prarentTreeNodes: TreeNode[] = parentMenus.map(parent => {
      const childrenOfParent = menuData.filter(child => child.menuName === parent.menuName && !child.ysnParent);
      const childNodes: TreeNode[] = childrenOfParent.map(child => ({
        key: child.menuId.toString(),
        label: child.subMenuName,
        data: child.uiLink,
        icon: 'pi pi-fw pi-file',
      }));

      return {
        key: parent.menuId.toString(),
        label: parent.menuName,
        data: parent.menuName,
        icon: 'pi pi-fw pi-folder',
        children: childNodes,
        selectable: false
      };
    });

    return prarentTreeNodes;
  }

  onNodeSelect(event: TreeNodeSelectEvent) {
    // Check if the selected node is a child node (i.e., it has a uiLink)
    const uiLink = event.node.data;
    if (uiLink) {
      this.router.navigate([uiLink]);
      console.log(`Navigating to: ${uiLink}`);
    } else {
      // Optional: Log a message if a parent node is clicked
      console.log(`Parent node selected: ${event.node.label}`);
    }
  }

  menueRefresh() {
    console.log('hello programmer!');
    // in futucher we will develop the feature as son as posible...
  }
}