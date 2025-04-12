'use client'

import { useState, useEffect } from "react";
import '@/app/Css/DashboardLayout.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  WechatOutlined,
  StarOutlined,
  FlagOutlined,
  SettingOutlined,
  RightCircleFilled,
  TeamOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  TrophyOutlined,
  ToolOutlined,
  FolderOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import { useAuth } from "@/auth/context";
import { usePathname, useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { RoleGuard } from "@/components/RoleGuard";

const { Header, Sider, Content } = Layout;

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { token: { colorBgContainer } } = theme.useToken();
  const { logout, state } = useAuth();
  const role = state.user?.role;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerVisible(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const canView = (roles: string[]) => roles.includes(role || '');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href='/dashboard'>Dashboard</Link>,
    },
    ...(canView(['admin']) ? [
      {
        key: 'organization',
        icon: <TeamOutlined />,
        label: 'Organization',
        children: [
          { key: 'department', icon: <RightCircleFilled />, label: <Link href='/dashboard/department'>Department</Link> },
          { key: 'sub-department', icon: <RightCircleFilled />, label: <Link href='#'>Sub Department</Link> },
          { key: 'announcements', icon: <RightCircleFilled />, label: <Link href='#'>Announcements</Link> },
          { key: 'company-policy', icon: <RightCircleFilled />, label: <Link href='#'>Company Policy</Link> },
        ],
      },
      {
        key: 'timesheet',
        icon: <ClockCircleOutlined />,
        label: 'Time Sheet',
        children: [
          { key: 'attendance', icon: <RightCircleFilled />, label: <Link href='#'>Attendance</Link> },
          { key: 'calendar', icon: <RightCircleFilled />, label: <Link href='#'>TimeSheet Calender</Link> },
          { key: 'overtime', icon: <RightCircleFilled />, label: <Link href='#'>Overtime Request</Link> },
          { key: 'shift', icon: <RightCircleFilled />, label: <Link href='#'>Office Shift</Link> },
          { key: 'holidays', icon: <RightCircleFilled />, label: <Link href='#'>Manage Holidays</Link> },
          { key: 'leaves', icon: <RightCircleFilled />, label: <Link href='#'>Manage Leaves</Link> },
        ],
      },
      {
        key: 'training',
        icon: <ReadOutlined />,
        label: 'Training',
        children: [
          { key: 'training-main', icon: <RightCircleFilled />, label: <Link href='#'>Training</Link> },
          { key: 'training-type', icon: <RightCircleFilled />, label: <Link href='#'>Training Type</Link> },
          { key: 'trainers', icon: <RightCircleFilled />, label: <Link href='#'>Trainers</Link> },
        ],
      },
      {
        key: 'performance',
        icon: <TrophyOutlined />,
        label: 'Performance',
        children: [
          { key: 'indicators', icon: <RightCircleFilled />, label: <Link href='#'>Indicators</Link> },
          { key: 'appraisal', icon: <RightCircleFilled />, label: <Link href='#'>Appraisal</Link> },
          { key: 'kpi', icon: <RightCircleFilled />, label: <Link href='#'>KPI</Link> },
          { key: 'kpi-report', icon: <RightCircleFilled />, label: <Link href='#'>KPI Report</Link> },
        ],
      },
      {
        key: 'project-manager',
        icon: <ProjectOutlined />,
        label: 'Project Manager',
        children: [
          { key: 'projects', icon: <RightCircleFilled />, label: <Link href='#'>Projects</Link> },
          { key: 'tasks', icon: <RightCircleFilled />, label: <Link href='#'>Tasks</Link> },
        ],
      },
    ] : []),
    {
      key: 'tickets',
      icon: <ToolOutlined />,
      label: <Link href='#'>Tickets</Link>,
    },
    {
      key: 'files-manager',
      icon: <FolderOutlined />,
      label: <Link href='#'>Files Manager</Link>,
    },
    {
      key: 'events-meetings',
      icon: <CalendarOutlined />,
      label: 'Events & Meetings',
      children: [
        { key: 'events', icon: <RightCircleFilled />, label: <Link href='#'>Events</Link> },
        { key: 'meetings', icon: <RightCircleFilled />, label: <Link href='#'>Meetings</Link> },
      ],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  

  return (
    <RoleGuard allowedRoles={['admin', 'vendor']}>
    <Layout className="h-screen">
      {!isMobile && (
        <Sider collapsed={collapsed} className="hide-scrollbar" style={{ background: "gray", height: "100vh", position: "fixed", left: 0 }}>
          <div className="mt-4 mb-4 flex justify-center">
            <img src="/logo.JPG" className="w-15 h-15 rounded mt-2" alt="Logo" />
          </div>
          <Menu theme="dark" mode="inline" items={menuItems} defaultSelectedKeys={["dashboard"]} style={{ background: "transparent", color: "white" }} />
        </Sider>
      )}

      {isMobile && (
        <Drawer title="Dashboard" placement="left" closable onClose={toggleDrawer} open={drawerVisible} width={250} styles={{ body: { padding: 0, background: "gray" } }}>
          <div className="flex justify-center p-2">
            <img src="/logo.JPG" className="w-10 h-10 mt-2" alt="Logo" />
          </div>
          <Menu theme="dark" mode="inline" items={menuItems} defaultSelectedKeys={["dashboard"]} style={{ background: "transparent", color: "white" }} />
        </Drawer>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0, background: "#fff" }}>
          <div className="flex justify-between mx-6">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={isMobile ? toggleDrawer : toggleSidebar}
              style={{ fontSize: 16, width: 64, height: 64 }}
            />
            <div className="flex gap-4 items-center">
              <WechatOutlined className="text-lg" />
              <StarOutlined className="text-lg" />
              <FlagOutlined className="text-lg" />
              <SettingOutlined className="text-lg" />
            </div>
          </div>
        </Header>

        <Content className="hide-scrollbar" style={{ margin: "10px", padding: 15, minHeight: 310, borderRadius: 8, overflowY: "auto", height: "calc(100vh - 64px)" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
    </RoleGuard>
  );
};

export default MainDashboardLayout;