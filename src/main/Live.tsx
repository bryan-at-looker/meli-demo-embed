import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code } from '@looker/components';
import styled from 'styled-components'
import { WebAnalyticsDashboard } from '../embed/WebAnalyticsDashboard';

export function Page() {
  const [me, setMe] = useState({});
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    apiCall();
  },[])

  const apiCall = async () => {
    const me = await sdk.ok(sdk.me())
    setMe(me)
  }

  return (
    <></>
  );
}

const StyledCode = styled(Code)`
  white-space: pre;
`