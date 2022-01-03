import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger";
import { makeDealSpecial } from '../../businessLogic/deals'
import { SpecialDealRequest } from '../../requests/SpecialDealRequest'

const logger = createLogger("updatetodo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dealId = event.pathParameters.dealId
    const specialDeal: SpecialDealRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const dealItem = await makeDealSpecial(specialDeal, dealId, userId)
    
    logger.info("DEAL GOT SPECIAL", {
      
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
