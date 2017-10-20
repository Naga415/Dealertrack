/**
 * Created by RBANDERSON on 9/1/2017.
 */
import applicationSaga from './applicationSaga';
import dealSaga from './dealSaga';
import ratesAndResiduals from './RatesAndResidualsSaga';

function *indexSaga(){
  yield *applicationSaga();
  yield *dealSaga();
  yield *ratesAndResiduals();
}

export default indexSaga;
