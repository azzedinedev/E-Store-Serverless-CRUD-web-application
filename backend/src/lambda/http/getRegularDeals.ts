import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger';
import { getAllRegularDeals } from '../../businessLogic/deals';


const logger = createLogger("ALL REGULAR DEALS ");

//  Get all REGULAR DEAL items
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    logger.info('Processing Event ', event)
    
    const deals = await getAllRegularDeals()

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