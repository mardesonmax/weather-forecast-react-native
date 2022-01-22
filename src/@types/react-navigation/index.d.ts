import { IAppStackParamsList } from '../../routes/app.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IAppStackParamsList {}
  }
}
