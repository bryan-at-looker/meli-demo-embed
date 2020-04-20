import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Flex, FlexItem, Box, CardContent, Heading, Card, Text, Grid } from '@looker/components';
import { Explore } from '../embed/Explore';
import { BlastInput } from './BlastInput';
import { BLAST_ITEMS } from '../config';

export function Blast() {
  const [selected, setSelected] = useState<any>(undefined);
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    
  },[])

  const Cards = BLAST_ITEMS.map((c,i)=>{
    return <Box
        onClick={(c.input) ?  ()=>{} : ()=> setSelected(c)}
        key={i}
      >
        <Card raised>
          <CardContent>
            <Heading 
              fontSize="large">
              {c.heading}
            </Heading>
            <Text fontSize="small" variant="subdued">
              {c.text}
            </Text>
            { c.input && <>
              <BlastInput {...{c,setSelected}}></BlastInput>
            </> }
          </CardContent>
        </Card>   
      </Box>
  })

  return (
    <Box p="large">
      <Flex flexDirection="column">
        <FlexItem width="100%">
          { !selected && <Heading>Choose a Starting Point</Heading>}
          { selected && <Heading
            onClick={()=>{setSelected(undefined)}}
          >Back
          </Heading>}
        </FlexItem>
        <FlexItem width="95%">
          {!selected && <Grid
            m="large"
            columns={3}
          >
            {Cards}
          </Grid>}
          {selected && <Box
            m="large"
          >
            <Explore toggle={selected.toggle} qid={selected.qid} input={selected.input}></Explore>
          </Box>}
        </FlexItem>
      </Flex>
    </Box>
  );
}