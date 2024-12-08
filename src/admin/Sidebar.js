import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ height: '100vh', position: 'fixed' }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Laowi
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact="true"
              to="/admin/questions"
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
            >
              <CDBSidebarMenuItem icon="columns">Questions</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact="true"
              to="/admin/submitted-details"
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
            >
              <CDBSidebarMenuItem icon="table">Submitted Details</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink
              exact="true"
              to="/admin/usernames"
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
            >
              <CDBSidebarMenuItem icon="table">Usernames</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
        {/* This is where the routed child components will render */}
      </div>
    </div>
  );
};

export default Sidebar;
