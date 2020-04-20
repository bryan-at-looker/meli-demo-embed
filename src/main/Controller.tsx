import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code } from '@looker/components';
import styled from 'styled-components'
import { HomeBoxes } from '../components/HomeBoxes';
import { ComingSoon } from './ComingSoon';
import { Blast } from '../components/Blast';
import { WebAnalyticsDashboard } from '../embed/WebAnalyticsDashboard';

export function Controller({ selected, user }: any) {
  const [me, setMe] = useState({});
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(() => {

  }, [])

  switch(selected) {
    case 'Home':
      return <HomeBoxes user={user}></HomeBoxes>
    case 'Blast':
      return <Blast></Blast>
    case 'Previous':
      return <WebAnalyticsDashboard/>
    default:
      return <ComingSoon></ComingSoon>
  }
}

const StyledCode = styled(Code)`
  white-space: pre;
`