import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../utils';
import { createLogger } from "../../utils/logger"
import { CreateDealRequest } from '../../requests/CreateDealRequest';
import { createDeal } from '../../businessLogic/deals';

const logger = createLogger("createdeal");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newDeal: CreateDealRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const dealItem = await createDeal(newDeal, userId)

    logger.info("DEAL CREATED", {
      
      name: newDeal.name,
      userId: userId,
      date: new Date().toISOString,
    });

    return {
      statusCode: 201,
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

