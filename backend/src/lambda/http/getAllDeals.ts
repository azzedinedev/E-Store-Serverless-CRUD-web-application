import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger';
import { getAllDealsPerUser } from '../../businessLogic/deals';

const logger = createLogger("ALL USER'S DEALS ");

//  Get all DEAL items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    logger.info('Processing Event ', event)
    const userId = getUserId(event)
    const deals = await getAllDealsPerUser(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: deals
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
