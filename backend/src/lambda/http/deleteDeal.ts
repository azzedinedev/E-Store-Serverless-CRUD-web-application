import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger"
import { deleteDeal } from '../../businessLogic/deals'

const logger = createLogger("deleteDeal");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dealId = event.pathParameters.dealId
    const userId = getUserId(event)
    const deleteData = await deleteDeal(dealId, userId)

    logger.info("DEAL DELETED", {
      
      key: dealId,
      userId: userId,
      date: new Date().toISOString,
    });

    return {
      statusCode: 200,
      body: deleteData
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
