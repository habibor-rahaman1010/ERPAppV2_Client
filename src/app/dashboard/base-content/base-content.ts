import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authServices/auth';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Menu } from '../../Dtos/parentMenuDto';
import { UserModule } from '../../Dtos/userResponseDto';


@Component({
  selector: 'app-base-content',
  standalone: true,
  imports: [CommonModule, TreeModule, ToastModule],
  templateUrl: './base-content.html',
  styleUrl: './base-content.css',
  providers: [AuthService]
})

export class BaseContent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) { }

  userModules: UserModule[] = [];
  treeManuesData: TreeNode[] = [];
  moduleId: string | number | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.moduleId = Number(params.get('moduleId'));
    });

    this.authService.userModules.subscribe(modules => {
      this.userModules = modules;
      this.treeManuesData = this.transformDataToTreeNodes(this.userModules);
    });
  }

  transformDataToTreeNodes(userModulesData: UserModule[]): TreeNode[] {
    const menuMap: Record<string, Menu[]> = {};

    userModulesData.forEach(module => {
      if (module.id === this.moduleId) {
        module.menus.forEach(menu => {
          if (!menuMap[menu.parentMenuName]) {
            menuMap[menu.parentMenuName] = [];
          }
          menuMap[menu.parentMenuName].push(menu);
        });
      }
    });

    return Object.keys(menuMap).map(menuName => {
      const menus = menuMap[menuName];
      const subMenuNodes: TreeNode[] = menus.map(menu => {
        const childNodes: TreeNode[] = menu.childMenus?.map(child => ({
          key: `${menu.menuId}-${child.childId}`,
          label: child.childName,
          data: child.uiLink,
          icon: 'pi pi-fw pi-file',
          selectable: !!child.uiLink
        })) || [];

        return {
          key: menu.menuId.toString(),
          label: menu.subMenuName || menu.parentMenuName,
          data: null,
          icon: 'pi pi-fw pi-folder',
          selectable: false,
          children: childNodes
        } as TreeNode;
      });

      return {
        key: menuName,
        label: menuName,
        data: null,
        icon: 'pi pi-fw pi-folder',
        selectable: false,
        children: subMenuNodes
      } as TreeNode;
    });
  }

  onNodeSelect(event: TreeNodeSelectEvent) {
    const uiLink = event.node.data;
    if (uiLink) {
      this.router.navigate([uiLink]);
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
    this.authService.userMenueRefresh().subscribe(data => {
      if (data) {
        const treeData = this.transformDataToTreeNodes(data);
        this.treeManuesData = [...treeData];
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}