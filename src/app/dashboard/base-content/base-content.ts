import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authServices/auth';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ChildMenu, Menu, ParentMenu } from '../../../interfaces/parentMenu';


@Component({
  selector: 'app-base-content',
  standalone: true,
  imports: [CommonModule, TreeModule, ToastModule],
  templateUrl: './base-content.html',
  styleUrl: './base-content.css',
  providers: [AuthService]
})

export class BaseContent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  manuesData: ParentMenu[] = [];
  treeManuesData: TreeNode[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('userMenues');
    if (data) {
      this.manuesData = JSON.parse(data);
      this.treeManuesData = this.transformDataToTreeNodes(this.manuesData);
      console.log("Transformed Tree Node Data:", this.treeManuesData);
    }
  }

  transformDataToTreeNodes(parentMenusData: ParentMenu[]): TreeNode[] {
    return parentMenusData.map(parent => {
      // Each parent can have multiple menus
      const menuNodes: TreeNode[] = parent.menus.map((menu: Menu) => {
        const childNodes: TreeNode[] = menu.childMenus?.map((child: ChildMenu) => ({
          key: `${menu.menuId}-${child.childId}`,
          label: child.childName,
          data: child.uiLink,
          icon: 'pi pi-fw pi-file',
          selectable: !!child.uiLink // only selectable if uiLink exists
        })) || [];

        return {
          key: menu.menuId.toString(),
          label: menu.subMenuName || menu.menuName,
          data: menu.uiLink,
          icon: 'pi pi-fw pi-folder',
          selectable: false,
          children: childNodes
        } as TreeNode;
      });

      return {
        key: parent.menuName, // or parent.menuId if you prefer
        label: parent.menuName,
        data: null,
        icon: 'pi pi-fw pi-folder',
        selectable: false,
        children: menuNodes
      } as TreeNode;
    });
  }

  onNodeSelect(event: TreeNodeSelectEvent) {
    const uiLink = event.node.data;
    if (uiLink) {
      this.router.navigate([uiLink]);
      console.log(`Navigating to: ${uiLink}`);
    } else {
      console.log(`Parent node selected: ${event.node.label}`);
    }
  }

  logoutUser() {
    this.authService.logout().subscribe(
      {
        next: (response: any) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Logout Successful',
              detail: `User logout has been successfully!`
            });
            this.router.navigate(['/']);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Logout Failed',
              detail: 'Invalid response from server. Please try again.'
            });
          }
        }
      }
    );
  }

  menueRefresh() {
    console.log('hello programmer!');
    // in futucher we will develop the feature as son as posible...
  }
}