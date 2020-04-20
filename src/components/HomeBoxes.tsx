import React from 'react';
import { Flex, Card, CardMedia, FlexItem, CardContent, Heading, Text, List, ListItem, Code } from "@looker/components";
import styled from "styled-components";
import {Trends} from './Trends'

export function HomeBoxes ({user}: any) {
return <>
  <Flex justifyContent="center" >
      <InsightsFlex>
        <Card p="large" raised>
          <CardMedia
            image={user.logo} 
            title="MercadoShops" 
          />
          <InsightsCardContent>
            <Heading  mb="large">{user.introduction}</Heading>
            <Text>{user.welcome_text}</Text>
          </InsightsCardContent>
        </Card>
      </InsightsFlex>
      <InsightsFlex>
        <Card p="large" raised>
          <Heading>
            Extension Framework Demo
          </Heading>
          <Heading mt="small" as='h3'>
            Removing the need for extra infrastructure
          </Heading>
          <Text  mt="small" fontSize="small">
            Looker's extension framework is built to provide new ways to experience data. The extension framework provides a way to embed visualizations and dashboards and use Looker's APIs all without the need for backend services. This means data experiences on top of Looker can be made quickly, with tyhe same level of security already built into Looker. This makes it easy to just develop front end code without the need for backend services just to interact with Looker.
          </Text>
          <Text mt="small" >Benefits include:</Text>
          <List  type="bullet" mt="small">
            <ListItem>Secure API access</ListItem>
            <ListItem>Looker user access and permissions</ListItem>
            <ListItem>Build your own experiences</ListItem>
            <ListItem>Javascript in LookML</ListItem>
          </List>
        </Card>
      </InsightsFlex>
      <InsightsFlex>
      <Card p="large" raised>
          <Trends>

          </Trends>
          {/* <Heading>
            Most Recent API call: <b>{}</b>
          </Heading>
          <Code as='pre' mt="small" fontSize="xsmall">
            {JSON.stringify({}, null, 2)}
          </Code> */}
        </Card>
      </InsightsFlex>
    </Flex>
    <Flex justifyContent="center">
    <InsightsFlex>
    <Card p="large" raised>
        <Heading>
          Click here for our training material
        </Heading>
      </Card>
    </InsightsFlex>
    <InsightsFlex>
    <Card p="large" raised>
        <Heading>
          Checkout our data dictionary for definitions
        </Heading>
      </Card>
    </InsightsFlex>
    <InsightsFlex>
    <Card p="large" raised>
        <Heading>
          Got feedback? <i>#slack-channel-here</i>
        </Heading>
      </Card>
    </InsightsFlex>
  </Flex>
  </>
}




const InsightsFlex = styled(FlexItem)`
width: 30vw;
margin: 0 1rem 1rem 1rem;
`

const InsightsCardContent = styled(CardContent)`
  & > h2 {
    text-align: center;
  }
  & > p {
    text-align: left
  }
`