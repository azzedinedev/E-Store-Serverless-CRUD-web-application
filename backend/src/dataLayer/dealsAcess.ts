import { DealSpecial } from './../models/DealSpecial';
import { DealItem } from './../models/DealItem';
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AttachmentUtils } from '../utils/attachmentUtils';
import { DealUpdate } from '../models/DealUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the dataLayer logic
export class DealsAcess {

    constructor(
      private readonly docClient: DocumentClient = createDynamoDBClient(),
      private readonly dealsTable = process.env.DEALS_TABLE, 
      private readonly typeIndex = process.env.DEALS_TYPE_INDEX,
      private readonly dealIdIndex = process.env.DEALS_ID_INDEX)
      {
      }
  
    async getAllRegularDeals(): Promise<DealItem[]> {
      console.log('Getting all regular deals')
  
      const result = await this.docClient.query({
        TableName: this.dealsTable,
        IndexName: this.typeIndex,
        KeyConditionExpression: 'dealType = :type',
        ExpressionAttributeValues: {
            ':type': 'Regular Deal'
          },
          ScanIndexForward: false
      }).promise()
  
      const items = result.Items
      return items as DealItem[]
    }
    
    async getAllSpecialDeals(): Promise<DealItem[]> {
      console.log('Getting all special deals')
  
      const result = await this.docClient.query({
        TableName: this.dealsTable,
        IndexName: this.typeIndex,
        KeyConditionExpression: 'dealType = :type',
        ExpressionAttributeValues: {
            ':type': 'Special Deal'
          },
          ScanIndexForward: false
      }).promise()
  
      const items = result.Items
      return items as DealItem[]
    }

    
    
    async getAllDealsPerUser(userId: string): Promise<DealItem[]> {
      console.log('Getting all deals per user')
  
      const result = await this.docClient.query({
        TableName: this.dealsTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
          },
          ScanIndexForward: false
      }).promise()
  
      const items = result.Items
      return items as DealItem[]
    }
  
    
    async getDeal(dealId: string):Promise<DealItem>{
      console.log('Getting  a particular deal ')
  
      const result =await this.docClient.query({
        TableName: this.dealsTable,
        IndexName : this.dealIdIndex,
      KeyConditionExpression: 'dealId = :dealId',
      ExpressionAttributeValues: {
          ':dealId': dealId
      }
  }).promise()

      const item = result.Items[0]
      return item as DealItem
  }
    
    
    async createDeal(deal: DealItem): Promise<DealItem> {
      console.log('Creating new deal')
      await this.docClient.put({
        TableName: this.dealsTable,
        Item: deal
      }).promise()
  
      return deal as DealItem
    }

    async updateDeal (dealUpdate: DealUpdate,dealId: string,userId: string): Promise<DealUpdate> {
      console.log('Updating deal')
      const result = await this.docClient.update({
        TableName: this.dealsTable,
        Key: {
          userId: userId,
          dealId: dealId
        },
        UpdateExpression: 'set #a = :a, #b = :b, #c = :c, #d = :d, #e = :e', 
        ExpressionAttributeNames: {
          '#a': 'name',
          '#b': 'description',
          '#c': 'dealType',
          '#d' : 'originalPrice',
          '#e' : 'salePrice'
        },
        ExpressionAttributeValues: {
          ':a': dealUpdate['name'],
          ':b': dealUpdate['description'],
          ':c': dealUpdate['dealType'],
          ':d': dealUpdate['originalPrice'],
          ':e': dealUpdate['salePrice'],
        },
        ReturnValues: 'ALL_NEW'
      }).promise()

      console.log(result)
      const attributes = result.Attributes
  
      return attributes as DealUpdate
    }
    
    async deleteDeal (dealId: string, userId: string): Promise<string> {
      console.log('Deleting deal')
  
      const result = await this.docClient.delete({
        TableName: this.dealsTable,
        Key: {
          userId: userId,
          dealId: dealId
        }
      }).promise()

      console.log(result)
  
      return '' as string
    }

    async makeDealSpecial (dealSpecial: DealSpecial,dealId: string,userId: string): Promise<DealSpecial> {
      console.log('making deal special')
      const result = await this.docClient.update({
        TableName: this.dealsTable,
        Key: {
          userId: userId,
          dealId: dealId
        },
        UpdateExpression: 'set #x = :x, #y = :y', 
        ExpressionAttributeNames: {
          '#x': 'dealType',
          '#y' : 'salePrice'
        },
        ExpressionAttributeValues: {
          ':x': 'Special Deal' ,
          ':y': dealSpecial['salePrice'],
 
        },
        ReturnValues: 'ALL_NEW'
      }).promise()

      console.log(result)
      const attributes = result.Attributes
  
      return attributes as DealSpecial
    }
  
    async createAttachmentPresignedUrl (dealId: string): Promise<string> {
      console.log('Generating URL')
      const url = await AttachmentUtils(dealId)
      console.log(url)

      return url as string
    }
  
  }
  
  function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log('Creating a local DynamoDB instance')
      return new XAWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      })
    }
    return new XAWS.DynamoDB.DocumentClient()
  }