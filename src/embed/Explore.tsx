import React, { useCallback, useContext, useState, useEffect } from "react"
import { LookerEmbedSDK, LookerEmbedExplore } from '@looker/embed-sdk'
import {
  ExtensionContext,
  ExtensionContextData,
} from "@looker/extension-sdk-react"
import styled from 'styled-components'
import { MercadoLogo } from "../main/MercadoLogo"
import { Flex, Grid, FlexItem } from "@looker/components"

export const Explore = ({ qid, input, toggle }: any) => {
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState<any>()
  const [explore, setExplore] = useState<LookerEmbedExplore>()
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  const setupExplore = (explore: LookerEmbedExplore) => {
    setExplore(explore)
  }

  useEffect(()=>{
    if (qid && input) {
      newQuery();
    } else if (qid) {
      qidToQuery();
    }
  },[])

  const qidToQuery = async () => {
    const q = await sdk.ok(sdk.query_for_slug(qid));
    setQuery(q);
  }

  const newQuery = async () => {
    const q = await sdk.ok(sdk.query_for_slug(qid));
    const new_query = {
      ...q, 
      filters: {
        ...q.filters, 
        [input.field]: `%${input.value}%`
      },
      id: undefined, 
      client_id: undefined, 
      filter_config: undefined
    }
    const new_q = await sdk.ok(sdk.create_query(new_query))
    console.log({new_q, input, new_query})
    setQuery(new_q);
  }

  const embedCtrRef = useCallback(el => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
    if (el && hostUrl && query) {
      LookerEmbedSDK.init(hostUrl)
      LookerEmbedSDK.createExploreWithId(`${query.model}/${query.view}`)
        .withParams({qid: query.client_id, toggle})
        .appendTo(el)
        .on('explore:ready', console.log)
        .on('explore:run:start', console.log)
        .on('explore:run:complete', ()=>setLoaded(true))
        .build()
        .connect()
        .then(setupExplore)
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [query])
  console.log(query)
  const embed_display = (loaded) ? {} : {display: 'none'}
  return (
    <StyledFlex width="100%" justifyContent="stretch" flexDirection="column">
      {!loaded && <FlexItem height="100%" alignSelf='center'><MercadoLogo animate={true} onClick={()=>{}}></MercadoLogo></FlexItem>}
      {query && <EmbedContainer style= {embed_display} ref={embedCtrRef} />}
    </StyledFlex>
  )
}

const StyledFlex = styled(Flex)`
  height: calc(100vh - 100px);
`

const EmbedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  & > iframe {
    width: 100%;
    height: 100%;
  }
`