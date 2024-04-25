import React from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import RoleProtected , {RoleName} from '../components/RoleProtected/RoleProtected';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    items: MenuItem[];
    onClick: (info: MenuInfo) => void;
}

type MenuItem = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, items, onClick }) => {

    const menuItem = (menuItems: MenuItem[]) => {
        return menuItems.map(item => {
                  if(item.key ==="/account"){
                  return(
                    <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.MARKETING_MANAGER]} {...item}>
                    <Menu.Item  >
                    {item.label}
                    </Menu.Item>
                    </RoleProtected>)}
                  else if (item.key === "/faculty"){
                    return(
                        <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.MARKETING_MANAGER , RoleName.MARKETING_COORDINATOR]} {...item}>
                        <Menu.Item  >
                        {item.label}
                        </Menu.Item>
                        </RoleProtected>)
                  }
                    else {
                        return (<Menu.Item key={item.key} title={item.label} icon={item.icon}>
                          {item.label}
                        </Menu.Item>)
                    }
            } 
        );
    };


    

    return ( 
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ }}>
            <div className="demo-logo-vertical" />
            <ConfigProvider theme={{ token: {  colorText: '#92bdff' , colorBgContainer : "#92bdff"}}} >   
            <Menu className =" menu-side-bar" mode="inline" defaultSelectedKeys={['1']} onClick={onClick}>
                {menuItem(items)}
     
            </Menu>
            </ConfigProvider>
        </Sider>
    );
};

export default Sidebar;
