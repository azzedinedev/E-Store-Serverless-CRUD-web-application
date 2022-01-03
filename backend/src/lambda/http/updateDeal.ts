import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger";
import { UpdateDealRequest } from '../../requests/UpdateDealRequest'
import { updateDeal } from '../../businessLogic/deals'

const logger = createLogger("updatetodo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dealId = event.pathParameters.dealId
    const updatedDeal: UpdateDealRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const dealItem = await updateDeal(updatedDeal, dealId, userId)
    
    logger.info("DEAL UPDATED", {
      
      key: dealId,
      userId: userId,
      date: new Date().toISOString,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: dealItem
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
