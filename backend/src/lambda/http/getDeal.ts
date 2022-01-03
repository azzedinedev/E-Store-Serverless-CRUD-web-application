import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getDeal } from '../../businessLogic/deals';
import { createLogger } from '../../utils/logger';

const logger = createLogger("ALL REGULAR DEALS ");

//  Get all REGULAR DEAL items
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    logger.info('Processing Event ', event)
    
    const dealId = event.pathParameters.dealId
    const dealItem = await getDeal(dealId)
    
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
