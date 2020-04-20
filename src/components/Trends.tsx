import React, { useEffect, useContext,useState } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { MenuList, MenuGroup, MenuItem, Text, PopoverContent, Popover, Flex, FlexItem, Icon } from '@looker/components';
import styled, { keyframes } from 'styled-components'
import { NumberToColoredPercent } from './NumberToColoredPercent';
import { ExtensionHostApi } from '@looker/extension-sdk';
import { orderBy, find } from 'lodash'
import { sdkError } from '@looker/sdk/dist/rtl/transport';
import { TREND_SPACE } from '../config';

const bg_color_hover = "rgba(170, 184, 194, 0.1);"
const MAX_LOOPS = 50;

export function Trends( {}: any) {
  const [trends, setTrends] = useState<any>([])
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const extensionHost = extensionContext.extensionSDK as ExtensionHostApi
  const sdk = extensionContext.coreSDK
  useEffect(()=>{
    getTrends()
  },[])

  const getTrends = async () => {
    let looks = await sdk.ok(sdk.search_looks({
      space_id: TREND_SPACE
    }))

    const query_tasks = looks.map((l) => { 
      return sdk.ok(sdk.create_query_task(
        {
          body: {
            query_id: l.query_id!,
            look_id: l.id,
            result_format: 'json_detail',
          },
          limit: 1,
          generate_drill_links: true    
        }
      )) 
    })
    const all_query_tasks = await Promise.all(query_tasks)

    let current_qt_ids = all_query_tasks.map(qt=>{ return qt.id!})
    let completed_tasks: any = []
    for ( var i=0; i<MAX_LOOPS; i++) {
      // @ts-ignore
      const current_qts: any = await sdk.ok(sdk.query_task_multi_results(current_qt_ids.join(',')))
      Object.keys(current_qts).forEach((id: any)=>{
        if (current_qts[id]['status'] === 'complete') {
          const aqt_found = find(all_query_tasks, {id: id })
          const look_found = (aqt_found) ? find(looks, {id: aqt_found.look_id!}) : {}
          completed_tasks.push({
            id: id,
            results: current_qts[id]['data'],
            data: current_qts[id]['data']['data'],
            look: look_found
          })
          // @ts-ignore
          current_qt_ids = removeA(current_qt_ids, id)
        }
      })
      if (current_qt_ids.length == 0 ) {
        break;
      }
      await (sleep(2000))
    }

    setTrends(completed_tasks)
  }

  if ( trends?.length ) {
    const ordered_trends = orderBy(trends, [function(o) { 
      return Math.abs(o.data[0]['trend']['value'])*-1
    }])
    const MenuItems = ordered_trends.slice(0,5).map((t: any)=>{
      return ThisPeriod(t, extensionHost)
    })
  
    return (
      <>
        <MenuList
          customizationProps={{
            bg: "transparent",
            current: {
              bg: "transparent",
            },
            hover: {
              bg: bg_color_hover
            },
          }}
        >
          <MenuGroup label="Trending KPIs" 
            // @ts-ignore 
            labelProps={{ bg: "transparent", 
            fontSize:"large", 
            fontWeight:"bold" }}>
            {MenuItems}
          </MenuGroup>
        </MenuList>
      </>
    );
  } else {
    return <>        <MenuList
    customizationProps={{
      bg: "transparent",
      current: {
        bg: "transparent",
      },
      hover: {
        bg: bg_color_hover
      },
    }}
  >
    <MenuGroup label="Trending KPIs" 
      // @ts-ignore 
      labelProps={{ bg: "transparent", 
      fontSize:"large", 
      fontWeight:"bold" }}>
      {(new Array(5).fill(0)).map((x,i)=>{
        return <StyledMenuItem
            pl="medium" 
            pr="medium"
            key={i}
          ><TextLoadingSpan i={i}/>
        </StyledMenuItem>
        })}
    </MenuGroup>
  </MenuList></>
  }
 
}

const StyledMenuList = styled(MenuList)`
  & > li {
    padding-top: 4px;
    padding-bottom: 0px;
  }
`

const StyledMenuItem = styled(MenuItem)`
  &:before {
    content: ' ';
    display: block;
    height: 1px;
    border-top:solid 1px rgb(230, 236, 240);
    width: 100%;
}
  & > button {
    display: block ;
  }
`

function ThisPeriod (t: any, extensionHost: ExtensionHostApi) {
  return <StyledMenuItem
    pl="medium" pr="medium"
    key={t.id}
  >
    <Flex>
      <FlexItem width="90%">
        <Text 
        as="div" 
        fontSize="small"
        fontWeight="light"  
      >{t.look?.description}</Text>
      <Text 
        as="div"
        fontWeight="bold"  
      >{t.look?.title}</Text>
      <NumberToColoredPercent 
        abs_val={t.data[0]['this_period']['rendered'] || t.data[0]['this_period']['value']}
        val={t.data[0]['trend']['value']} 
        positive_good={t.data[0]['positive_good']['value']=='Yes'}
      ></NumberToColoredPercent>
      </FlexItem>
      <FlexItem width="10%">
        {ThisPeriodPop(t, extensionHost)}
      </FlexItem>
    </Flex>
  </StyledMenuItem>
}

function ThisPeriodPop (t: any, extensionHost: ExtensionHostApi) {
  if ( t?.data[0]?.this_period?.links?.length ) {
    const LinkMenu = t.data[0].this_period.links.map((l: any, i:number)=>{
      return <MenuItem 
        icon="LogoRings" 
        onClick={()=>{extensionHost.openBrowserWindow(l.url.replace('/embed/','/'), "_link")}}
        href={l.url.replace('/embed/','/')}
        key={i}
    >{l.label}</MenuItem>  
    })
    return <Popover
    key={t.id}
    placement="auto"
    content={
      <PopoverContent width="300px">
        <Text fontSize="small">
          <StyledMenuList>
            {LinkMenu}
          </StyledMenuList>
        </Text>
      </PopoverContent>
    }
  >
  {(onClick, ref, className) => (
              <Icon
                name="CaretDown"
                size={24}
                aria-haspopup="true"
                // @ts-ignore
                onClick={onClick}
                ref={ref}
                className={className}
              />
            )}
  </Popover>
  } else {
    return <></>
  }
}

const sleep = async (ms: number) => {
  return new Promise(resolve  =>{
    setTimeout(resolve, ms)
  })
}

function removeA(arr: string[], a: string) {
  var ax; 
    while ((ax= arr.indexOf(a)) !== -1) {
      arr.splice(ax, 1);
    }
  return arr;
}

const kf = keyframes`
0% {
  background-position: -200px 0px;
}
100% {
  background-position: calc(200px + 100%) 0px;
}`;

const TextLoadingSpan = styled.span`
cursor: pointer;
user-select: none;
box-sizing: border-box;
padding: 0px;
background-size: 200px 100%;
display: flex;
line-height: 1;
width: 100%;
min-width: 30px;
height: 60px;
background-repeat: no-repeat;
border-radius: 4px;
background-color: rgb(245, 246, 247);
background-image: linear-gradient(90deg, rgb(245, 246, 247), rgb(222, 225, 229), rgb(245, 246, 247));
animation: 1.2s ease-in-out 0s infinite normal none running ${kf};
`
