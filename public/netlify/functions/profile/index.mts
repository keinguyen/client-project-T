import { validateToken } from '../helpers/middlewares/validateToken';
import { response, withMiddlewares } from '../helpers/request';

export default withMiddlewares([validateToken], async (req) => {
  return response({
    data: { message: 'success' },
  });
});
