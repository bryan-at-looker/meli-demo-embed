import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Icon, MenuItem, MenuList, Box } from '@looker/components';
import styled from 'styled-components'

export function Sidebar( {selected, setSelected, showMenuText, setShowMenuText}: any) {

  const menus = [
    { title: "Home", icon: "Home" },
    { title: "Live", icon: "Explore" },
    { title: "Previous", icon: "Clock" },
    { title: "Decide", icon: "Beaker" },
    { title: "Alerts", icon: "AddAlerts" },
    { title: "Blast", icon: "DigitalMarketingApp" },
    { title: "Trends", icon: "Popular" },
  ]

  const MenuItems = menus.map((m,i)=>{
    return <MenuItem
      onClick={(e)=>{ setSelected(e.currentTarget.getAttribute('value')); setShowMenuText(false); } }
      current={(selected==m.title)}
      value={m.title}
      key={i}
      icon={m.icon}
    >{(showMenuText)?m.title:''}</MenuItem>
  })

  return (
    <Box mt="medium">
      <StyledMenuList
        customizationProps={{
          marker: {
            color: '#ffe900',
            size: 8,
          },
          iconSize: 40,
          iconColor: '#002f6d'
        }}
      >
        {MenuItems}
      </StyledMenuList>
    </Box>
  );
}

const StyledMenuList = styled(MenuList)`
min-width: 0px;
`