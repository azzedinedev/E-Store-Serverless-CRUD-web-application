import 'source-map-support/register'
import { createLogger } from "../../utils/logger";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createAttachmentPresignedUrl } from '../../businessLogic/deals';



const logger = createLogger('generateUploadUrl')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing Event ', event)
    const dealId = event.pathParameters.dealId
    const URL = await createAttachmentPresignedUrl(dealId)
    
    logger.info("deal Image URL CREATED", {
      // Additional information stored with a log statement
      key: dealId, 
      date: new Date().toISOString,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          uploadUrl: URL
        }
      )
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
