import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Flex, FlexItem, Box } from '@looker/components';
import styled from 'styled-components'
import { MercadoLogo } from './MercadoLogo';
import { Sidebar } from './Sidebar';
import { Controller } from './Controller';
import { USER_ATTRIBUTE, LOGIN_USER } from '../config';
import { find } from 'lodash'

export function App() {
  const [showMenuText, setShowMenuText] = useState(true)
  const [selected, setSelected] = useState("Home")
  const [user, setUser] = useState<any>(undefined)
  const [ready, setReady] = useState<any>(false)
  const [loading, setLoading] = useState(true);
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK
  const sidebar = (showMenuText) ? 10 : 5

  useEffect(()=>{
    setTimeout(()=>{setLoading(false)},2000);
    getUser();
  },[])

  const getUser = async () => {
    const user = await sdk.ok(sdk.me())
    const values = await sdk.ok(sdk.user_attribute_user_values({user_id: user.id!}))
    const user_login_attributes = find(values, {name: USER_ATTRIBUTE})
    const user_login = find(LOGIN_USER, {id: user_login_attributes!.value})
    setUser(user_login)
  }

  useEffect(()=>{
    if (user && !loading) { setReady(true)}
  })

  return (
    <Flex height="100vh" width="100vw" justifyContent="stretch" flexDirection="column">
        <FlexItem 
          height={(ready)?'40px':'100%'}
          alignSelf={(ready)?'flex-start':'center'}
        > 
          <MercadoLogo animate={!ready} onClick={()=>{setShowMenuText(!showMenuText)}}></MercadoLogo>
        </FlexItem>
        { ready  && <FlexItem height="90%">
          <Flex justifyContent="stretch" flexDirection="row">
            <FlexItem width={`${sidebar}%`}>
              <Sidebar 
                {...{showMenuText, setShowMenuText,selected,setSelected}}
              ></Sidebar>
            </FlexItem>
            <FlexItem 
              width={`${100-sidebar}%`}
            >
              <Box m="medium">
                <Controller 
                  {...{selected, user}}
                ></Controller>
              </Box>
            </FlexItem>
          </Flex>
        </FlexItem> }
    </Flex>
  );
}
